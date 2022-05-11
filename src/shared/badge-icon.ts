import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { property, customElement } from "lit/decorators.js";

@customElement("oso-energy-badge-icon")
export class BadgeIcon extends LitElement {
    @property() public icon: string = "";

    protected render(): TemplateResult {
        return html`
            <div class="badge">
                <ha-icon .icon=${this.icon} />
            </div>
        `;
    }

    static get styles(): CSSResultGroup {
        return css`
            :host {
                --main-color: var(--state-unknown-color);
                --icon-color: var(--text-primary-color);
            }
            .badge {
                display: flex;
                align-items: center;
                justify-content: center;
                line-height: 10px;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background-color: var(--main-color);
                transition: background-color 280ms ease-in-out;
            }
            .badge ha-icon {
                --mdc-icon-size: 12px;
                color: var(--icon-color);
            }
        `;
    }
}
