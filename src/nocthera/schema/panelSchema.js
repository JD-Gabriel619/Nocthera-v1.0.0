export const PANEL_SCHEMA_VERSION = 1;

export function createPanel(overrides = {}) {
    return {
        version: PANEL_SCHEMA_VERSION,

        id: null,

        guildId: null,

        name: "New Panel",

        description: "",

        type: "panel",

        enabled: true,

        author: null,

        createdAt: Date.now(),

        updatedAt: Date.now(),

        channelId: null,

        messageId: null,

        embed: {
            title: "",
            description: "",
            color: "#5865F2",
            thumbnail: null,
            image: null,
            footer: null,
            author: null,
            fields: [],
            timestamp: false
        },

        components: [],

        actions: [],

        permissions: {
            use: [],
            edit: [],
            publish: []
        },

        settings: {},

        metadata: {},

        ...overrides
    };
}