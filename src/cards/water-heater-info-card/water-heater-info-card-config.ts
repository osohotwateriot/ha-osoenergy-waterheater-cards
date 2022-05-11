import { LovelaceCardConfig } from "custom-card-helpers";
import { array, assign, boolean, enums, object, optional, string } from "superstruct";
import { baseLovelaceCardConfig } from "../../utils/editor-styles";

export const WATER_HEATER_COMMANDS = ["turn_on", "turn_off"] as const;

export type WaterHeaterCommand = typeof WATER_HEATER_COMMANDS[number];

export interface WaterHeaterInfoCardConfig extends LovelaceCardConfig {
    entity: string;
    sensor_water_40: string;
    sensor_power_save: string;
    icon?: string;
    icon_color?: string;
    name?: string;
    show_v40_min_control?: boolean;
    commands?: WaterHeaterCommand[];
    hide_state?: boolean;
}

export const waterHeaterInfoCardConfigStruct = assign(
    baseLovelaceCardConfig,
    object({
        entity: optional(string()),
        sensor_water_40: optional(string()),
        sensor_power_save: optional(string()),
        icon: optional(string()),
        icon_color: optional(string()),
        name: optional(string()),
        show_v40_min_control: optional(boolean()),
        commands: optional(array(string())),
        hide_state: optional(boolean()),
    })
);
