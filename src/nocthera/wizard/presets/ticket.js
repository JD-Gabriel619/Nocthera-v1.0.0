export default {
    id: "ticket",

    name: "Ticket",

    panel: {
        embeds: [
            {
                title: "Support Tickets",
                description: "Need help? Create a ticket below.",
                color: "#00A8FF"
            }
        ],

        components: [
            {
                components: [
                    {
                        type: 2,
                        style: "primary",
                        label: "Create Ticket",
                        emoji: "🎫",
                        custom_id: "ticket_create"
                    }
                ]
            }
        ]
    }
};