import os from "node:os";
import * as Metrics from "../metrics/index.js";
import * as Cache from "../cache/index.js";

let interval = null;

function getMemory() {

    const used = process.memoryUsage();

    return {
        rss: used.rss,
        heapUsed: used.heapUsed,
        heapTotal: used.heapTotal,
        external: used.external
    };

}

function getSystem() {

    return {
        uptime: process.uptime(),
        cpuLoad: os.loadavg(),
        freeMemory: os.freemem(),
        totalMemory: os.totalmem()
    };

}

export function getHealth() {

    return {
        timestamp: Date.now(),
        memory: getMemory(),
        system: getSystem(),
        cacheSize: Cache.size(),
        metrics: Metrics.all()
    };

}

export function start(intervalMs = 60000) {

    if (interval)
        return;

    interval = setInterval(() => {

        const health = getHealth();

        if (health.memory.heapUsed > 512 * 1024 * 1024) {

            console.warn(
                "[Nocthera] High memory usage detected."
            );

        }

    }, intervalMs);

}

export function stop() {

    if (!interval)
        return;

    clearInterval(interval);

    interval = null;

}

export default {

    getHealth,
    start,
    stop

};