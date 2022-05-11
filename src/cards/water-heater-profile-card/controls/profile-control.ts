import { HomeAssistant } from "custom-card-helpers";
import { HassEntity } from "home-assistant-js-websocket";
import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { debounce } from "custom-card-helpers";
import { isAvailable } from "../../../ha/data/entity";
import "../../../shared/slider";
import { getProfile, getProfileKeys, getServiceProfile } from "../utils";
import { DEBOUNCE_TIMEOUT } from "../../../const";

@customElement("oso-energy-heater-profile")
export class ProfileItem extends LitElement {
    @property({ attribute: false }) public hass!: HomeAssistant;

    @property({ attribute: false }) public entity!: HassEntity;

    @state() private _profile!: {}[];

    _debounceSetProfile = debounce((newProfile: {}[]) => {
        let profile = getServiceProfile(newProfile);
        this.hass.callService("osoenergy", "set_profile", {
            entity_id: this.entity.entity_id,
            ...profile,
        });
    }, DEBOUNCE_TIMEOUT);

    onChange(): void {
        this._debounceSetProfile(this._profile);
    }

    onCurrentChange(e: CustomEvent<{ value: number; label: string }>): void {
        if (e.detail.value == null) return;

        const value = e.detail.value;
        const hour = this.getHourFromLabel(e.detail.label);
        const key = getProfileKeys(this.entity)[hour];
        this._profile[hour][key] = Math.round(value);
    }

    protected render(): TemplateResult {
        this._profile = getProfile(this.entity);

        return html`
            <div class="profile-label">Temperature Profile</div>
            ${this._profile.map((value, index) => {
                let key = getProfileKeys(this.entity)[index];
                return html` <oso-energy-slider
                    .value=${value[key]}
                    .disabled=${!isAvailable(this.entity)}
                    .showActive=${true}
                    .showIndicator=${true}
                    .showValue=${true}
                    .label=${this.getHourLabel(index)}
                    .min=${10}
                    .max=${75}
                    @change=${this.onChange}
                    @current-change=${this.onCurrentChange}
                />`;
            })}
        `;
    }

    getHourLabel(hour) {
        if (hour < 10) return "0" + hour + ":00";
        return hour + ":00";
    }

    getHourFromLabel(label) {
        var hourStr = label.split(":")[0];
        return parseInt(hourStr);
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
