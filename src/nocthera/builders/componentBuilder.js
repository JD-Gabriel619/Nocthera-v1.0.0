import { ActionRowBuilder } from "discord.js";

import buildButton from "./buttonBuilder.js";
import buildSelect from "./selectBuilder.js";

export function buildComponents(components = []) {

    const rows = [];

    for (const row of components) {

        if (!Array.isArray(row.components))
            continue;

        const actionRow = new ActionRowBuilder();

        for (const component of row.components) {

            switch (component.type) {

                case 2:
                    actionRow.addComponents(
                        buildButton(component)
                    );
                    break;

                case 3:
                    actionRow.addComponents(
                        buildSelect(component)
                    );
                    break;

                default:
                    break;

            }

        }

        if (actionRow.components.length > 0)
            rows.push(actionRow);

    }

    return rows;

}

export default buildComponents;