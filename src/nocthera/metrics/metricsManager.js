const metrics = {
    panelsCreated: 0,
    panelsPublished: 0,
    panelsEdited: 0,
    panelsDeleted: 0,

    buttonClicks: 0,
    selectMenus: 0,
    modalSubmits: 0,

    verifications: 0,
    ticketsCreated: 0,
    giveawaysJoined: 0,
    applicationsSubmitted: 0,

    cacheHits: 0,
    cacheMisses: 0,

    errors: 0,

    startedAt: Date.now()
};

export function increment(name, amount = 1) {

    if (!(name in metrics))
        metrics[name] = 0;

    metrics[name] += amount;

}

export function set(name, value) {

    metrics[name] = value;

}

export function get(name) {

    return metrics[name];

}

export function all() {

    return structuredClone(metrics);

}

export function uptime() {

    return Date.now() - metrics.startedAt;

}

export function reset() {

    for (const key of Object.keys(metrics)) {

        if (
            key === "startedAt"
        ) continue;

        if (typeof metrics[key] === "number")
            metrics[key] = 0;

    }

    metrics.startedAt = Date.now();

}

export default {
    increment,
    set,
    get,
    all,
    uptime,
    reset
};