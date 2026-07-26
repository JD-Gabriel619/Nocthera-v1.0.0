export function resolveLoadOrder(modules) {

    const resolved = [];
    const visited = new Set();
    const visiting = new Set();

    function visit(module) {

        if (resolved.includes(module))
            return;

        if (visiting.has(module.id)) {
            throw new Error(
                `Circular dependency detected: ${module.id}`
            );
        }

        visiting.add(module.id);

        for (const dependency of module.dependencies || []) {

            const dep = modules.find(m => m.id === dependency);

            if (!dep) {
                throw new Error(
                    `Module '${module.id}' requires '${dependency}'.`
                );
            }

            visit(dep);

        }

        visiting.delete(module.id);
        visited.add(module.id);
        resolved.push(module);

    }

    for (const module of modules) {

        if (!visited.has(module.id))
            visit(module);

    }

    return resolved;

}