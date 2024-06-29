import { MasterKeyHeader } from './master-header.js';
import { MasterActions } from './master-actions.js';
import { MasterFooter } from './master-footer.js';
import { type Renderable } from './util.js';
import { observe, listenHotKey } from './utils.js';
import { IMasterAction, INestedMasterAction } from './interfaces/imaster-action.js';

export class MasterKeys extends HTMLElement implements Renderable {
  header: MasterKeyHeader;
  mksActions: MasterActions;
  footer: HTMLElement;

  @observe()
  private accessor rawData: IMasterAction[] = [];

  private nestedData: Map<string, INestedMasterAction> = new Map();
  private rootData: INestedMasterAction[] = [];
  private parent?: string;

  get data() {
    return this.rawData;
  }

  set data(data: IMasterAction[]) {
    const newNestedData: Map<string, INestedMasterAction> = new Map();
    const newRootData: INestedMasterAction[] = [];

    const registerChildren = (parent: INestedMasterAction, children: IMasterAction[]) => (
      (children.filter((child) => {
        if (typeof child === 'string') {
          return false;
        }
        return true;
      }) as INestedMasterAction[])
        .map((child) => {
          if (!newNestedData.has(child.id)) {
            newNestedData.set(child.id, { ...child, children: [], parent: parent.id });
          }
          return newNestedData.get(child.id)!;
        })
    );

    this.nestedData = data.reduce<Map<string, INestedMasterAction>>((acc, item) => {
      if (!acc.has(item.id)) {
        acc.set(item.id, { ...item, children: [], parent: undefined });
      } else {
        Object.assign(acc.get(item.id)!, {
          ...item,
          children: acc.get(item.id)!.children,
        });
      }
      const itemClone = acc.get(item.id)!;

      if (item.children != null) {
        if (itemClone.children == null) {
          itemClone.children = [];
        }

        itemClone.children = registerChildren(itemClone, itemClone.children!)
          .concat(itemClone.children as INestedMasterAction[]);
      }

      if (item.parent != null) {
        if (!acc.has(item.parent)) {
          acc.set(item.parent, {
            id: item.parent, children: [], title: '', hotkey: '',
          });
        }
        acc.get(item.parent)!.children!.push(itemClone);
      } else {
        newRootData.push(itemClone);
      }
      return acc;
    }, newNestedData);

    this.rootData = newRootData;
    this.rawData = data;
  }

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
      <link rel="stylesheet" href="https://leolizc.github.io/master-keys/masterKey.css">
    `;

    // - UPDATE THE CHILDREN
    this.mksActions.actions = this.parent == null
      ? this.rootData
      : this.nestedData.get(this.parent)!.children ?? [];

    // - Append the children
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
