import { masterFooterStyle } from './styles/default-styles.js';
import { Renderable } from './util';

export class MasterFooter extends HTMLElement implements Renderable {
  #rendered = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.adoptedStyleSheets = [masterFooterStyle];
  }

  connectedCallback() {
    this.#rendered = true;
    this.render();
  }

  render() {
    if (!this.#rendered) return;

    this.shadowRoot!.innerHTML = `
  <footer>
    <div class="footer-help">
      <kbd>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6v6a3 3 0 0 1 -3 3h-10l4 -4m0 8l-4 -4" /></svg>
      </kbd>
      to select
    </div>
    <div class="footer-help">
      <kbd>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M18 11l-6 -6" /><path d="M6 11l6 -6" /></svg>
      </kbd>
      <kbd>
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-down" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M18 13l-6 6" /><path d="M6 13l6 6" /></svg>
      </kbd>
      to navigate
    </div>
    <div class="footer-help">
      <kbd>
        esc
      </kbd>
      to close
    </div>
    <div class="footer-help">
      <kbd>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6v6a3 3 0 0 1 -3 3h-10l4 -4m0 8l-4 -4" /></svg>
      </kbd>
      move to parent
    </div>
  </footer>
    `;
  }
}

window.customElements.define('master-footer', MasterFooter);
declare global {
  interface HTMLElementTagNameMap {
    'master-footer': MasterFooter;
  }
}
