import { logger } from "../../utils/logger.js";

function buildContext(module, extra = {}) {
    return {
        framework: "Nocthera",
        module,
        ...extra
    };
}

export function debug(module, message, extra = {}) {
    logger.debug(message, buildContext(module, extra));
}

export function info(module, message, extra = {}) {
    logger.info(message, buildContext(module, extra));
}

export function warn(module, message, extra = {}) {
    logger.warn(message, buildContext(module, extra));
}

export function error(module, message, extra = {}) {
    logger.error(message, buildContext(module, extra));
}

export default {
    debug,
    info,
    warn,
    error
};