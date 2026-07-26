import { register } from "../../events/eventManager.js";
import { NoctheraEvents } from "../../events/events.js";
import moduleManager from "../../moduleManager.js";

moduleManager.register({
    id: "applications",
    name: "Applications",
    version: "1.0.0"
});

register(NoctheraEvents.BUTTON, async (interaction) => {
    // Application button handler
});

register(NoctheraEvents.MODAL, async (interaction) => {
    // Application modal handler
});

export default true;