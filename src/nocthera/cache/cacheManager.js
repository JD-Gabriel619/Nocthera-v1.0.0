import * as Metrics from "../metrics/index.js";

const cache = new Map();

export function set(guildId, panelId, panel) {

    if (!cache.has(guildId)) {
        cache.set(guildId, new Map());
    }

    cache.get(guildId).set(panelId, panel);

    return panel;

}

export function get(guildId, panelId) {

    const panel = cache.get(guildId)?.get(panelId);

    if (panel)
        Metrics.increment("cacheHits");
    else
        Metrics.increment("cacheMisses");
    
    return panel ?? null;

}

export function has(guildId, panelId) {

    return cache.get(guildId)?.has(panelId) ?? false;

}

export function remove(guildId, panelId) {

    const guild = cache.get(guildId);

    if (!guild)
        return;

    guild.delete(panelId);

    if (guild.size === 0)
        cache.delete(guildId);

}

export function clearGuild(guildId) {

    cache.delete(guildId);

}

export function clearAll() {

    cache.clear();

}

export function size() {

    let total = 0;

    for (const guild of cache.values()) {
        total += guild.size;
    }

    return total;

}
export function guildSize(guildId) {

    return cache.get(guildId)?.size ?? 0;

}
export default {
    set,
    get,
    has,
    remove,
    clearGuild,
    clearAll,
    size,
    guildSize
};