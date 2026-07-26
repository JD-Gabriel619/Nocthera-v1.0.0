const registry = {
    modules: new Map(),
    actions: new Map(),
    builders: new Map(),
    validators: new Map(),
    storage: new Map(),
    events: new Map()
};

function getStore(type) {

    const store = registry[type];

    if (!store)
        throw new Error(`Unknown registry type '${type}'.`);

    return store;

}

export function register(type, id, value) {

    const store = getStore(type);

    if (store.has(id)) {
        throw new Error(
            `${type} '${id}' is already registered.`
        );
    }

    store.set(id, value);

    return value;

}

export function unregister(type, id) {

    getStore(type).delete(id);

}

export function get(type, id) {

    return getStore(type).get(id);

}

export function has(type, id) {

    return getStore(type).has(id);

}

export function list(type) {

    return [...getStore(type).values()];

}

export function keys(type) {

    return [...getStore(type).keys()];

}

export function clear(type) {

    if (type) {

        getStore(type).clear();

        return;

    }

    for (const store of Object.values(registry)) {
        store.clear();
    }

}

export default {
    register,
    unregister,
    get,
    has,
    list,
    keys,
    clear
};