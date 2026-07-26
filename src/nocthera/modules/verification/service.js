import * as Storage from "./storage.js";
import * as Metrics from "../../metrics/index.js";

async function giveVerificationRole(member) {

    const roleId =
        process.env.VERIFICATION_ROLE_ID;

    if (!roleId)
        return;

    const role = member.guild.roles.cache.get(roleId);

    if (!role)
        return;

    if (member.roles.cache.has(role.id))
        return;

    await member.roles.add(role);

}

export async function verify(interaction) {

    const guildId = interaction.guildId;
    const userId = interaction.user.id;

    if (await Storage.isVerified(guildId, userId)) {

        return interaction.reply({
            content: "You are already verified.",
            ephemeral: true
        });

    }

    await Storage.setVerified(
        guildId,
        userId
    );

    await giveVerificationRole(interaction.member);

    Metrics.increment("verificationSuccess");

    return interaction.reply({
        content: "✅ Verification successful.",
        ephemeral: true
    });

}

export async function memberJoin(member) {

    const verified = await Storage.isVerified(
        member.guild.id,
        member.id
    );

    if (!verified)
        return;

    await giveVerificationRole(member);

}

export default {
    verify,
    memberJoin
};