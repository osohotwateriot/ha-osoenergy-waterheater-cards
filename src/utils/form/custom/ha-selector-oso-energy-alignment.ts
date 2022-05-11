import { fireEvent, HomeAssistant } from "custom-card-helpers";
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../../../shared/editor/alignment-picker";

export type OSOAlignementSelector = {
    "oso-alignment": {};
};

@customElement("ha-selector-oso-alignment")
export class HaOSOAlignmentSelector extends LitElement {
    @property() public hass!: HomeAssistant;

    @property() public selector!: OSOAlignementSelector;

    @property() public value?: string;

    @property() public label?: string;

    protected render() {
        return html`
            <oso-energy-alignment-picker
                .hass=${this.hass}
                .label=${this.label}
                .value=${this.value}
                @value-changed=${this._valueChanged}
            ></oso-energy-alignment-picker>
        `;
    }

    private _valueChanged(ev: CustomEvent) {
        fireEvent(this, "value-changed", { value: ev.detail.value || undefined });
    }
}
