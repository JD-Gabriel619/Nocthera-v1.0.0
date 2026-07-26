export function createEmbed(overrides = {}) {
    return {
        title: "",

        description: "",

        color: "#5865F2",

        author: null,

        footer: null,

        thumbnail: null,

        image: null,

        fields: [],

        timestamp: false,

        ...overrides
    };
}