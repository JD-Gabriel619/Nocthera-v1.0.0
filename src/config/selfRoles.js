export default {
    /*
     * Only roles listed here can be toggled.
     * Leave empty to allow all assignable roles.
     */
    allowedRoles: [
        // "1528058415035973692",
        // "1234567890123456789"
    ],

    /*
     * If true and allowedRoles is empty,
     * any assignable role may be toggled.
     */
    allowAllRoles: true,

    /*
     * Block administrator-permission roles.
     */
    blockAdministratorRoles: true,

    /*
     * Block moderation permissions.
     */
    blockedPermissions: [
        "Administrator",
        "ManageGuild",
        "ManageRoles",
        "BanMembers",
        "KickMembers",
        "ManageChannels",
        "ManageWebhooks"
    ]
};