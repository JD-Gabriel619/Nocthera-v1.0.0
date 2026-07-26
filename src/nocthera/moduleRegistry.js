class ModuleRegistry {

    constructor() {
        this.modules = new Map();
    }

    register(module) {

        if (!module?.id)
            throw new Error("Module must have an id.");

        if (this.modules.has(module.id))
            throw new Error(`Module '${module.id}' already registered.`);

        this.modules.set(module.id, module);
    }

    unregister(id) {
        this.modules.delete(id);
    }

    get(id) {
        return this.modules.get(id);
    }

    has(id) {
        return this.modules.has(id);
    }

    getAll() {
        return [...this.modules.values()];
    }

    clear() {
        this.modules.clear();
    }

}

export default new ModuleRegistry();