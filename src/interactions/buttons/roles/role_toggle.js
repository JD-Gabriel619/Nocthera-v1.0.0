import { handleRoleToggleButton } from '../../../handlers/roleToggleButtons.js';

export default {
    name: 'role_toggle',

    async execute(interaction, client, args) {
        return handleRoleToggleButton(interaction, client, args);
    }
};