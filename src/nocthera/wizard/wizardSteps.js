export default class WizardSteps {

    static modules = {

        roles: [
            "module",
            "title",
            "description",
            "color",
            "channel",
            "component",
            "roles",
            "settings",
            "preview",
            "publish"
        ],

        verification: [
            "module",
            "title",
            "description",
            "color",
            "channel",
            "verification",
            "captcha",
            "verifiedRole",
            "preview",
            "publish"
        ],

        tickets: [
            "module",
            "title",
            "description",
            "color",
            "channel",
            "ticketCategory",
            "supportRoles",
            "transcripts",
            "preview",
            "publish"
        ],

        welcome: [
            "module",
            "channel",
            "message",
            "embed",
            "preview",
            "publish"
        ],

        applications: [
            "module",
            "title",
            "questions",
            "reviewChannel",
            "staffRoles",
            "preview",
            "publish"
        ]

    };

    static get(module) {

        return [...(this.modules[module] ?? [])];

    }

    static getModules() {

        return Object.keys(this.modules);

    }

    static register(module, steps) {

        this.modules[module] = [...steps];

    }

    static first(module) {

        return this.get(module)[0] ?? null;

    }

    static last(module) {

        const steps = this.get(module);

        return steps.at(-1) ?? null;

    }

    static next(module, current) {

        const steps = this.get(module);

        const index = steps.indexOf(current);

        return index === -1
            ? null
            : (steps[index + 1] ?? null);

    }

    static previous(module, current) {

        const steps = this.get(module);

        const index = steps.indexOf(current);

        return index <= 0
            ? null
            : steps[index - 1];

    }

    static exists(module, step) {

        return this.get(module).includes(step);

    }

    static count(module) {

        return this.get(module).length;

    }

}