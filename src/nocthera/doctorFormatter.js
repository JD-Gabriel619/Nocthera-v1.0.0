export function formatDoctorReport(report) {

    const lines = [];

    lines.push("===== Nocthera Doctor =====");
    lines.push("");

    lines.push(`Framework : ${report.framework}`);
    lines.push(`Version   : ${report.version}`);
    lines.push(`Healthy   : ${report.healthy ? "YES" : "NO"}`);
    lines.push("");

    lines.push(
        `Modules (${report.summary.healthy}/${report.summary.total})`
    );

    for (const module of report.modules) {

        lines.push(
            `${module.healthy ? "✅" : "❌"} ${module.id} (${module.version})`
        );

        if (module.error)
            lines.push(`   └─ ${module.error}`);

    }

    return lines.join("\n");

}