import { observe } from './utils.js';
import { Renderable } from './util.js';

export class MasterKeyHeader extends HTMLElement implements Renderable {
  #rendered = false;

  @observe()
  accessor placeholder = 'Type a command or search...';

  @observe()
  accessor 'hide-breadcrumbs' = false;

  constructor(
    placeholder:string = 'Type a command or search...',
  ) {
    super();
    this.attachShadow({ mode: 'open' });
    this.placeholder = placeholder;
  }

  connectedCallback() {
    this.#rendered = true;
    this.render();
  }

  render() {
    if (!this.#rendered) return;

    this.shadowRoot!.innerHTML = `
    <link rel="stylesheet" href="https://leolizc.github.io/master-keys/masterHeader.css">
    <header>
      ${
  this['hide-breadcrumbs']
    ? ''
    : `<nav class="breadcrumbs">
          <button class="breadcrumb">
            Home
          </button>
          <button class="breadcrumb">
            About
          </button>
          <button class="breadcrumb">
            Contact
          </button>
      </nav>`}
      <div class="search">
        <input name="search" type="text" placeholder="${this.placeholder}" />
      </div>
    </header>
    `;
  }

  focusInput() {
    const input = this.shadowRoot!.querySelector('input');
    input?.focus();
  }
}

window.customElements.define('mks-header', MasterKeyHeader);
declare global {
  interface HTMLElementTagNameMap {
    'mks-header': MasterKeyHeader;
  }
}
