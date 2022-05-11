import { HassEntity } from "home-assistant-js-websocket";

export const UNAVAILABLE = "unavailable";
export const UNKNOWN = "unknown";

export const ON = "on";
export const OFF = "off";

export function isActive(entity: HassEntity) {
    const domain = entity.entity_id.split(".")[0];
    const state = entity.state;
    if (state === UNAVAILABLE || state === UNKNOWN) return false;

    return true;
}

export function isAvailable(entity: HassEntity) {
    return entity.state !== UNAVAILABLE;
}

export function isOff(entity: HassEntity) {
    return entity.state === OFF;
}

export function isUnknown(entity: HassEntity) {
    return entity.state === UNKNOWN;
}
