import { css } from "lit";
import { colorCss } from "./colors";

export const cardStyle = css`
    :host {
        ${colorCss}
        --spacing: var(--oso-spacing, 12px);
        /* Title */
        --title-padding: var(--oso-title-padding, 24px 12px 16px);
        --title-spacing: var(--oso-title-spacing, 12px);
        --title-font-size: var(--oso-title-font-size, 24px);
        --title-font-weight: var(--oso-title-font-weight, normal);
        --title-line-height: var(--oso-title-line-height, 1.2);
        --subtitle-font-size: var(--oso-subtitle-font-size, 16px);
        --subtitle-font-weight: var(--oso-subtitle-font-weight, normal);
        --subtitle-line-height: var(--oso-subtitle-line-height, 1.2);
        /* Card */
        --icon-border-radius: var(--oso-icon-border-radius, 50%);
        --control-border-radius: var(--oso-control-border-radius, 12px);
        --card-primary-font-size: var(--oso-card-primary-font-size, 14px);
        --card-secondary-font-size: var(--oso-card-secondary-font-size, 12px);
        --card-primary-font-weight: var(--oso-card-primary-font-weight, bold);
        --card-secondary-font-weight: var(--oso-card-secondary-font-weight, bolder);
        /* Chips */
        --chip-spacing: var(--oso-chip-spacing, 8px);
        --chip-padding: var(--oso-chip-padding, 0 10px);
        --chip-height: var(--oso-chip-height, 36px);
        --chip-border-radius: var(--oso-chip-border-radius, 18px);
        --chip-font-size: var(--oso-chip-font-size, 1em);
        --chip-font-weight: var(--oso-chip-font-weight, bold);
        --chip-icon-size: var(--oso-chip-icon-size, 1.5em);
        /* Slider */
        --slider-threshold: var(--oso-slider-threshold);
    }
    .actions {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-end;
        overflow-y: auto;
    }
    .actions *:not(:last-child) {
        margin-right: var(--spacing);
    }
    .actions[rtl] *:not(:last-child) {
        margin-right: initial;
        margin-left: var(--spacing);
    }
    .unavailable {
        --main-color: var(--warning-color);
    }
`;
