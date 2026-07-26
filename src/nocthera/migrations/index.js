import Manager from "./migrationManager.js";

import v1 from "./v1.js";
import v2 from "./v2.js";

Manager.register(v1);
Manager.register(v2);

export default Manager;