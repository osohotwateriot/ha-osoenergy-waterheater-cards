import { fireEvent, HomeAssistant, LocalizeFunc, LovelaceCardEditor } from "custom-card-helpers";
import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import memoizeOne from "memoize-one";
import { assert } from "superstruct";
import setupCustomlocalize from "../../localize";
import { configElementStyle } from "../../utils/editor-styles";
import { GENERIC_FIELDS } from "../../utils/form/fields";
import { HaFormSchema } from "../../utils/form/ha-form";
import { stateIcon } from "../../utils/icons/state-icon";
import { loadHaComponents } from "../../utils/loader";
import {
    WATER_HEATER_INFO_CARD_EDITOR_NAME,
    WATER_HEATER_INFO_DOMAINS,
    WATER_HEATER_SENSOR_DOMAIN,
} from "./const";
import {
    WaterHeaterInfoCardConfig,
    waterHeaterInfoCardConfigStruct,
    WATER_HEATER_COMMANDS,
} from "./water-heater-info-card-config";

const WATER_HEATER_FIELDS = ["commands", "turn_on", "turn_off"];

const computeSchema = memoizeOne((localize: LocalizeFunc, icon?: string): HaFormSchema[] => [
    { name: "entity", selector: { entity: { domain: WATER_HEATER_INFO_DOMAINS } } },
    { name: "sensor_water_40", selector: { entity: { domain: WATER_HEATER_SENSOR_DOMAIN } } },
    { name: "sensor_power_save", selector: { entity: { domain: WATER_HEATER_SENSOR_DOMAIN } } },
    { name: "name", selector: { text: {} } },
    {
        type: "grid",
        name: "",
        schema: [
            { name: "icon", selector: { icon: { placeholder: icon } } },
            { name: "icon_color", selector: { "oso-color": {} } },
        ],
    },
    { name: "show_v40_min_control", selector: { boolean: {} } },
    {
        type: "multi_select",
        name: "commands",
        options: WATER_HEATER_COMMANDS.map((command) => [
            command,
            localize(`ui.card.vacuum.actions.${command}`),
        ]) as [string, string][],
    },
]);

@customElement(WATER_HEATER_INFO_CARD_EDITOR_NAME)
export class WaterHeaterInfoCardEditor extends LitElement implements LovelaceCardEditor {
    @property({ attribute: false }) public hass?: HomeAssistant;

    @state() private _config?: WaterHeaterInfoCardConfig;

    connectedCallback() {
        super.connectedCallback();
        void loadHaComponents();
    }

    public setConfig(config: WaterHeaterInfoCardConfig): void {
        assert(config, waterHeaterInfoCardConfigStruct);
        this._config = config;
    }

    private _computeLabelCallback = (schema: HaFormSchema) => {
        const customLocalize = setupCustomlocalize(this.hass!);

        if (GENERIC_FIELDS.includes(schema.name)) {
            return customLocalize(`editor.card.generic.${schema.name}`);
        }
        if (WATER_HEATER_FIELDS.includes(schema.name)) {
            return customLocalize(`editor.card.water_heater.${schema.name}`);
        }

        return this.hass!.localize(`ui.panel.lovelace.editor.card.generic.${schema.name}`);
    };

    protected render(): TemplateResult {
        if (!this.hass || !this._config) {
            return html``;
        }

        const entityState = this._config.entity ? this.hass.states[this._config.entity] : undefined;
        const entityIcon = entityState ? stateIcon(entityState) : undefined;
        const icon = this._config.icon || entityIcon;
        const schema = computeSchema(this.hass!.localize, icon);

        return html`
            <ha-form
                .hass=${this.hass}
                .data=${this._config}
                .schema=${schema}
                .computeLabel=${this._computeLabelCallback}
                @value-changed=${this._valueChanged}
            ></ha-form>
        `;
    }

    private _valueChanged(ev: CustomEvent): void {
        fireEvent(this, "config-changed", { config: ev.detail.value });
    }

    static get styles(): CSSResultGroup {
        return configElementStyle;
    }
}
