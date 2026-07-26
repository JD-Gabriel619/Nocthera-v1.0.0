const registry = {

    commands: new Map(),

    contextMenus: new Map(),

    buttons: new Map(),

    selectMenus: new Map(),

    modals: new Map()

};

export function register(type, item) {

    if (!item?.data?.name && !item?.customId)
        throw new Error(`Invalid ${type} registration.`);

    const id =
        item.data?.name ??
        item.customId;

    registry[type].set(id, item);

    return item;

}

export function unregister(type, id) {

    registry[type].delete(id);

}

export function get(type, id) {

    return registry[type].get(id);

}

export function has(type, id) {

    return registry[type].has(id);

}

export function all(type) {

    return [...registry[type].values()];

}

export default registry;