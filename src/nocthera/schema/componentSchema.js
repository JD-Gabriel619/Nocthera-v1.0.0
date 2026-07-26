export function createButton(overrides = {}) {
    return {
        type: "button",

        id: null,

        label: "Button",

        emoji: null,

        style: "Primary",

        disabled: false,

        action: null,

        ...overrides
    };
}

export function createSelect(overrides = {}) {
    return {
        type: "select",

        id: null,

        placeholder: "Choose...",

        min: 1,

        max: 1,

        options: [],

        action: null,

        ...overrides
    };
}