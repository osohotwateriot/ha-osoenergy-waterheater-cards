import { fireEvent, HomeAssistant } from "custom-card-helpers";
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../../../shared/editor/color-picker";

export type OSOColorSelector = {
    "oso-color": {};
};

@customElement("ha-selector-oso-color")
export class HaOSOColorSelector extends LitElement {
    @property() public hass!: HomeAssistant;

    @property() public selector!: OSOColorSelector;

    @property() public value?: string;

    @property() public label?: string;

    protected render() {
        return html`
            <oso-energy-color-picker
                .hass=${this.hass}
                .label=${this.label}
                .value=${this.value}
                @value-changed=${this._valueChanged}
            ></oso-energy-color-picker>
        `;
    }

    private _valueChanged(ev: CustomEvent) {
        fireEvent(this, "value-changed", { value: ev.detail.value || undefined });
    }
}
