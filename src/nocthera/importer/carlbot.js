import PanelParser from './parser.js';

export default class CarlBotImporter {

    static import(json) {

        const panel = PanelParser.parse(json);

        panel.components = panel.components.map(component => {

            if (!component.customId)
                return component;

            // role_toggle:ROLE_ID

            if (component.customId.startsWith("role_toggle:")) {

                component.action = "role";

                component.mode = "toggle";

                component.roleId = component.customId.split(":")[1];

            }

            // welcome_verify:math:ROLE

            else if (component.customId.startsWith("welcome_verify:")) {

                const parts = component.customId.split(":");

                component.action = "verify";

                component.method = parts[1];

                component.roleId = parts[2];

            }

            // verify_user

            else if (component.customId === "verify_user") {

                component.action = "verify";

                component.method = "instant";

            }

            return component;

        });

        return panel;

    }

}