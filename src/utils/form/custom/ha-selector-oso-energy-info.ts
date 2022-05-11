import { fireEvent, HomeAssistant } from "custom-card-helpers";
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../../../shared/editor/info-picker";
import { Info } from "../../info";

export type OSOInfoSelector = {
    "oso-info": {
        infos?: Info[];
    };
};

@customElement("ha-selector-oso-info")
export class HaOSOInfoSelector extends LitElement {
    @property() public hass!: HomeAssistant;

    @property() public selector!: OSOInfoSelector;

    @property() public value?: string;

    @property() public label?: string;

    protected render() {
        return html`
            <oso-energy-info-picker
                .hass=${this.hass}
                .infos=${this.selector["oso-info"].infos}
                .label=${this.label}
                .value=${this.value}
                @value-changed=${this._valueChanged}
            ></oso-energy-info-picker>
        `;
    }

    private _valueChanged(ev: CustomEvent) {
        fireEvent(this, "value-changed", { value: ev.detail.value || undefined });
    }
}
