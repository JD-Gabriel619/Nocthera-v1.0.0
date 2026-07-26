import registry from './registry.js';

export default class ActionEngine {

    static async execute(interaction, component) {

        if (!component)
            throw new Error("Component not found.");

        if (!component.action)
            throw new Error("Component has no action.");

        switch (component.action) {

            case "role":
                return this.executeRole(interaction, component);

            case "verify":
                return this.executeVerification(interaction, component);

            case "ticket":
                return this.executeTicket(interaction, component);

            case "channel":
                return this.executeChannel(interaction, component);

            case "url":
                return this.executeURL(interaction, component);

            default:
                throw new Error(`Unknown action ${component.action}`);
        }

    }

    static async executeRole(interaction, component) {

        const handler = registry.getRoleAction(component.mode);

        if (!handler)
            throw new Error(`Role mode '${component.mode}' not registered.`);

        return handler.execute(interaction, component);

    }

    static async executeVerification(interaction, component) {

        const handler = registry.getVerification(component.method);

        if (!handler)
            throw new Error(`Verification '${component.method}' not registered.`);

        return handler.execute(interaction, component);

    }

    static async executeTicket(interaction, component) {

        const handler = registry.getButton("ticket");

        if (!handler)
            throw new Error("Ticket handler missing.");

        return handler.execute(interaction, component);

    }

    static async executeChannel(interaction, component) {

        const handler = registry.getButton("channel");

        if (!handler)
            throw new Error("Channel handler missing.");

        return handler.execute(interaction, component);

    }

    static async executeURL(interaction, component) {

        // Discord handles URL buttons automatically.
        return;

    }

}