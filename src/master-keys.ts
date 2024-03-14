import { masterKeyStyle } from './styles/default-styles.js';
import { MasterKeyHeader } from './master-header.js';
import { MasterActions } from './master-actions.js';
import { MasterFooter } from './master-footer.js';
import { type Renderable } from './util.js';
import { observe, listenHotKey } from './utils.js';

export class MasterKeys extends HTMLElement implements Renderable {
  header: MasterKeyHeader;
  mksActions: MasterActions;
  footer: HTMLElement;

  @observe(
    function t(this: MasterKeys) {
      this.onHotKeyChanged();
    },
  )
  accessor openHotKey = 'ctrl+k';

  @observe(
    function t(this: MasterKeys) {
      this.onHotKeyChanged();
    },
  )
  accessor closeHotkey = 'escape';

  static #heareableAttr: Record<string, keyof MasterKeys | 'no-render'> = {
    placeholder: 'header',
    'hide-breadcrumbs': 'header',
  };

  open() {
    this.hidden = false;
    this.header.focusInput();
  }

  close() {
    this.hidden = true;
  }

  static get observedAttributes() {
    const hear = this.#heareableAttr;
    return Object.keys(hear);
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.adoptedStyleSheets = [masterKeyStyle];
    this.header = new MasterKeyHeader();
    this.mksActions = new MasterActions();
    this.footer = new MasterFooter();
  }

  connectedCallback() {
    this.render();
    this.hidden = true;

    this.loadHotKeys();
    this.tabIndex = -1;
  }

  attributeChangedCallback(name:string, oldVal:string, newVal:string) {
    if (oldVal !== newVal) {
      const targetKey = MasterKeys.#heareableAttr[name];
      if (targetKey === 'no-render') return;

      const target = this[targetKey];
      if (target instanceof HTMLElement) {
        (target as any)[name] = newVal;
      } else {
        this.render();
      }
    }
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <div class="modal">
      </div>
    `;
    this.shadowRoot!.children[0]!.appendChild(this.header);
    this.shadowRoot!.children[0]!.appendChild(this.mksActions);
    this.shadowRoot!.children[0]!.appendChild(this.footer);

    const slot = document.createElement('slot');
    this.shadowRoot!.children[0]!.appendChild(slot);
  }

  private loadHotKeys() {
    if (this.openHotKey) {
      listenHotKey(this.openHotKey, (_e) => {
        if (this.hidden) this.open(); else this.close();
      });
    }

    if (this.closeHotkey) {
      listenHotKey(this.closeHotkey, (_e) => {
        if (!this.hidden) this.close();
      }, this);
    }
  }

  onHotKeyChanged() {
    // TODO: remove old hotkeys

    this.loadHotKeys();
  }
}

customElements.define('master-keys', MasterKeys);
declare global {
  interface HTMLElementTagNameMap {
    'master-keys': MasterKeys;
  }
}
