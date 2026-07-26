const migrations = [];

export function register(migration) {

    migrations.push(migration);

    migrations.sort((a, b) => a.version - b.version);

}

export async function migrate(panel) {

    let changed = false;

    for (const migration of migrations) {

        if ((panel.version ?? 0) >= migration.version)
            continue;

        await migration.up(panel);

        panel.version = migration.version;

        changed = true;

    }

    return changed;

}

export function getLatestVersion() {

    if (migrations.length === 0)
        return 1;

    return migrations[migrations.length - 1].version;

}

export default {
    register,
    migrate,
    getLatestVersion
};