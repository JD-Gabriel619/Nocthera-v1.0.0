import { resolveLoadOrder } from "./dependencyResolver.js";

const modules = new Map();

export function register(module) {
    if (!module?.id) {
        throw new Error("Module must have an id.");
    }

    if (modules.has(module.id)) {
        throw new Error(`Module '${module.id}' is already registered.`);
    }

    modules.set(module.id, module);

    return module;
}

export function unregister(id) {
    modules.delete(id);
}

export function get(id) {
    return modules.get(id);
}

export function has(id) {
    return modules.has(id);
}

export function all() {
    return [...modules.values()];
}

export async function enable(id, client) {
    const module = modules.get(id);

    if (!module)
        return false;

    if (module.enabled)
        return true;

    module.enabled = true;

    if (typeof module.onEnable === "function")
        await module.onEnable(client);

    return true;
}

export async function disable(id, client) {
    const module = modules.get(id);

    if (!module)
        return false;

    if (!module.enabled)
        return true;

    module.enabled = false;

    if (typeof module.onDisable === "function")
        await module.onDisable(client);

    return true;
}

export async function loadAll(client) {

    const orderedModules = resolveLoadOrder(all());

    for (const module of orderedModules) {

        if (!module.enabled)
            continue;

        if (typeof module.onLoad === "function")
            await module.onLoad(client);

    }

}

export async function unloadAll(client) {

    const orderedModules = resolveLoadOrder(all()).reverse();

    for (const module of orderedModules) {

        if (typeof module.onUnload === "function")
            await module.onUnload(client);

    }

}

export async function runHealthChecks(client) {

    const results = [];

    for (const module of modules.values()) {

        try {

            const healthy =
                typeof module.healthCheck === "function"
                    ? await module.healthCheck(client)
                    : true;

            results.push({
                id: module.id,
                healthy
            });

        } catch (error) {

            results.push({
                id: module.id,
                healthy: false,
                error: error.message
            });

        }

    }

    return results;

}

export function clear() {
    modules.clear();
}

export function count() {
    return modules.size;
}

const moduleManager = {
    register,
    unregister,
    get,
    has,
    all,
    enable,
    disable,
    loadAll,
    unloadAll,
    runHealthChecks,
    clear,
    count
};

export default moduleManager;