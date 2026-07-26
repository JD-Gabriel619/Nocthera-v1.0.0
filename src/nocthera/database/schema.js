/**
 * Nocthera Panel Schema
 *
 * This defines the structure of every panel.
 */

export const PANEL_SCHEMA_VERSION = 1;

export function createPanel() {

    return {

        id: null,

        version: PANEL_SCHEMA_VERSION,

        guildId: null,

        channelId: null,

        messageId: null,

        name: "Untitled",

        type: "panel",

        enabled: true,

        createdAt: Date.now(),

        updatedAt: Date.now(),

        embed: {},

        components: [],

        settings: {

            verification: {

                enabled: false,

                method: "instant",

                verifiedRole: null,

                removeRole: null,

                captchaLength: 5,

                mathDifficulty: "easy"

            },

            roles: {

                mode: "toggle",

                requiredRoles: [],

                blockedRoles: [],

                exclusiveGroups: [],

                maximumRoles: null

            },

            permissions: {

                administratorOnly: false,

                moderatorOnly: false

            }

        }

    };

}