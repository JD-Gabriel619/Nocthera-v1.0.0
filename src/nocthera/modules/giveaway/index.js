import { register } from "../../events/eventManager.js";
import { NoctheraEvents } from "../../events/events.js";
import moduleManager from "../../moduleManager.js";

moduleManager.register({
    id: "giveaway",
    name: "Giveaway",
    version: "1.0.0"
});

register(NoctheraEvents.BUTTON, async (interaction) => {
    // Giveaway button handler
});

export default true;