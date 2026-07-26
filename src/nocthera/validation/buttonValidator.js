export default function validateButton(button = {}) {

    const errors = [];

    if (!button.label)
        errors.push("Button requires a label.");

    if (
        button.style === "link" &&
        !button.url
    ) {
        errors.push("Link button requires a URL.");
    }

    if (
        button.style !== "link" &&
        !button.custom_id
    ) {
        errors.push("Button requires custom_id.");
    }

    return errors;

}