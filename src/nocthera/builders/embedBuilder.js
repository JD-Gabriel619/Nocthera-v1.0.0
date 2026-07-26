import { EmbedBuilder } from "discord.js";

export function buildEmbed(data = {}) {

    const embed = new EmbedBuilder();

    if (data.title)
        embed.setTitle(data.title);

    if (data.description)
        embed.setDescription(data.description);

    if (data.color)
        embed.setColor(data.color);

    if (data.url)
        embed.setURL(data.url);

    if (data.author)
        embed.setAuthor(data.author);

    if (data.footer)
        embed.setFooter(data.footer);

    if (data.thumbnail)
        embed.setThumbnail(
            data.thumbnail.url || data.thumbnail
        );

    if (data.image)
        embed.setImage(
            data.image.url || data.image
        );

    if (Array.isArray(data.fields))
        embed.addFields(data.fields);

    if (data.timestamp)
        embed.setTimestamp();

    return embed;

}

export default buildEmbed;