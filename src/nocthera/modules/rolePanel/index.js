import { register } from "../../events/eventManager.js";
import { NoctheraEvents } from "../../events/events.js";
import moduleManager from "../../moduleManager.js";

moduleManager.register({
    id: "rolePanel",
    name: "Role Panel",
    version: "1.0.0"
});

register(NoctheraEvents.BUTTON, async (interaction) => {
    // Role Panel button handler
});

export default true;