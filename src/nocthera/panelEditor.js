import PanelManager from "./panelManager.js";

export default class PanelEditor {

    static async setTitle(client, guildId, panelId, title) {

        return PanelManager.update(
            client,
            guildId,
            panelId,
            {
                title
            }
        );

    }

    static async setDescription(client, guildId, panelId, description) {

        return PanelManager.update(
            client,
            guildId,
            panelId,
            {
                description
            }
        );

    }

    static async setColor(client, guildId, panelId, color) {

        return PanelManager.update(
            client,
            guildId,
            panelId,
            {
                color
            }
        );

    }

    static async setThumbnail(client, guildId, panelId, thumbnail) {

        return PanelManager.update(
            client,
            guildId,
            panelId,
            {
                thumbnail
            }
        );

    }

    static async setImage(client, guildId, panelId, image) {

        return PanelManager.update(
            client,
            guildId,
            panelId,
            {
                image
            }
        );

    }

}