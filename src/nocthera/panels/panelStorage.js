import fs from "fs/promises";
import path from "path";

import Cache from "../cache/cacheManager.js";


const ROOT = path.join(
    process.cwd(),
    "data",
    "nocthera",
    "panels"
);


export class PanelStorage {


    static async ensureGuild(guildId) {

        const folder = path.join(
            ROOT,
            guildId
        );

        await fs.mkdir(
            folder,
            {
                recursive: true
            }
        );

        return folder;

    }



    static panelPath(guildId, panelId) {

        return path.join(
            ROOT,
            guildId,
            `${panelId}.json`
        );

    }



    static async save(panel) {

        await this.ensureGuild(
            panel.guildId
        );


        const panelId =
            panel.panelId ?? panel.id;


        await fs.writeFile(
            this.panelPath(
                panel.guildId,
                panelId
            ),
            JSON.stringify(
                panel,
                null,
                4
            ),
            "utf8"
        );


        Cache.set(
            panel.guildId,
            panelId,
            panel
        );


        return panel;

    }



    static async get(guildId, panelId) {

        const cached =
            Cache.get(
                guildId,
                panelId
            );


        if (cached)
            return cached;


        try {

            const data =
                await fs.readFile(
                    this.panelPath(
                        guildId,
                        panelId
                    ),
                    "utf8"
                );


            const panel =
                JSON.parse(data);


            Cache.set(
                guildId,
                panelId,
                panel
            );


            return panel;


        } catch {

            return null;

        }

    }



    static async delete(guildId, panelId) {

        try {

            await fs.unlink(
                this.panelPath(
                    guildId,
                    panelId
                )
            );

        } catch {}


        Cache.remove(
            guildId,
            panelId
        );

    }



    static async getGuildPanels(guildId) {

        const folder =
            await this.ensureGuild(
                guildId
            );


        const files =
            await fs.readdir(
                folder
            );


        const panels = [];


        for (const file of files) {

            if (!file.endsWith(".json"))
                continue;


            try {

                const json =
                    await fs.readFile(
                        path.join(
                            folder,
                            file
                        ),
                        "utf8"
                    );


                const panel =
                    JSON.parse(json);


                const panelId =
                    panel.panelId ?? panel.id;


                Cache.set(
                    guildId,
                    panelId,
                    panel
                );


                panels.push(
                    panel
                );


            } catch {}

        }


        return panels;

    }



    static async exists(guildId, panelId) {

        try {

            await fs.access(
                this.panelPath(
                    guildId,
                    panelId
                )
            );


            return true;


        } catch {

            return false;

        }

    }



    static async getAllGuilds() {

        try {

            return await fs.readdir(
                ROOT
            );

        } catch {

            return [];

        }

    }

}



export const savePanel =
    PanelStorage.save.bind(
        PanelStorage
    );


export const loadPanel =
    PanelStorage.get.bind(
        PanelStorage
    );


export const deletePanel =
    PanelStorage.delete.bind(
        PanelStorage
    );


export const getPanels =
    PanelStorage.getGuildPanels.bind(
        PanelStorage
    );


export default PanelStorage;