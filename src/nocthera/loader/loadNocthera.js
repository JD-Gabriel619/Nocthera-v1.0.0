import { loadModules } from "../moduleLoader.js";
import { loadAll } from "../moduleManager.js";
import { selfCheck } from "../bootstrap/index.js";
import { recoverAll } from "../recovery/index.js";
import { start as startHealthMonitor } from "../health/index.js";

export async function loadNocthera(client) {

    await loadModules();
    await loadAll(client);

    const report = await selfCheck(client);

    const recovered = await recoverAll(client);

    startHealthMonitor();

    return {
        report,
        recovered
    };

}

export default loadNocthera;