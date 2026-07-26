import { register } from "../../moduleManager.js";
import { register as registerEvent } from "../../events/eventManager.js";
import { NoctheraEvents } from "../../events/events.js";

import { handleButton } from "./buttonHandler.js";
import { handleMemberJoin } from "./memberJoinHandler.js";

register({
    id: "verification",
    name: "Nocthera Verification",
    version: "1.0.0",
    enabled: true
});

registerEvent(
    NoctheraEvents.BUTTON,
    handleButton
);

registerEvent(
    NoctheraEvents.MEMBER_JOIN,
    handleMemberJoin
);

export default true;