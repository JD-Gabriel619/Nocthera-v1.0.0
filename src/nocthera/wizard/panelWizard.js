import { PanelStorage } from "../panels/panelStorage.js";

const sessions = new Map();

const DEFAULT_TIMEOUT = 1000 * 60 * 30;

function touch(session) {

    session.updatedAt = Date.now();

    return session;

}

export function createWizard(userId, guildId) {

    const now = Date.now();

    const session = {
        userId,
        guildId,
        panel: {},
        step: 0,
        createdAt: now,
        updatedAt: now
    };

    sessions.set(userId, session);

    return session;

}

export function getWizard(userId) {

    return sessions.get(userId) ?? null;

}

export function hasWizard(userId) {

    return sessions.has(userId);

}

export function updateWizard(userId, data = {}) {

    const session = sessions.get(userId);

    if (!session)
        return null;

    Object.assign(session.panel, data);

    touch(session);

    return session;

}

export function setStep(userId, step) {

    const session = sessions.get(userId);

    if (!session)
        return null;

    session.step = Math.max(0, step);

    touch(session);

    return session.step;

}

export function nextStep(userId) {

    const session = sessions.get(userId);

    if (!session)
        return null;

    session.step++;

    touch(session);

    return session.step;

}

export function previousStep(userId) {

    const session = sessions.get(userId);

    if (!session)
        return null;

    if (session.step > 0)
        session.step--;

    touch(session);

    return session.step;

}

export function finishWizard(userId) {

    const session = sessions.get(userId);

    sessions.delete(userId);

    return session;

}

export function cancelWizard(userId) {

    return sessions.delete(userId);

}

export function clearExpired(maxAge = DEFAULT_TIMEOUT) {

    const now = Date.now();

    let removed = 0;

    for (const [userId, session] of sessions) {

        if (now - session.updatedAt > maxAge) {

            sessions.delete(userId);

            removed++;

        }

    }

    return removed;

}

export async function loadExistingPanel(userId, guildId, panelId) {

    const panel = await PanelStorage.get(
        guildId,
        panelId
    );

    if (!panel)
        return null;

    const now = Date.now();

    const session = {
        userId,
        guildId,
        panel,
        step: 0,
        createdAt: now,
        updatedAt: now
    };

    sessions.set(userId, session);

    return session;

}

export function getAllSessions() {

    return [...sessions.values()];

}

export default {

    createWizard,
    getWizard,
    hasWizard,
    updateWizard,
    setStep,
    nextStep,
    previousStep,
    finishWizard,
    cancelWizard,
    clearExpired,
    loadExistingPanel,
    getAllSessions

};