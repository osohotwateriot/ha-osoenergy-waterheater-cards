import { css } from "lit";
import * as Color from "color";

export const COLORS = [
    "red",
    "pink",
    "purple",
    "deep-purple",
    "indigo",
    "blue",
    "light-blue",
    "cyan",
    "teal",
    "green",
    "light-green",
    "lime",
    "yellow",
    "amber",
    "orange",
    "deep-orange",
    "brown",
    "grey",
    "blue-grey",
    "black",
    "white",
];

export function computeRgbColor(color: string): string {
    if (COLORS.includes(color)) {
        return `var(--rgb-${color})`;
    } else if (color.startsWith("#")) {
        try {
            return Color.rgb(color).rgb().array().join(", ");
        } catch (err) {
            return "";
        }
    }
    return color;
}

export function computeColorName(color: string): string {
    return color
        .split("-")
        .map((s) => capitalizeFirstLetter(s))
        .join(" ");
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const colorCss = css`
    /* DEFAULT */
    --default-red: 244, 67, 54;
    --default-pink: 233, 30, 99;
    --default-purple: 156, 39, 176;
    --default-deep-purple: 103, 58, 183;
    --default-indigo: 63, 81, 181;
    --default-blue: 33, 150, 243;
    --default-light-blue: 3, 169, 244;
    --default-cyan: 0, 188, 212;
    --default-teal: 0, 150, 136;
    --default-green: 76, 175, 80;
    --default-light-green: 139, 195, 74;
    --default-lime: 205, 220, 57;
    --default-yellow: 255, 235, 59;
    --default-amber: 255, 193, 7;
    --default-orange: 255, 152, 0;
    --default-deep-orange: 255, 87, 34;
    --default-brown: 121, 85, 72;
    --default-grey: 158, 158, 158;
    --default-blue-grey: 96, 125, 139;
    --default-black: 0, 0, 0;
    --default-white: 255, 255, 255;

    /* RGB */
    /* Standard colors */
    --rgb-red: var(--oso-rgb-red, var(--default-red));
    --rgb-pink: var(--oso-rgb-pink, var(--default-pink));
    --rgb-purple: var(--oso-rgb-purple, var(--default-purple));
    --rgb-deep-purple: var(--oso-rgb-deep-purple, var(--default-deep-purple));
    --rgb-indigo: var(--oso-rgb-indigo, var(--default-indigo));
    --rgb-blue: var(--oso-rgb-blue, var(--default-blue));
    --rgb-light-blue: var(--oso-rgb-light-blue, var(--default-light-blue));
    --rgb-cyan: var(--oso-rgb-cyan, var(--default-cyan));
    --rgb-teal: var(--oso-rgb-teal, var(--default-teal));
    --rgb-green: var(--oso-rgb-green, var(--default-green));
    --rgb-light-green: var(--oso-rgb-light-green, var(--default-light-green));
    --rgb-lime: var(--oso-rgb-lime, var(--default-lime));
    --rgb-yellow: var(--oso-rgb-yellow, var(--default-yellow));
    --rgb-amber: var(--oso-rgb-amber, var(--default-amber));
    --rgb-orange: var(--oso-rgb-orange, var(--default-orange));
    --rgb-deep-orange: var(--oso-rgb-deep-orange, var(--default-deep-orange));
    --rgb-brown: var(--oso-rgb-brown, var(--default-brown));
    --rgb-grey: var(--oso-rgb-grey, var(--default-grey));
    --rgb-blue-grey: var(--oso-rgb-blue-grey, var(--default-blue-grey));
    --rgb-black: var(--oso-rgb-black, var(--default-black));
    --rgb-white: var(--oso-rgb-white, var(--default-white));

    /* Action colors */
    --rgb-info: var(--oso-rgb-info, var(--rgb-blue));
    --rgb-success: var(--oso-rgb-success, var(--rgb-green));
    --rgb-warning: var(--oso-rgb-warning, var(--rgb-orange));
    --rgb-danger: var(--oso-rgb-danger, var(--rgb-red));

    /* State colors */
    --rgb-state-cover: var(--oso-rgb-state-cover, var(--rgb-blue));
    --rgb-state-vacuum: var(--oso-rgb-state-vacuum, var(--rgb-teal));
    --rgb-state-fan: var(--oso-rgb-state-fan, var(--rgb-green));
    --rgb-state-light: var(--oso-rgb-state-light, var(--rgb-orange));
    --rgb-state-entity: var(--oso-rgb-state-entity, var(--rgb-blue));
    --rgb-state-media-player: var(--oso-rgb-state-media-player, var(--rgb-indigo));
    --rgb-state-lock: var(--oso-rgb-state-lock, var(--rgb-blue));

    /* State alarm colors */
    --rgb-state-alarm-disarmed: var(--oso-rgb-state-alarm-disarmed, var(--rgb-info));
    --rgb-state-alarm-armed: var(--oso-rgb-state-alarm-armed, var(--rgb-success));
    --rgb-state-alarm-triggered: var(--oso-rgb-state-alarm-triggered, var(--rgb-danger));

    /* State person colors */
    --rgb-state-person-home: var(--oso-rgb-state-person-home, var(--rgb-success));
    --rgb-state-person-not-home: var(--oso-rgb-state-person-not-home, var(--rgb-danger));
    --rgb-state-person-zone: var(--oso-rgb-state-person-zone, var(--rgb-info));
    --rgb-state-person-unknown: var(--oso-rgb-state-person-unknown, var(--rgb-grey));

    /* State update colors */
    --rgb-state-update-on: var(--oso-rgb-state-update-on, var(--rgb-orange));
    --rgb-state-update-off: var(--oso-rgb-update-off, var(--rgb-green));
    --rgb-state-update-installing: var(--oso-rgb-update-installing, var(--rgb-blue));
`;
