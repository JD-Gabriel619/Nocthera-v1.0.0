import "./modules/rolePanel/index.js";
import "./modules/buttonRole/index.js";
import "./modules/multiRole/index.js";
import "./modules/linkButton/index.js";
import "./modules/verification/index.js";
import "./modules/captcha/index.js";
import "./modules/ticket/index.js";
import "./modules/applications/index.js";
import "./modules/giveaway/index.js";

import Log from "./logger/frameworkLogger.js";

export async function loadModules() {

    Log.info("loader", "Loading Nocthera modules...");

    Log.info("loader", "Loaded rolePanel");
    Log.info("loader", "Loaded buttonRole");
    Log.info("loader", "Loaded multiRole");
    Log.info("loader", "Loaded linkButton");
    Log.info("loader", "Loaded verification");
    Log.info("loader", "Loaded captcha");
    Log.info("loader", "Loaded ticket");
    Log.info("loader", "Loaded applications");
    Log.info("loader", "Loaded giveaway");

    Log.info("loader", "All modules loaded.");

}

export default loadModules;