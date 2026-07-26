export default {
    id: "buttonRole",

    name: "Button Roles",

    panel: {
        embeds: [
            {
                title: "Choose Your Roles",
                description: "Press a button to receive a role.",
                color: "#57F287"
            }
        ],

        components: [
            {
                components: [
                    {
                        type: 2,
                        style: "primary",
                        label: "Role 1",
                        custom_id: "buttonrole:role1"
                    }
                ]
            }
        ]
    }
};