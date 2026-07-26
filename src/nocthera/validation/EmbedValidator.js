const HEX_COLOR =
    /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

export default function validateEmbed(embed = {}) {

    const errors = [];

    if (
        embed.title &&
        embed.title.length > 256
    ) {
        errors.push("Embed title exceeds 256 characters.");
    }

    if (
        embed.description &&
        embed.description.length > 4096
    ) {
        errors.push("Embed description exceeds 4096 characters.");
    }

    if (
        embed.color &&
        !HEX_COLOR.test(embed.color)
    ) {
        errors.push("Invalid embed color.");
    }

    return errors;

}