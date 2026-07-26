/**
 * Nocthera Event Manager
 *
 * Every Nocthera module registers itself here instead
 * of editing interactionCreate.js or guildMemberAdd.js.
 */

import Log from "../logger/frameworkLogger.js";

const handlers = new Map();

/**
 * Register an event handler
 * @param {string} event
 * @param {Function} callback
 */
export function register(event, callback) {

    if (!handlers.has(event)) {
        handlers.set(event, []);
    }

    handlers.get(event).push(callback);
}

/**
 * Dispatch an event
 * @param {string} event
 * @param  {...any} args
 */
export async function dispatch(event, ...args) {

    const callbacks = handlers.get(event);

    if (!callbacks) {
        return false;
    }

    for (const callback of callbacks) {

        try {

            await callback(...args);

        } catch (error) {

            Log.error(
                "events",
                `Error inside "${event}" event`,
                {
                    event,
                    error
                }
            );

        }

    }

    return callbacks.length > 0;
}

/**
 * Remove handler
 */
export function unregister(event, callback) {

    const callbacks = handlers.get(event);

    if (!callbacks) {
        return;
    }

    handlers.set(
        event,
        callbacks.filter(fn => fn !== callback)
    );
}

/**
 * Clear handlers
 */
export function clear(event) {

    if (event) {
        handlers.delete(event);
    } else {
        handlers.clear();
    }
}

/**
 * List handlers
 */
export function getHandlers(event) {

    return handlers.get(event) ?? [];

}