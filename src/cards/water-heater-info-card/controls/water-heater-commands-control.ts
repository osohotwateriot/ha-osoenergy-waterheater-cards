import { computeRTL, debounce, HomeAssistant } from "custom-card-helpers";
import { html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { isAvailable } from "../../../ha/data/entity";
import { WaterHeaterEntity } from "../../../ha/data/water_heater";
import { WaterHeaterCommand } from "../water-heater-info-card-config";
import "../../../shared/button";
import "../../../shared/button-group";
import { DEBOUNCE_TIMEOUT } from "../../../const";
import { isHeaterOn } from "../utils";
import setupCustomlocalize from "../../../localize";

interface WaterHeaterButton {
    icon: string;
    serviceName: string;
    title: string;
    isVisible: (commands: WaterHeaterCommand[]) => boolean;
    isDisabled: (entity: WaterHeaterEntity) => boolean;
}

export const isCommandsControlVisible = (commands: WaterHeaterCommand[]) =>
    WATER_HEATER_BUTTONS.some((item) => item.isVisible(commands));

export const WATER_HEATER_BUTTONS: WaterHeaterButton[] = [
    {
        icon: "mdi:power-on",
        serviceName: "turn_on",
        title: "turn_on",
        isVisible: (commands) => commands.includes("turn_on"),
        isDisabled: (entity) => isHeaterOn(entity),
    },
    {
        icon: "mdi:power-off",
        serviceName: "turn_off",
        title: "turn_off",
        isVisible: (commands) => commands.includes("turn_off"),
        isDisabled: (entity) => !isHeaterOn(entity),
    },
];

@customElement("oso-energy-water-heater-commands-control")
export class CoverButtonsControl extends LitElement {
    @property({ attribute: false }) public hass!: HomeAssistant;

    @property({ attribute: false }) public entity!: WaterHeaterEntity;

    @property({ attribute: false }) public commands!: WaterHeaterCommand[];

    @property({ attribute: false }) public full_utilization!: boolean;

    @property() public fill: boolean = false;

    _debounceCallService = debounce(async (entry: WaterHeaterButton) => {
        await this.hass.callService("osoenergy", entry.serviceName, {
            entity_id: this.entity!.entity_id,
            full_utilization: !!this.full_utilization,
        });
    }, DEBOUNCE_TIMEOUT);

    private callService(e: CustomEvent) {
        e.stopPropagation();
        const entry = (e.target! as any).entry as WaterHeaterButton;
        this._debounceCallService(entry);
    }

    protected render(): TemplateResult {
        const rtl = computeRTL(this.hass);
        const customLocalize = setupCustomlocalize(this.hass!);

        return html`
            <oso-energy-button-group .fill=${this.fill} ?rtl=${rtl}>
                ${WATER_HEATER_BUTTONS.filter((item) => item.isVisible(this.commands)).map(
                    (item) => html`
                        <oso-energy-button
                            .icon=${item.icon}
                            .entry=${item}
                            .title=${item.title
                                ? customLocalize(`editor.card.commands.water_heater.${item.title}`)
                                : ""}
                            .disabled=${!isAvailable(this.entity) || item.isDisabled(this.entity)}
                            @click=${this.callService}
                        ></oso-energy-button>
                    `
                )}
            </oso-energy-button-group>
        `;
    }
}
