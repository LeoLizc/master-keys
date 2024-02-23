import { masterKeyStyle } from './styles/default-styles.js';
import { MasterKeyHeader } from './master-header.js';

export class MasterKeys extends HTMLElement {
  header: MasterKeyHeader;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.adoptedStyleSheets = [masterKeyStyle];
    this.header = new MasterKeyHeader();
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name:string, oldVal:string, newVal:string) {
    if (oldVal !== newVal) {
      this.render();
    }
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <div class="modal">
      </div>
    `;
    this.shadowRoot!.children[0]!.appendChild(this.header);

    const slot = document.createElement('slot');
    this.shadowRoot!.children[0]!.appendChild(slot);
  }
}

customElements.define('master-keys', MasterKeys);
declare global {
  interface HTMLElementTagNameMap {
    'master-keys': MasterKeys;
  }
}
