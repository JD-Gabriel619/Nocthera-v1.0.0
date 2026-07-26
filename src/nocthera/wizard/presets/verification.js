export default {
    id: "verification",

    name: "Verification",

    panel: {
        embeds: [
            {
                title: "Server Verification",
                description: "Press the button below to verify yourself and gain access to the server.",
                color: "#5865F2"
            }
        ],

        components: [
            {
                components: [
                    {
                        type: 2,
                        style: "success",
                        label: "Verify",
                        emoji: "✅",
                        custom_id: "verify"
                    }
                ]
            }
        ]
    }
};