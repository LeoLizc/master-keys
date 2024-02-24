import { masterHeaderStyle } from './styles/default-styles.js';
import { observe } from './utils.js';
import { Renderable } from './util.js';

export class MasterKeyHeader extends HTMLElement implements Renderable {
  #rendered = false;

  @observe
  accessor placeholder = 'Type a command or search...';

  @observe
  accessor 'hide-breadcrumbs' = false;

  constructor(
    placeholder:string = 'Type a command or search...',
  ) {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.adoptedStyleSheets = [masterHeaderStyle];
    this.placeholder = placeholder;
  }

  connectedCallback() {
    this.#rendered = true;
    this.render();
  }

  render() {
    if (!this.#rendered) return;

    this.shadowRoot!.innerHTML = `
    <header>
      ${
  this['hide-breadcrumbs']
    ? ''
    : `<nav class="breadcrumbs">
        <ul>
          <li class="breadcrumb">
            <a href="#">Home</a>
          </li>
          <li class="breadcrumb">
            <a href="#">About</a>
          </li>
          <li class="breadcrumb">
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>`}
      <div class="search">
        <input name="search" type="text" placeholder="${this.placeholder}" />
      </div>
    </header>
    `;
  }
}

window.customElements.define('mks-header', MasterKeyHeader);
declare global {
  interface HTMLElementTagNameMap {
    'mks-header': MasterKeyHeader;
  }
}
