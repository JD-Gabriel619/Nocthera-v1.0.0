import crypto from "crypto";

export default class WizardState {

    constructor(data = {}) {

        const now = Date.now();

        this.sessionId = data.sessionId ?? crypto.randomUUID();

        this.guildId = data.guildId ?? null;

        this.userId = data.userId ?? null;

        this.module = data.module ?? null;

        this.currentStep = data.currentStep ?? "module";

        this.createdAt = data.createdAt ?? now;

        this.updatedAt = data.updatedAt ?? now;

        this.completed = data.completed ?? false;

        this.version = data.version ?? 1;

        this.panel = {

            id: data.panel?.id ?? null,

            module: data.panel?.module ?? null,

            channelId: data.panel?.channelId ?? null,

            messageId: data.panel?.messageId ?? null,

            title: data.panel?.title ?? "",

            description: data.panel?.description ?? "",

            color: data.panel?.color ?? "#5865F2",

            thumbnail: data.panel?.thumbnail ?? null,

            image: data.panel?.image ?? null,

            author: data.panel?.author ?? null,

            footer: data.panel?.footer ?? null,

            timestamp: data.panel?.timestamp ?? false,

            fields: data.panel?.fields ?? [],

            components: data.panel?.components ?? [],

            settings: data.panel?.settings ?? {},

            permissions: data.panel?.permissions ?? {},

            metadata: data.panel?.metadata ?? {}

        };

    }

    setStep(step) {

        this.currentStep = step;

        this.touch();

    }

    touch() {

        this.updatedAt = Date.now();

    }

    set(key, value) {

        this.panel[key] = value;

        this.touch();

        return this;

    }

    get(key) {

        return this.panel[key];

    }

    has(key) {

        return key in this.panel;

    }

    merge(data = {}) {

        Object.assign(this.panel, data);

        this.touch();

        return this;

    }

    reset() {

        this.completed = false;

        this.currentStep = "module";

        this.touch();

        return this;

    }

    complete() {

        this.completed = true;

        this.touch();

        return this;

    }

    clone() {

        return new WizardState(this.toJSON());

    }

    toJSON() {

        return {

            sessionId: this.sessionId,

            guildId: this.guildId,

            userId: this.userId,

            module: this.module,

            currentStep: this.currentStep,

            createdAt: this.createdAt,

            updatedAt: this.updatedAt,

            completed: this.completed,

            version: this.version,

            panel: structuredClone(this.panel)

        };

    }

}