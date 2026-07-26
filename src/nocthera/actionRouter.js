import { toggleRole } from "../services/roleToggleService.js";
import { startVerification } from "./verification/startVerification.js";

const actions = new Map();

/*
|--------------------------------------------------------------------------
| Register actions
|--------------------------------------------------------------------------
*/

actions.set("role", async (interaction, args) => {

    const roleId = args[0];

    if (!roleId)
        throw new Error("Missing role ID.");

    return toggleRole(interaction, roleId);

});

actions.set("verify", async (interaction, args) => {

    return startVerification(interaction, args);

});

/*
|--------------------------------------------------------------------------
| Future actions
|--------------------------------------------------------------------------
|

ticket
dropdown
giveaway
shop
application
music
poll
link
modal

*/

export async function executeAction(interaction) {

    const id = interaction.customId;

    const parts = id.split(":");

    const action = parts.shift();

    const handler = actions.get(action);

    if (!handler)
        return false;

    await handler(interaction, parts);

    return true;

}

export function registerAction(name, handler) {

    actions.set(name, handler);

}

export default {

    executeAction,
    registerAction

};