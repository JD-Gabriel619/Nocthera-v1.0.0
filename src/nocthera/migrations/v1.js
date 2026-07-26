export default {

    version: 1,

    async up(panel) {

        panel.version = 1;

        panel.createdAt ??= Date.now();

        panel.updatedAt ??= Date.now();

        panel.embeds ??= [];

        panel.components ??= [];

    }

};