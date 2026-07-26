import { register } from "../../events/eventManager.js";
import { NoctheraEvents } from "../../events/events.js";
import moduleManager from "../../moduleManager.js";

moduleManager.register({
    id: "captcha",
    name: "Captcha",
    version: "1.0.0"
});

register(NoctheraEvents.BUTTON, async (interaction) => {
    // Captcha button handler
});

register(NoctheraEvents.MEMBER_JOIN, async (member) => {
    // Captcha join handler
});

export default true;