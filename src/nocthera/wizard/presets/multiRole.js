export default {
    id: "multiRole",

    name: "Multi Roles",

    panel: {
        embeds: [
            {
                title: "Select Your Roles",
                description: "Choose one or more roles.",
                color: "#FEE75C"
            }
        ],

        components: [
            {
                components: [
                    {
                        type: 3,
                        custom_id: "multirole",
                        placeholder: "Select roles...",
                        min_values: 1,
                        max_values: 3,
                        options: [
                            {
                                label: "Role 1",
                                value: "role1"
                            }
                        ]
                    }
                ]
            }
        ]
    }
};