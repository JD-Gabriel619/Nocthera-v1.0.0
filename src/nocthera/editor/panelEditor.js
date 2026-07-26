import {
    getWizard,
    updateWizard
} from "../wizard/panelWizard.js";

function getEmbed(panel) {

    panel.embeds ??= [{}];

    return panel.embeds[0];

}

export function getPanel(userId) {

    return getWizard(userId)?.panel ?? null;

}

export function setTitle(userId, title) {

    const panel = getPanel(userId);

    if (!panel)
        return null;

    getEmbed(panel).title = title;

    return updateWizard(userId, panel);

}

export function setDescription(userId, description) {

    const panel = getPanel(userId);

    if (!panel)
        return null;

    getEmbed(panel).description = description;

    return updateWizard(userId, panel);

}

export function setColor(userId, color) {

    const panel = getPanel(userId);

    if (!panel)
        return null;

    getEmbed(panel).color = color;

    return updateWizard(userId, panel);

}

export function setFooter(userId, text) {

    const panel = getPanel(userId);

    if (!panel)
        return null;

    getEmbed(panel).footer = {
        text
    };

    return updateWizard(userId, panel);

}

export function setAuthor(userId, author) {

    const panel = getPanel(userId);

    if (!panel)
        return null;

    getEmbed(panel).author = author;

    return updateWizard(userId, panel);

}

export function setThumbnail(userId, url) {

    const panel = getPanel(userId);

    if (!panel)
        return null;

    getEmbed(panel).thumbnail = {
        url
    };

    return updateWizard(userId, panel);

}

export function setImage(userId, url) {

    const panel = getPanel(userId);

    if (!panel)
        return null;

    getEmbed(panel).image = {
        url
    };

    return updateWizard(userId, panel);

}

export function addField(userId, field) {

    const panel = getPanel(userId);

    if (!panel)
        return null;

    const embed = getEmbed(panel);

    embed.fields ??= [];

    embed.fields.push(field);

    return updateWizard(userId, panel);

}

export function removeField(userId, index) {

    const panel = getPanel(userId);

    if (!panel)
        return null;

    const embed = getEmbed(panel);

    embed.fields ??= [];

    embed.fields.splice(index, 1);

    return updateWizard(userId, panel);

}

export default {

    getPanel,
    setTitle,
    setDescription,
    setColor,
    setFooter,
    setAuthor,
    setThumbnail,
    setImage,
    addField,
    removeField

};