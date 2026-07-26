import { register } from "../../events/eventManager.js";
import { NoctheraEvents } from "../../events/events.js";
import moduleManager from "../../moduleManager.js";

moduleManager.register({
    id: "ticket",
    name: "Ticket System",
    version: "1.0.0"
});

register(NoctheraEvents.BUTTON, async (interaction) => {
    // Ticket button handler
});

register(NoctheraEvents.SELECT_MENU, async (interaction) => {
    // Ticket select menu handler
});

register(NoctheraEvents.MODAL, async (interaction) => {
    // Ticket modal handler
});

export default true;