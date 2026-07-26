import { loadAll, unloadAll, runHealthChecks } from "./moduleManager.js";
import { resolveLoadOrder } from "./dependencyResolver.js";
import { all } from "./moduleManager.js";
import Log from "./logger/frameworkLogger.js";

export async function boot(client) {

    Log.info("boot", "Starting Nocthera...");

    const modules = resolveLoadOrder(all());

    for (const module of modules) {

        if (!module.enabled)
            continue;

        if (typeof module.onLoad === "function") {
            await module.onLoad(client);
        }

    }

    Log.info("boot", "Nocthera started.", {
        modules: modules.length
    });

}

export async function shutdown(client) {

    Log.info("boot", "Stopping Nocthera...");

    await unloadAll(client);

    Log.info("boot", "Nocthera stopped.");

}

export async function health(client) {

    return runHealthChecks(client);

}

export default {
    boot,
    shutdown,
    health
};