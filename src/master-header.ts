import { masterHeaderStyle } from './styles/default-styles.js';

export class MasterKeyHeader extends HTMLElement {
  #placeholder:string = 'Type a command or search...';

  get placeholder() {
    return this.#placeholder;
  }

  set placeholder(value:string) {
    this.render();
    this.#placeholder = value;
  }

  constructor(
    placeholder:string = 'Type a command or search...',
  ) {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.adoptedStyleSheets = [masterHeaderStyle];
    this.#placeholder = placeholder;
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
        <input name="search" type="text" placeholder="Search..." />
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
