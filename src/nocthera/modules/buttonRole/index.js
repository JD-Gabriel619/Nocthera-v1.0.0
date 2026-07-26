import { register } from "../../events/eventManager.js";
import { NoctheraEvents } from "../../events/events.js";
import moduleManager from "../../moduleManager.js";

moduleManager.register({
    id: "buttonRole",
    name: "Button Role",
    version: "1.0.0"
});

register(NoctheraEvents.BUTTON, async (interaction) => {
    // Button Role handler
});

export default true;