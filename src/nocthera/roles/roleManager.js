import {
    PermissionsBitField
} from "discord.js";

export class RoleManager {

    /**
     * Give a role
     */
    static async add(member, roleId) {

        const role = member.guild.roles.cache.get(roleId);

        if (!role)
            throw new Error("Role not found.");

        if (member.roles.cache.has(roleId))
            return false;

        await member.roles.add(role);

        return true;
    }

    /**
     * Remove a role
     */
    static async remove(member, roleId) {

        const role = member.guild.roles.cache.get(roleId);

        if (!role)
            throw new Error("Role not found.");

        if (!member.roles.cache.has(roleId))
            return false;

        await member.roles.remove(role);

        return true;
    }

    /**
     * Toggle role
     */
    static async toggle(member, roleId) {

        if (member.roles.cache.has(roleId)) {

            await this.remove(member, roleId);

            return "removed";

        }

        await this.add(member, roleId);

        return "added";

    }

    /**
     * Replace one role with another
     */
    static async replace(member, oldRole, newRole) {

        if (oldRole)
            await this.remove(member, oldRole).catch(() => {});

        await this.add(member, newRole);

        return true;

    }

    /**
     * Add multiple roles
     */
    static async addMany(member, roles = []) {

        const results = [];

        for (const role of roles) {

            try {

                await this.add(member, role);

                results.push({
                    role,
                    success: true
                });

            } catch (error) {

                results.push({
                    role,
                    success: false,
                    error: error.message
                });

            }

        }

        return results;

    }

    /**
     * Remove multiple roles
     */
    static async removeMany(member, roles = []) {

        const results = [];

        for (const role of roles) {

            try {

                await this.remove(member, role);

                results.push({
                    role,
                    success: true
                });

            } catch (error) {

                results.push({
                    role,
                    success: false,
                    error: error.message
                });

            }

        }

        return results;

    }

    /**
     * Does member have role?
     */
    static has(member, roleId) {

        return member.roles.cache.has(roleId);

    }

    /**
     * Check if bot can manage the role
     */
    static canManage(member, roleId) {

        const me = member.guild.members.me;

        if (!me)
            return false;

        if (
            !me.permissions.has(
                PermissionsBitField.Flags.ManageRoles
            )
        )
            return false;

        const role = member.guild.roles.cache.get(roleId);

        if (!role)
            return false;

        return me.roles.highest.position > role.position;

    }

    /**
     * Safe add with permission checks
     */
    static async safeAdd(member, roleId) {

        if (!this.canManage(member, roleId))
            throw new Error("Cannot manage role.");

        return this.add(member, roleId);

    }

    /**
     * Safe remove with permission checks
     */
    static async safeRemove(member, roleId) {

        if (!this.canManage(member, roleId))
            throw new Error("Cannot manage role.");

        return this.remove(member, roleId);

    }

    /**
     * Safe toggle
     */
    static async safeToggle(member, roleId) {

        if (!this.canManage(member, roleId))
            throw new Error("Cannot manage role.");

        return this.toggle(member, roleId);

    }

}