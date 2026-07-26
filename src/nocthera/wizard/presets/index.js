import verification from "./verification.js";
import ticket from "./ticket.js";
import buttonRole from "./buttonRole.js";
import multiRole from "./multiRole.js";
import giveaway from "./giveaway.js";

const presets = new Map([
    [verification.id, verification],
    [ticket.id, ticket],
    [buttonRole.id, buttonRole],
    [multiRole.id, multiRole],
    [giveaway.id, giveaway]
]);

export function getPreset(id) {

    return presets.get(id) ?? null;

}

export function getPresets() {

    return [...presets.values()];

}

export function hasPreset(id) {

    return presets.has(id);

}

export function registerPreset(preset) {

    presets.set(
        preset.id,
        preset
    );

    return preset;

}

export function unregisterPreset(id) {

    return presets.delete(id);

}

export default getPresets();