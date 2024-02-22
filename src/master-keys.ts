import { masterKeyStyle } from './styles/default-styles.js';

export class MasterKeys extends HTMLElement {
  placeholder = 'Type a command or search...';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.adoptedStyleSheets = [masterKeyStyle];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <div class="modal">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('master-keys', MasterKeys);
