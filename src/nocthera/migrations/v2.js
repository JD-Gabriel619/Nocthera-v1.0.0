export default {

    version: 2,

    async up(panel) {

        for (const row of panel.components ?? []) {

            row.components ??= [];

            for (const component of row.components) {

                if (
                    component.type === 2 &&
                    !component.style
                ) {

                    component.style = "primary";

                }

            }

        }

    }

};