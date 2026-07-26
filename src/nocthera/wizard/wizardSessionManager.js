import WizardState from "./wizardState.js";

export default class WizardSessionManager {

    static sessions = new Map();

    static SESSION_TIMEOUT = 1000 * 60 * 30;

    static create(guildId, userId, module = null) {

        this.removeUserSessions(guildId, userId);

        const state = new WizardState({
            guildId,
            userId,
            module
        });

        this.sessions.set(
            state.sessionId,
            state
        );

        return state;

    }

    static get(sessionId) {

        return this.sessions.get(sessionId) ?? null;

    }

    static getByUser(guildId, userId) {

        for (const session of this.sessions.values()) {

            if (
                session.guildId === guildId &&
                session.userId === userId
            ) {

                return session;

            }

        }

        return null;

    }

    static save(state) {

        state.touch();

        this.sessions.set(
            state.sessionId,
            state
        );

        return state;

    }

    static remove(sessionId) {

        return this.sessions.delete(sessionId);

    }

    static removeUserSessions(guildId, userId) {

        let removed = 0;

        for (const [id, session] of this.sessions.entries()) {

            if (
                session.guildId === guildId &&
                session.userId === userId
            ) {

                this.sessions.delete(id);

                removed++;

            }

        }

        return removed;

    }

    static cleanup() {

        const now = Date.now();

        let removed = 0;

        for (const [id, session] of this.sessions.entries()) {

            if (
                now - session.updatedAt >
                this.SESSION_TIMEOUT
            ) {

                this.sessions.delete(id);

                removed++;

            }

        }

        return removed;

    }

    static clear() {

        this.sessions.clear();

    }

    static getAll() {

        return [...this.sessions.values()];

    }

    static count() {

        return this.sessions.size;

    }

}