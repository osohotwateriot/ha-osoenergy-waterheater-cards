import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { property, customElement } from "lit/decorators.js";

@customElement("oso-energy-button")
export class Button extends LitElement {
    @property() public icon: string = "";
    @property() public title: string = "";
    @property({ type: Boolean }) public disabled: boolean = false;

    protected render(): TemplateResult {
        return html`
            <button type="button" class="button" .title=${this.title} .disabled=${this.disabled}>
                <ha-icon .icon=${this.icon} />
            </button>
        `;
    }

    static get styles(): CSSResultGroup {
        return css`
            :host {
                --icon-color: var(--primary-text-color);
                --icon-color-disabled: var(--disabled-text-color);
                --bg-color: rgba(var(--rgb-primary-text-color), 0.05);
                --bg-color-disabled: rgba(var(--rgb-primary-text-color), 0.05);
                width: 42px;
                height: 42px;
                flex: none;
            }
            .button {
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                border-radius: var(--control-border-radius);
                border: none;
                background-color: var(--bg-color);
                transition: background-color 280ms ease-in-out;
            }
            .button:hover {
                background-color: rgb(76, 175, 80);
            }
            .button:disabled {
                cursor: not-allowed;
                background-color: var(--bg-color-disabled);
            }
            .button ha-icon {
                --mdc-icon-size: 20px;
                color: var(--icon-color);
                pointer-events: none;
            }
            .button:disabled ha-icon {
                color: var(--icon-color-disabled);
            }
        `;
    }
}
