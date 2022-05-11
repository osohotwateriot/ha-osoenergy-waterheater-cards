import { HassEntity } from "home-assistant-js-websocket";

export const ON = "on";

export function getV40Min(entity: HassEntity): number {
    let v40Min: number = 200;

    if (entity.attributes.v40_min != null) v40Min = Math.round(entity.attributes.v40_min);

    return v40Min;
}

export function getV40MinLevel(entity: HassEntity): number {
    let v40MinLevel: number = 200;

    if (entity.attributes.v40_level_min != null)
        v40MinLevel = Math.round(entity.attributes.v40_level_min);

    return v40MinLevel;
}

export function getV40MaxLevel(entity: HassEntity): number {
    let v40MaxLevel: number = 200;

    if (entity.attributes.v40_level_max != null)
        v40MaxLevel = Math.round(entity.attributes.v40_level_max);

    return v40MaxLevel;
}

export function getVolume(entity: HassEntity): number {
    let volume: number = 200;

    if (entity.attributes.volume != null) volume = Math.round(entity.attributes.volume);

    return volume;
}

export function getMode(entity: HassEntity): string {
    let mode: string = "None";

    if (entity.attributes.optimization_mode != null) mode = entity.attributes.optimization_mode;

    return mode;
}

export function isHeaterOn(entity: HassEntity): boolean {
    if (entity && entity.state) return entity.state.toLowerCase() == ON.toLowerCase();

    return false;
}
