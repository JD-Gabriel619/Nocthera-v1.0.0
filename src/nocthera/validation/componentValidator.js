import validateButton from "./buttonValidator.js";
import validateSelect from "./selectValidator.js";

export default function validateComponent(component = {}) {

    switch (component.type) {

        case 2:
            return validateButton(component);

        case 3:
            return validateSelect(component);

        default:
            return [];

    }

}