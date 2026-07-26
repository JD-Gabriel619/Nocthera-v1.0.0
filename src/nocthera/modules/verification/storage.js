const verifiedUsers = new Map();

function getGuild(guildId) {

    if (!verifiedUsers.has(guildId)) {
        verifiedUsers.set(guildId, new Set());
    }

    return verifiedUsers.get(guildId);

}

export async function isVerified(guildId, userId) {

    return getGuild(guildId).has(userId);

}

export async function setVerified(guildId, userId) {

    getGuild(guildId).add(userId);

    return true;

}

export async function removeVerified(guildId, userId) {

    getGuild(guildId).delete(userId);

}

export async function getVerifiedUsers(guildId) {

    return [...getGuild(guildId)];

}

export async function clearGuild(guildId) {

    verifiedUsers.delete(guildId);

}

export default {

    isVerified,
    setVerified,
    removeVerified,
    getVerifiedUsers,
    clearGuild

};