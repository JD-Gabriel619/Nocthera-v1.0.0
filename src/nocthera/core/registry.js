/**
 * Nocthera Registry
 *
 * Central registry for every Nocthera module.
 * Nothing should directly import another module whenever possible.
 * Instead everything registers itself here.
 */

import "./loadModules.js";

class Registry {
    constructor() {
        this.clear();
    }

    clear() {
        this.buttons = new Map();
        this.menus = new Map();
        this.modals = new Map();

        this.verifications = new Map();
        this.roleActions = new Map();

        this.importers = new Map();
        this.exporters = new Map();

        this.templates = new Map();

        this.parsers = new Map();
        this.validators = new Map();
    }

    /* -------------------------------------------------- */
    /* Buttons                                             */
    /* -------------------------------------------------- */

    registerButton(name, handler) {
        this.buttons.set(name, handler);
    }

    getButton(name) {
        return this.buttons.get(name);
    }

    hasButton(name) {
        return this.buttons.has(name);
    }

    /* -------------------------------------------------- */
    /* Select Menus                                        */
    /* -------------------------------------------------- */

    registerMenu(name, handler) {
        this.menus.set(name, handler);
    }

    getMenu(name) {
        return this.menus.get(name);
    }

    /* -------------------------------------------------- */
    /* Modals                                              */
    /* -------------------------------------------------- */

    registerModal(name, handler) {
        this.modals.set(name, handler);
    }

    getModal(name) {
        return this.modals.get(name);
    }

    /* -------------------------------------------------- */
    /* Verification Methods                                */
    /* -------------------------------------------------- */

    registerVerification(name, handler) {
        this.verifications.set(name, handler);
    }

    getVerification(name) {
        return this.verifications.get(name);
    }

    /* -------------------------------------------------- */
    /* Role Actions                                        */
    /* -------------------------------------------------- */

    registerRoleAction(name, handler) {
        this.roleActions.set(name, handler);
    }

    getRoleAction(name) {
        return this.roleActions.get(name);
    }

    /* -------------------------------------------------- */
    /* Importers                                           */
    /* -------------------------------------------------- */

    registerImporter(name, handler) {
        this.importers.set(name, handler);
    }

    getImporter(name) {
        return this.importers.get(name);
    }

    /* -------------------------------------------------- */
    /* Exporters                                           */
    /* -------------------------------------------------- */

    registerExporter(name, handler) {
        this.exporters.set(name, handler);
    }

    getExporter(name) {
        return this.exporters.get(name);
    }

    /* -------------------------------------------------- */
    /* Templates                                           */
    /* -------------------------------------------------- */

    registerTemplate(name, template) {
        this.templates.set(name, template);
    }

    getTemplate(name) {
        return this.templates.get(name);
    }

    getTemplates() {
        return [...this.templates.keys()];
    }

    /* -------------------------------------------------- */
    /* Parsers                                             */
    /* -------------------------------------------------- */

    registerParser(name, parser) {
        this.parsers.set(name, parser);
    }

    getParser(name) {
        return this.parsers.get(name);
    }

    /* -------------------------------------------------- */
    /* Validators                                          */
    /* -------------------------------------------------- */

    registerValidator(name, validator) {
        this.validators.set(name, validator);
    }

    getValidator(name) {
        return this.validators.get(name);
    }

    /* -------------------------------------------------- */
    /* Statistics                                          */
    /* -------------------------------------------------- */

    stats() {
        return {
            buttons: this.buttons.size,
            menus: this.menus.size,
            modals: this.modals.size,

            verifications: this.verifications.size,
            roleActions: this.roleActions.size,

            importers: this.importers.size,
            exporters: this.exporters.size,

            templates: this.templates.size,

            parsers: this.parsers.size,
            validators: this.validators.size
        };
    }
}

const registry = new Registry();

export default registry;