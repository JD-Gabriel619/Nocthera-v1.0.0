import { handleButton as handleNoctheraVerify } from "../modules/verification/buttonHandler.js";
import { handleVerificationButton } from "../../handlers/verificationButtons.js";

export async function startVerification(interaction, args = []) {
    if (interaction.customId.startsWith("nocthera:verify")) {
        return handleNoctheraVerify(interaction);
    }

    return handleVerificationButton(interaction, interaction.client);
}

export default startVerification;
