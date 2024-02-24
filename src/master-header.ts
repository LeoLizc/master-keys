import { masterHeaderStyle } from './styles/default-styles.js';
import { Renderable, observe } from './utils.js';

export class MasterKeyHeader extends HTMLElement implements Renderable {
  #a_placeholder:string;

  @observe
  accessor placeholder = 'Type a command or search...';

  constructor(
    placeholder:string = 'Type a command or search...',
  ) {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.adoptedStyleSheets = [masterHeaderStyle];
    this.#a_placeholder = placeholder;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot!.innerHTML = `
    <header>
      <nav class="breadcrumbs">
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
      </nav>
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
