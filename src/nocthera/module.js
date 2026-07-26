export default class NoctheraModule {
    constructor({
        id,
        name,
        version = "1.0.0",
        description = "",
        author = "Nocthera",
        dependencies = [],
        enabled = true
    }) {
        this.id = id;
        this.name = name;
        this.version = version;
        this.description = description;
        this.author = author;
        this.dependencies = dependencies;
        this.enabled = enabled;
    }

    async onLoad(client) {}

    async onUnload(client) {}

    async onEnable(client) {}

    async onDisable(client) {}

    async healthCheck(client) {
        return true;
    }
}