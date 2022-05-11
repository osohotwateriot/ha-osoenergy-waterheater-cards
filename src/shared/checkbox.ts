import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { property, customElement } from "lit/decorators.js";

@customElement("oso-energy-checkbox")
export class Checkbox extends LitElement {
    @property() public label: string = "";
    @property() public value: boolean = false;
    @property() public title: string = "";
    @property({ type: Boolean }) public disabled: boolean = false;

    protected render(): TemplateResult {
        return html`
            <div class="command-options" .title="${this.title}">
                <label for="checkbox">${this.label}</label>
                <input id="checkbox" type="checkbox" .checked="${this.value}" />
            </div>
        `;
    }

    static get styles(): CSSResultGroup {
        return css`
            .command-options {
                width: 100%;
                padding: 10px;
                padding-left: 0px;
            }
        `;
    }
}
