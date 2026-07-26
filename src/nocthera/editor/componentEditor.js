import { getPanel } from "./panelEditor.js";

function ensureRow(panel, row = 0) {

    panel.components ??= [];

    while (panel.components.length <= row) {

        panel.components.push({
            components: []
        });

    }

    return panel.components[row];

}

export function addButton(panel, button, row = 0) {

    const actionRow = ensureRow(panel, row);

    if (actionRow.components.length >= 5)
        throw new Error("Maximum 5 components per row.");

    actionRow.components.push({
        type: 2,
        style: "primary",
        disabled: false,
        ...button
    });

    return panel;

}

export function removeButton(panel, index, row = 0) {

    const actionRow = ensureRow(panel, row);

    actionRow.components.splice(index, 1);

    return panel;

}

export function updateButton(panel, index, changes, row = 0) {

    const actionRow = ensureRow(panel, row);

    if (!actionRow.components[index])
        return panel;

    Object.assign(
        actionRow.components[index],
        changes
    );

    return panel;

}

export function addSelectMenu(panel, menu, row = 0) {

    const actionRow = ensureRow(panel, row);

    actionRow.components.push({
        type: 3,
        disabled: false,
        ...menu
    });

    return panel;

}

export function updateComponent(panel, index, changes, row = 0) {

    const actionRow = ensureRow(panel, row);

    if (!actionRow.components[index])
        return panel;

    Object.assign(
        actionRow.components[index],
        changes
    );

    return panel;

}

export function removeComponent(panel, index, row = 0) {

    const actionRow = ensureRow(panel, row);

    actionRow.components.splice(index, 1);

    return panel;

}

export default {
    getPanel,
    addButton,
    removeButton,
    updateButton,
    addSelectMenu,
    updateComponent,
    removeComponent
};