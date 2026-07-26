import { RoleManager } from "./roleManager.js";

export class MultiRoleManager {

    /**
     * Toggle every selected role
     */
    static async toggle(member, roles = []) {

        const results = [];

        for (const roleId of roles) {

            try {

                const action =
                    await RoleManager.safeToggle(
                        member,
                        roleId
                    );

                results.push({
                    roleId,
                    success: true,
                    action
                });

            } catch (error) {

                results.push({
                    roleId,
                    success: false,
                    error: error.message
                });

            }

        }

        return results;

    }

    /**
     * Add multiple roles
     */
    static async add(member, roles = []) {

        return RoleManager.addMany(
            member,
            roles
        );

    }

    /**
     * Remove multiple roles
     */
    static async remove(member, roles = []) {

        return RoleManager.removeMany(
            member,
            roles
        );

    }

    /**
     * User can only have ONE role from a group
     */
    static async chooseOne(
        member,
        selectedRole,
        groupRoles = []
    ) {

        for (const role of groupRoles) {

            if (
                role !== selectedRole &&
                member.roles.cache.has(role)
            ) {

                await RoleManager.safeRemove(
                    member,
                    role
                ).catch(() => {});

            }

        }

        await RoleManager.safeAdd(
            member,
            selectedRole
        );

        return true;

    }

    /**
     * Remove conflicting roles
     */
    static async removeConflicts(
        member,
        conflicts = {}
    ) {

        for (const role in conflicts) {

            if (
                !member.roles.cache.has(role)
            )
                continue;

            const remove = conflicts[role];

            for (const conflict of remove) {

                if (
                    member.roles.cache.has(conflict)
                ) {

                    await RoleManager.safeRemove(
                        member,
                        conflict
                    ).catch(() => {});

                }

            }

        }

    }

    /**
     * Maximum number of roles allowed
     */
    static count(member, group = []) {

        let total = 0;

        for (const role of group) {

            if (
                member.roles.cache.has(role)
            )
                total++;

        }

        return total;

    }

    /**
     * Check if limit reached
     */
    static limitReached(
        member,
        group,
        limit
    ) {

        return (
            this.count(member, group) >= limit
        );

    }

}