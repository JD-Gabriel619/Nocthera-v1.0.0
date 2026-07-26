const dependencies = new Map();

export function register(moduleId, requires = []) {

    dependencies.set(moduleId, [...new Set(requires)]);

}

export function unregister(moduleId) {

    dependencies.delete(moduleId);

}

export function get(moduleId) {

    return dependencies.get(moduleId) ?? [];

}

export function has(moduleId) {

    return dependencies.has(moduleId);

}

export function validate(moduleId, loadedModules) {

    const missing = [];

    for (const dependency of get(moduleId)) {

        if (!loadedModules.has(dependency)) {
            missing.push(dependency);
        }

    }

    return {
        valid: missing.length === 0,
        missing
    };

}

export function clear() {

    dependencies.clear();

}