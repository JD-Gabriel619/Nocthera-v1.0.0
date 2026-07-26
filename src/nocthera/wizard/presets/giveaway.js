export default {
    id: "giveaway",

    name: "Giveaway",

    panel: {
        embeds: [
            {
                title: "🎉 Giveaway",
                description: "Press Enter Giveaway below.",
                color: "#ED4245"
            }
        ],

        components: [
            {
                components: [
                    {
                        type: 2,
                        style: "success",
                        label: "Enter Giveaway",
                        emoji: "🎉",
                        custom_id: "giveaway_join"
                    }
                ]
            }
        ]
    }
};