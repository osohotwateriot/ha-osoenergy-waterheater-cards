import { HassEntityAttributeBase, HassEntityBase } from "home-assistant-js-websocket";

export const STATE_ON = "on";
export const STATE_OFF = "off";
export const STATE_ERROR = "error";

export const VACUUM_SUPPORT_TURN_ON = 1;
export const VACUUM_SUPPORT_TURN_OFF = 2;

interface WaterHeaterEntityAttributes extends HassEntityAttributeBase {
    [key: string]: any;
}

export interface WaterHeaterEntity extends HassEntityBase {
    attributes: WaterHeaterEntityAttributes;
}
