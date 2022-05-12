import { HomeAssistant } from "custom-card-helpers";
import { HassEntity } from "home-assistant-js-websocket";
import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { isAvailable } from "../../../ha/data/entity";
import "../../../shared/slider";
import { getV40MaxLevel, getV40Min, getV40MinLevel } from "../utils";
import { debounce } from "custom-card-helpers";
import { DEBOUNCE_TIMEOUT } from "../../../const";
import setupCustomlocalize from "../../../localize";

@customElement("oso-energy-v40-min")
export class V40MinItem extends LitElement {
    @property({ attribute: false }) public hass!: HomeAssistant;

    @property({ attribute: false }) public entity!: HassEntity;

    _debounceSetV40Min = debounce((value: number) => {
        this.hass.callService("osoenergy", "set_v40_min", {
            entity_id: this.entity.entity_id,
            v40_min: value,
        });
    }, DEBOUNCE_TIMEOUT);

    onChange(e: CustomEvent<{ value: number; label?: string }>): void {
        const value = e.detail.value;
        this._debounceSetV40Min(value);
    }

    onCurrentChange(e: CustomEvent<{ value?: number; label?: string }>): void {
        const value = e.detail.value;
        const label = e.detail.label;
        this.dispatchEvent(
            new CustomEvent("current-change", {
                detail: {
                    value,
                },
            })
        );
    }

    protected render(): TemplateResult {
        const customLocalize = setupCustomlocalize(this.hass!);

        const value = getV40Min(this.entity);
        const v40_min = getV40MinLevel(this.entity);
        const v40_max = getV40MaxLevel(this.entity);

        const v40MinText = customLocalize("editor.card.water_heater.v40_min_text");
        const litersText = customLocalize("editor.card.water_heater.liters");

        return html` <div class="profile-label">${v40MinText}</div>
            <oso-energy-slider
                .value=${value}
                .disabled=${!isAvailable(this.entity)}
                .showActive=${true}
                .showIndicator=${true}
                .showValue=${true}
                .label=${litersText}
                .min=${v40_min}
                .max=${v40_max}
                @change=${this.onChange}
                @current-change=${this.onCurrentChange}
            />`;
    }

    static get styles(): CSSResultGroup {
        return css`
            oso-energy-slider {
                --main-color: rgb(var(--rgb-state-fan));
                --bg-color: rgba(var(--rgb-state-fan), 0.2);
            }
            .profile-label {
                margin-bottom: 5px;
                font-weight: bold;
            }
        `;
    }
}
