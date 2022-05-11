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
import "../../shared/state-half-item";
import "../../shared/checkbox";
import { cardStyle } from "../../utils/card-styles";
import { computeRgbColor } from "../../utils/colors";
import { registerCustomCard } from "../../utils/custom-cards";
import { actionHandler } from "../../utils/directives/action-handler-directive";
import { stateIcon } from "../../utils/icons/state-icon";
import { getInfo } from "../../utils/info";
import {
    WATER_HEATER_INFO_CARD_EDITOR_NAME,
    WATER_HEATER_INFO_CARD_NAME,
    WATER_HEATER_INFO_DOMAINS,
    WATER_HEATER_SENSOR_DOMAIN,
} from "./const";
import { WaterHeaterInfoCardConfig } from "./water-heater-info-card-config";
import "./controls/v40-min-control";
import { isCommandsControlVisible } from "./controls/water-heater-commands-control";
import { getMode } from "./utils";
import setupCustomlocalize from "../../localize";

registerCustomCard({
    type: WATER_HEATER_INFO_CARD_NAME,
    name: "OSO Energy Water Heater Info Card",
    description: "Card for all entities",
});

@customElement(WATER_HEATER_INFO_CARD_NAME)
export class WaterHeaterInfoCard extends LitElement implements LovelaceCard {
    public static async getConfigElement(): Promise<LovelaceCardEditor> {
        await import("./water-heater-info-card-editor");
        return document.createElement(WATER_HEATER_INFO_CARD_EDITOR_NAME) as LovelaceCardEditor;
    }

    public static async getStubConfig(hass: HomeAssistant): Promise<WaterHeaterInfoCardConfig> {
        const entities = Object.keys(hass.states);
        const heaters = entities.filter((e) => WATER_HEATER_INFO_DOMAINS.includes(e.split(".")[0]));
        return {
            type: `custom:${WATER_HEATER_INFO_CARD_NAME}`,
            entity: heaters[0],
            sensor_water_40: "",
            sensor_power_save: "",
        };
    }

    @property({ attribute: false }) public hass!: HomeAssistant;

    @property({ attribute: false }) private full_utilization!: boolean;

    @state() private _config?: WaterHeaterInfoCardConfig;

    getCardSize(): number | Promise<number> {
        return 2;
    }

    setConfig(config: WaterHeaterInfoCardConfig): void {
        this._config = {
            ...config,
        };
    }

    private _handleAction(ev: ActionHandlerEvent) {
        handleAction(this, this.hass!, this._config!, ev.detail.action!);
    }

    private toggle_full_utilization() {
        this.full_utilization = !this.full_utilization;
    }

    protected render(): TemplateResult {
        if (!this._config || !this.hass || !this._config.entity) {
            return html``;
        }

        const customLocalize = setupCustomlocalize(this.hass!);

        const hideState = this._config.hide_state;
        const hideIcon = !!this._config.hide_icon;
        const iconColor = this._config.icon_color;
        let icon: string = this._config.icon || "mdi:water-boiler";
        const showV40Control = !!this._config.show_v40_min_control;

        const sensorWater40Id = this._config.sensor_water_40;
        let water_quantity_primary: any = "Unknown";
        const water_quantity_secondary = customLocalize(
            "editor.card.water_heater.40_degrees_water"
        );
        if (sensorWater40Id) {
            const sensor_water_40 = this.hass.states[sensorWater40Id];
            const water_quantity_state = computeStateDisplay(
                this.hass.localize,
                sensor_water_40,
                this.hass.locale
            );

            water_quantity_primary = getInfo(
                "state",
                "",
                water_quantity_state,
                sensor_water_40,
                this.hass
            );
        }

        let sensorPowerSaveId = this._config.sensor_power_save;
        let vacation_mode_primary: any = customLocalize("editor.card.water_heater.off");
        const vacation_mode_secondary: any = customLocalize(
            "editor.card.water_heater.vacation_mode"
        );
        if (sensorPowerSaveId) {
            const sensor_power_save = this.hass.states[sensorPowerSaveId];
            const power_save_state = computeStateDisplay(
                this.hass.localize,
                sensor_power_save,
                this.hass.locale
            );

            vacation_mode_primary = power_save_state;
        }

        const entityId = this._config.entity;
        let primary: any = customLocalize("editor.card.water_heater.water_heater");
        let secondary: any = "Info";

        let mode_primary: any = "None";
        const mode_secondary: any = customLocalize("editor.card.water_heater.optimization_mode");

        let entity: any = null;
        if (entityId) {
            entity = this.hass.states[entityId];

            const name = this._config.name || entity.attributes.friendly_name || "";
            const stateDisplay = computeStateDisplay(this.hass.localize, entity, this.hass.locale);

            primary = getInfo("name", name, stateDisplay, entity, this.hass);
            secondary = getInfo("state", name, stateDisplay, entity, this.hass);
            icon = this._config.icon || stateIcon(entity);

            mode_primary = getMode(entity);
        }

        const commands = this._config?.commands ?? [];

        const rtl = computeRTL(this.hass);
        const full_utilization_title = customLocalize("editor.card.water_heater.full_utilization_details");
        const full_utilization_label = customLocalize("editor.card.water_heater.full_utilization");

        return html`
            <oso-energy-card .layout="default" ?rtl=${rtl}>
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
                        secondary=${!hideState && secondary}
                    ></oso-energy-state-info>
                </oso-energy-state-item>

                <div class="oso-energy-row">
                    ${!!sensorWater40Id
                        ? html` <oso-energy-state-half-item>
                              ${this.renderIcon("mdi:water-circle", "red", isActive(entity))}
                              <oso-energy-state-info
                                  slot="info"
                                  .primary=${water_quantity_primary}
                                  secondary=${water_quantity_secondary}
                              ></oso-energy-state-info>
                          </oso-energy-state-half-item>`
                        : null}

                    <oso-energy-state-half-item>
                        ${this.renderIcon("mdi:home", "blue", isActive(entity))}
                        <oso-energy-state-info
                            slot="info"
                            .primary=${mode_primary}
                            secondary=${mode_secondary}
                        ></oso-energy-state-info>
                    </oso-energy-state-half-item>

                    ${!!sensorPowerSaveId
                        ? html` <oso-energy-state-half-item>
                              ${this.renderIcon("mdi:beach", "green", isActive(entity))}
                              <oso-energy-state-info
                                  slot="info"
                                  .primary=${vacation_mode_primary}
                                  secondary=${vacation_mode_secondary}
                              ></oso-energy-state-info>
                          </oso-energy-state-half-item>`
                        : null}
                </div>

                ${showV40Control
                    ? html`<oso-energy-v40-min
                          .hass=${this.hass}
                          .entity=${entity}
                      ></oso-energy-v40-min>`
                    : null}
                ${isCommandsControlVisible(commands)
                    ? html`
                          <div class="actions" ?rtl=${rtl}>
                              <oso-energy-checkbox
                                  .label=${full_utilization_label}
                                  .title=${full_utilization_title}
                                  .value=${this.full_utilization}
                                  @click=${this.toggle_full_utilization}
                              >
                              </oso-energy-checkbox>
                              <oso-energy-water-heater-commands-control
                                  .hass=${this.hass}
                                  .entity=${entity}
                                  .commands=${commands}
                                  .full_utilization=${this.full_utilization}
                                  .fill=${true}
                              >
                              </oso-energy-water-heater-commands-control>
                          </div>
                      `
                    : null}
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
                oso-energy-state-half-item {
                    width: 100%;
                }
                oso-energy-shape-icon {
                    --icon-color: rgb(var(--rgb-state-entity));
                    --shape-color: rgba(var(--rgb-state-entity), 0.2);
                }
                oso-energy-checkbox {
                    width: 100%;
                }
                .oso-energy-row {
                    display: flex;
                    width: 100%;
                }
            `,
        ];
    }
}
