import "./modules/rolePanel/index.js";
import "./modules/buttonRole/index.js";
import "./modules/multiRole/index.js";
import "./modules/linkButton/index.js";
import "./modules/verification/index.js";
import "./modules/captcha/index.js";
import "./modules/ticket/index.js";
import "./modules/applications/index.js";
import "./modules/giveaway/index.js";
import loadModules from "./moduleLoader.js";

export async function loadModules() {
    return true;
}

export default loadModules;