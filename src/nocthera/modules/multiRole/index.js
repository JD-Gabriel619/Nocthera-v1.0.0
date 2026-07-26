import { register } from "../../events/eventManager.js";
import { NoctheraEvents } from "../../events/events.js";
import moduleManager from "../../moduleManager.js";

moduleManager.register({
    id: "multiRole",
    name: "Multi Role",
    version: "1.0.0"
});

register(NoctheraEvents.SELECT_MENU, async (interaction) => {
    // Multi Role select menu handler
});

export default true;