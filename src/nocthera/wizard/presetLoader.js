import { getPreset } from "./presets/index.js";
import {
    createWizard,
    getWizard,
    updateWizard
} from "./panelWizard.js";

export function createFromPreset(userId, guildId, presetId) {

    const preset = getPreset(presetId);

    if (!preset)
        throw new Error(`Preset '${presetId}' not found.`);

    createWizard(userId, guildId);

    updateWizard(
        userId,
        structuredClone(preset.panel)
    );

    const session = getWizard(userId);

    session.module = preset.id ?? presetId;

    session.preset = presetId;

    return session;

}

export function applyPreset(userId, presetId) {

    const preset = getPreset(presetId);

    if (!preset)
        throw new Error(`Preset '${presetId}' not found.`);

    const session = updateWizard(
        userId,
        structuredClone(preset.panel)
    );

    if (session) {

        session.module = preset.id ?? presetId;

        session.preset = presetId;

    }

    return session;

}

export function getPresetInfo(presetId) {

    return getPreset(presetId);

}

export default {

    createFromPreset,
    applyPreset,
    getPresetInfo

};