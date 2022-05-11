import { ActionConfig, fireEvent, HomeAssistant } from "custom-card-helpers";
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../../../shared/editor/action-picker";

export type Action = ActionConfig["action"];
export type OSOActionSelector = {
    "oso-action": {
        actions?: Action[];
    };
};

@customElement("ha-selector-oso-action")
export class HaOSOActionSelector extends LitElement {
    @property() public hass!: HomeAssistant;

    @property() public selector!: OSOActionSelector;

    @property() public value?: string;

    @property() public label?: string;

    protected render() {
        return html`
            <oso-energy-action-picker
                .hass=${this.hass}
                .actions=${this.selector["oso-action"].actions}
                .label=${this.label}
                .value=${this.value}
                @value-changed=${this._valueChanged}
            ></oso-energy-action-picker>
        `;
    }

    private _valueChanged(ev: CustomEvent) {
        fireEvent(this, "value-changed", { value: ev.detail.value || undefined });
    }
}
