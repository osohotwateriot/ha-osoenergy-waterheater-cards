import { HassEntity } from "home-assistant-js-websocket";
import { waterHeaterIcon } from "./water-heater-icon";
import { sensorIcon } from "./sensor-icon";

const DEFAULT_DOMAIN_ICON = "mdi:bookmark";

const FIXED_DOMAIN_ICONS = {
    alert: "mdi:alert",
    air_quality: "mdi:air-filter",
    automation: "mdi:robot",
    calendar: "mdi:calendar",
    camera: "mdi:video",
    climate: "mdi:thermostat",
    configurator: "mdi:cog",
    conversation: "mdi:text-to-speech",
    counter: "mdi:counter",
    fan: "mdi:fan",
    google_assistant: "mdi:google-assistant",
    group: "mdi:google-circles-communities",
    homeassistant: "mdi:home-assistant",
    homekit: "mdi:home-automation",
    image_processing: "mdi:image-filter-frames",
    input_button: "mdi:gesture-tap-button",
    input_datetime: "mdi:calendar-clock",
    input_number: "mdi:ray-vertex",
    input_select: "mdi:format-list-bulleted",
    input_text: "mdi:form-textbox",
    light: "mdi:lightbulb",
    mailbox: "mdi:mailbox",
    notify: "mdi:comment-alert",
    number: "mdi:ray-vertex",
    persistent_notification: "mdi:bell",
    person: "mdi:account",
    plant: "mdi:flower",
    proximity: "mdi:apple-safari",
    remote: "mdi:remote",
    scene: "mdi:palette",
    script: "mdi:script-text",
    select: "mdi:format-list-bulleted",
    sensor: "mdi:eye",
    siren: "mdi:bullhorn",
    simple_alarm: "mdi:bell",
    sun: "mdi:white-balance-sunny",
    timer: "mdi:timer-outline",
    updater: "mdi:cloud-upload",
    vacuum: "mdi:robot-vacuum",
    water_heater: "mdi:thermometer",
    weather: "mdi:weather-cloudy",
    zone: "mdi:map-marker-radius",
};

export function domainIcon(domain: string, entity?: HassEntity, state?: string): string {
    switch (domain) {
        case "water_heater":
            return waterHeaterIcon(state);

        case "button":
            switch (entity?.attributes.device_class) {
                case "restart":
                    return "mdi:restart";
                case "update":
                    return "mdi:package-up";
                default:
                    return "mdi:gesture-tap-button";
            }

        case "input_boolean":
            return state === "on" ? "mdi:check-circle-outline" : "mdi:close-circle-outline";

        case "sensor": {
            const icon = sensorIcon(entity);
            if (icon) {
                return icon;
            }

            break;
        }

        case "input_datetime":
            if (!entity?.attributes.has_date) {
                return "mdi:clock";
            }
            if (!entity.attributes.has_time) {
                return "mdi:calendar";
            }
            break;
    }

    if (domain in FIXED_DOMAIN_ICONS) {
        return FIXED_DOMAIN_ICONS[domain];
    }

    // eslint-disable-next-line
    console.warn(`Unable to find icon for domain ${domain}`);
    return DEFAULT_DOMAIN_ICON;
}
