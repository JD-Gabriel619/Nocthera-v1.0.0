import * as Storage from "../storage/index.js";
import * as Publisher from "../publisher/index.js";
import * as Cache from "../cache/index.js";
import * as Metrics from "../metrics/index.js";
import * as Diagnostics from "../diagnostics/index.js";
import * as Admin from "../admin/index.js";
import * as Wizard from "../wizard/index.js";
import * as Editor from "../editor/index.js";
import * as Modules from "../modules/moduleManager.js";

class NoctheraAPI {

    storage = Storage;

    publisher = Publisher;

    cache = Cache;

    metrics = Metrics;

    diagnostics = Diagnostics;

    admin = Admin;

    wizard = Wizard;

    editor = Editor;

    modules = Modules;

    version = "1.0.0";

}

export default new NoctheraAPI();