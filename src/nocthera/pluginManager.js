const plugins = new Map();

export function register(plugin) {

    if (!plugin?.id)
        throw new Error("Plugin id missing.");

    if (plugins.has(plugin.id))
        throw new Error(`Plugin '${plugin.id}' already exists.`);

    plugins.set(plugin.id, plugin);

    return plugin;

}

export function unregister(id) {

    plugins.delete(id);

}

export function get(id) {

    return plugins.get(id);

}

export function all() {

    return [...plugins.values()];

}

export function clear() {

    plugins.clear();

}

export default {
    register,
    unregister,
    get,
    all,
    clear
};