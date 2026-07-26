import crypto from "crypto";

const sessions = new Map();

export class CaptchaValidator {

    /**
     * Create a verification session
     */
    static create(userId, guildId, answer, lifetime = 300000) {

        const token = crypto.randomUUID();

        sessions.set(token, {

            token,

            userId,

            guildId,

            answer: String(answer).toUpperCase(),

            created: Date.now(),

            expires: Date.now() + lifetime

        });

        return token;

    }

    /**
     * Validate a captcha response
     */
    static validate(token, userId, guildId, input) {

        const session = sessions.get(token);

        if (!session) {

            return {
                success: false,
                reason: "Session not found."
            };

        }

        if (session.userId !== userId) {

            return {
                success: false,
                reason: "Wrong user."
            };

        }

        if (session.guildId !== guildId) {

            return {
                success: false,
                reason: "Wrong server."
            };

        }

        if (Date.now() > session.expires) {

            sessions.delete(token);

            return {
                success: false,
                reason: "Captcha expired."
            };

        }

        if (
            session.answer !==
            String(input).trim().toUpperCase()
        ) {

            return {
                success: false,
                reason: "Incorrect answer."
            };

        }

        sessions.delete(token);

        return {

            success: true

        };

    }

    /**
     * Cancel a verification session
     */
    static remove(token) {

        sessions.delete(token);

    }

    /**
     * Get a session
     */
    static get(token) {

        return sessions.get(token);

    }

    /**
     * Remove expired sessions
     */
    static cleanup() {

        const now = Date.now();

        for (const [token, session] of sessions) {

            if (session.expires <= now) {

                sessions.delete(token);

            }

        }

    }

    /**
     * Start cleanup loop
     */
    static initialize(interval = 60000) {

        setInterval(() => {

            this.cleanup();

        }, interval);

    }

}