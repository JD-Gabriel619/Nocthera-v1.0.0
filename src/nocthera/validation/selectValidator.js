export default function validateSelect(menu = {}) {

    const errors = [];

    if (!Array.isArray(menu.options)) {

        errors.push("Select menu options missing.");

        return errors;

    }

    if (
        menu.options.length < 1 ||
        menu.options.length > 25
    ) {

        errors.push("Select menu must contain 1-25 options.");

    }

    return errors;

}