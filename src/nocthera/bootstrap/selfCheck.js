import * as ModuleManager from "../moduleManager.js";
import MigrationManager from "../migrations/migrationManager.js";
import * as Cache from "../cache/index.js";
import * as Metrics from "../metrics/index.js";

export async function selfCheck(client) {

    const report = {
        success: true,
        checks: []
    };

    try {

        await ModuleManager.loadAll(client);

        report.checks.push({
            name: "Modules",
            success: true
        });

    } catch (error) {

        report.success = false;

        report.checks.push({
            name: "Modules",
            success: false,
            error: error.message
        });

    }

    report.checks.push({
        name: "Cache",
        success: Cache.size() >= 0
    });

    report.checks.push({
        name: "Metrics",
        success: Metrics.uptime() >= 0
    });

    report.checks.push({
        name: "Schema",
        success: MigrationManager.getLatestVersion() > 0
    });

    return report;

}

export default selfCheck;