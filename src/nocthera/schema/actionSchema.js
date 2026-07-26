export function createAction(overrides = {}) {
    return {
        id: null,

        module: null,

        type: null,

        enabled: true,

        settings: {},

        ...overrides
    };
}