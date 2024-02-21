export class MasterKeys extends HTMLElement {
  placeholder = 'Type a command or search...';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 16px;
          font-family: sans-serif;
        }
        input {
          width: 100%;
          padding: 8px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
        }
      </style>
      <input type="text" placeholder="${this.placeholder}">
    `;
  }
}

customElements.define('master-keys', MasterKeys);
