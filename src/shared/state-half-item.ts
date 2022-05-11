import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { property, customElement } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import "./shape-icon";

@customElement("oso-energy-state-half-item")
export class StateItem extends LitElement {
    protected render(): TemplateResult {
        return html`
            <div
                class=${classMap({
                    "container-half": true,
                    vertical: true,
                })}
            >
                <div class="icon">
                    <slot name="icon"></slot>
                    <slot name="badge"></slot>
                </div>
                <div class="info">
                    <slot name="info"></slot>
                </div>
            </div>
        `;
    }

    static get styles(): CSSResultGroup {
        return css`
            .container-half {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
            }
            .container-half > *:not(:last-child) {
                margin-right: var(--spacing);
            }
            :host([rtl]) .container-half > *:not(:last-child) {
                margin-right: initial;
                margin-left: var(--spacing);
            }
            .icon {
                position: relative;
            }
            .icon ::slotted(*[slot="badge"]) {
                position: absolute;
                top: -3px;
                right: -3px;
            }
            :host([rtl]) .icon ::slotted(*[slot="badge"]) {
                right: initial;
                left: -3px;
            }
            .info {
                min-width: 0;
                width: 100%;
                display: flex;
                flex-direction: column;
            }
            .container-half.vertical {
                flex-direction: column;
            }
            .container-half.vertical > *:not(:last-child) {
                margin-bottom: var(--spacing);
                margin-right: 0;
                margin-left: 0;
            }
            :host([rtl]) .container-half.vertical > *:not(:last-child) {
                margin-right: initial;
                margin-left: initial;
            }
            .container-half.vertical .info {
                text-align: center;
            }
            .primary {
                font-size: 18px;
            }
        `;
    }
}
