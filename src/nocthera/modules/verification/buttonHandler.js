import * as VerificationService from "./service.js";

export async function handleButton(interaction) {

    if (!interaction.isButton())
        return;

    if (!interaction.customId.startsWith("nocthera:verify"))
        return;

    await VerificationService.verify(interaction);

}