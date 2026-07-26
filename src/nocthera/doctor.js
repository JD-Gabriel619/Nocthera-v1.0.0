import { all } from "./moduleManager.js";

export async function runDoctor(client) {

    const report = {
        framework: "Nocthera",
        version: "1.0.0",
        healthy: true,
        modules: [],
        summary: {
            total: 0,
            healthy: 0,
            unhealthy: 0
        }
    };

    const modules = all();

    report.summary.total = modules.length;

    for (const module of modules) {

        let healthy = true;
        let error = null;

        try {

            if (typeof module.healthCheck === "function") {
                healthy = await module.healthCheck(client);
            }

        } catch (err) {

            healthy = false;
            error = err.message;

        }

        if (healthy)
            report.summary.healthy++;
        else {
            report.summary.unhealthy++;
            report.healthy = false;
        }

        report.modules.push({
            id: module.id,
            name: module.name,
            version: module.version,
            enabled: module.enabled,
            healthy,
            error
        });

    }

    return report;

}