import {
    ActionHandlerEvent,
    computeRTL,
    handleAction,
    HomeAssistant,
    LovelaceCard,
    LovelaceCardEditor,
} from "custom-card-helpers";
import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { computeStateDisplay } from "../../ha/common/entity/compute-state-display";
import { isActive, isAvailable } from "../../ha/data/entity";
import "../../shared/badge-icon";
import "../../shared/card";
import "../../shared/shape-icon";
import "../../shared/state-info";
import "../../shared/state-item";
import { cardStyle } from "../../utils/card-styles";
import { computeRgbColor } from "../../utils/colors";
import { registerCustomCard } from "../../utils/custom-cards";
import { actionHandler } from "../../utils/directives/action-handler-directive";
import { stateIcon } from "../../utils/icons/state-icon";
import { getInfo } from "../../utils/info";
import { WATER_HEATER_PROFILE_CARD_EDITOR_NAME, WATER_HEATER_PROFILE_CARD_NAME } from "./const";
import { WaterHeaterProfileCardConfig } from "./water-heater-profile-card-config";
import "./controls/profile-control";
import { WATER_HEATER_INFO_DOMAINS } from "../water-heater-info-card/const";

registerCustomCard({
    type: WATER_HEATER_PROFILE_CARD_NAME,
    name: "OSO Energy Water Heater Profile Card",
    description: "Card for all entities",
});

@customElement(WATER_HEATER_PROFILE_CARD_NAME)
export class WaterHeaterProfileCard extends LitElement implements LovelaceCard {
    public static async getConfigElement(): Promise<LovelaceCardEditor> {
        await import("./water-heater-profile-card-editor");
        return document.createElement(WATER_HEATER_PROFILE_CARD_EDITOR_NAME) as LovelaceCardEditor;
    }

    public static async getStubConfig(hass: HomeAssistant): Promise<WaterHeaterProfileCardConfig> {
        const entities = Object.keys(hass.states);
        const heaters = entities.filter((e) => WATER_HEATER_INFO_DOMAINS.includes(e.split(".")[0]));
        return {
            type: `custom:${WATER_HEATER_PROFILE_CARD_NAME}`,
            entity: heaters[0],
        };
    }

    @property({ attribute: false }) public hass!: HomeAssistant;

    @state() private _config?: WaterHeaterProfileCardConfig;

    getCardSize(): number | Promise<number> {
        return 2;
    }

    setConfig(config: WaterHeaterProfileCardConfig): void {
        this._config = {
            ...config,
        };
    }

    private _handleAction(ev: ActionHandlerEvent) {
        handleAction(this, this.hass!, this._config!, ev.detail.action!);
    }

    protected render(): TemplateResult {
        if (!this._config || !this.hass || !this._config.entity) {
            return html``;
        }

        const entityId = this._config.entity;
        const entity = this.hass.states[entityId];

        const name = this._config.name || entity.attributes.friendly_name || "";
        const icon = this._config.icon || stateIcon(entity);
        const hideIcon = !!this._config.hide_icon;

        const stateDisplay = computeStateDisplay(this.hass.localize, entity, this.hass.locale);

        const primary = getInfo("name", name, stateDisplay, entity, this.hass);
        const secondary = getInfo("state", name, stateDisplay, entity, this.hass);

        const iconColor = this._config.icon_color;

        const rtl = computeRTL(this.hass);

        return html`
            <oso-energy-card ?rtl=${rtl}>
                <oso-energy-state-item
                    ?rtl=${rtl}
                    @action=${this._handleAction}
                    .actionHandler=${actionHandler({})}
                    .hide_info=${primary == null && secondary == null}
                    .hide_icon=${hideIcon}
                >
                    ${!hideIcon ? this.renderIcon(icon, iconColor, isActive(entity)) : undefined}
                    ${!isAvailable(entity)
                        ? html`
                              <oso-energy-badge-icon
                                  class="unavailable"
                                  slot="badge"
                                  icon="mdi:help"
                              ></oso-energy-badge-icon>
                          `
                        : null}
                    <oso-energy-state-info
                        slot="info"
                        .primary=${primary}
                        .secondary=${secondary}
                    ></oso-energy-state-info>
                </oso-energy-state-item>
                <oso-energy-heater-profile
                    .hass=${this.hass}
                    .entity=${entity}
                ></oso-energy-heater-profile>
            </oso-energy-card>
        `;
    }

    renderIcon(icon: string, iconColor: string | undefined, active: boolean): TemplateResult {
        const iconStyle = {};
        if (iconColor) {
            const iconRgbColor = computeRgbColor(iconColor);
            iconStyle["--icon-color"] = `rgb(${iconRgbColor})`;
            iconStyle["--shape-color"] = `rgba(${iconRgbColor}, 0.2)`;
        }
        return html`
            <oso-energy-shape-icon
                slot="icon"
                .disabled=${!active}
                .icon=${icon}
                style=${styleMap(iconStyle)}
            ></oso-energy-shape-icon>
        `;
    }

    static get styles(): CSSResultGroup {
        return [
            cardStyle,
            css`
                oso-energy-state-item {
                    cursor: pointer;
                }
                oso-energy-shape-icon {
                    --icon-color: rgb(var(--rgb-state-entity));
                    --shape-color: rgba(var(--rgb-state-entity), 0.2);
                }
            `,
        ];
    }
}
