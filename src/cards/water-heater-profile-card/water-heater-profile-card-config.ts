import { LovelaceCardConfig } from "custom-card-helpers";
import { assign, boolean, object, optional, string } from "superstruct";
import { baseLovelaceCardConfig } from "../../utils/editor-styles";

export interface WaterHeaterProfileCardConfig extends LovelaceCardConfig {
    entity?: string;
    icon?: string;
    name?: string;
    icon_color?: string;
    hide_icon?: boolean;
}

export const waterHeaterProfileCardConfigStruct = assign(
    baseLovelaceCardConfig,
    object({
        entity: optional(string()),
        icon: optional(string()),
        name: optional(string()),
        icon_color: optional(string()),
        hide_icon: optional(boolean()),
    })
);
