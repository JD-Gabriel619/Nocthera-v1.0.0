export default class ComponentResolver {

    static find(panel, customId) {

        if (!panel)
            return null;

        if (!panel.components)
            return null;

        return panel.components.find(component => {

            return component.customId === customId;

        }) ?? null;

    }

}