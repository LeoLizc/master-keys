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
  private accessor rawData: IMasterAction[] = [
    {
      id: '1',
      title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro deserunt quo in sed! Nobis a omnis ratione fugiat temporibus itaque perspiciatis placeat, culpa, et, animi tempora nihil delectus quisquam laudantium. Rerum aliquam facilis molestias quaerat reiciendis, ea perferendis harum.',
      hotkey: 'ctrl + H',
      section: 'Actions',
      icon: '<img src="/dev/icons/house.svg" alt="icon" class="action-icon">',
    },
    {
      id: '2',
      title: 'Open Projects',
      hotkey: 'ctrl + P',
      section: 'Actions',
      icon: '<img src="/dev/icons/grid.svg" alt="icon" class="action-icon">',
    },
    {
      id: '3',
      title: 'Change Themes...',
      section: 'Actions',
      icon: '<img src="/dev/icons/bulb.svg" alt="icon" class="action-icon">',
    },
    {
      id: '4',
      title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro deserunt quo in sed! Nobis a omnis ratione fugiat temporibus itaque perspiciatis placeat, culpa, et, animi tempora nihil delectus quisquam laudantium. Rerum aliquam facilis molestias quaerat reiciendis, ea perferendis harum.',
      hotkey: 'ctrl + H',
      section: 'Actions2',
      icon: '<img src="/dev/icons/house.svg" alt="icon" class="action-icon">',
    },
    {
      id: '5',
      title: 'Open Projects',
      hotkey: 'ctrl + P',
      section: 'Actions2',
      icon: '<img src="/dev/icons/grid.svg" alt="icon" class="action-icon">',
    },
    {
      id: '6',
      title: 'Open Projects',
      hotkey: 'ctrl + P',
      section: 'Actions2',
      // icon: '<img src="/dev/icons/grid.svg" alt="icon" class="action-icon">',
    },
    {
      id: '7',
      title: 'Open Projects',
      hotkey: 'ctrl+b',
      section: 'Actions2',
      icon: '<img src="/dev/icons/grid.svg" alt="icon" class="action-icon">',
    },
  ];

  private nestedData: Map<string, INestedMasterAction> = new Map();
  private rootData: INestedMasterAction[] = [
    {
      id: '1',
      title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro deserunt quo in sed! Nobis a omnis ratione fugiat temporibus itaque perspiciatis placeat, culpa, et, animi tempora nihil delectus quisquam laudantium. Rerum aliquam facilis molestias quaerat reiciendis, ea perferendis harum.',
      hotkey: 'ctrl+H',
      section: 'Actions',
      icon: '<img src="/dev/icons/house.svg" alt="icon" class="action-icon">',
    },
    {
      id: '2',
      title: 'Open Projects',
      hotkey: 'ctrl+P',
      section: 'Actions',
      icon: '<img src="/dev/icons/grid.svg" alt="icon" class="action-icon">',
    },
    {
      id: '3',
      title: 'Change Themes...',
      section: 'Actions',
      icon: '<img src="/dev/icons/bulb.svg" alt="icon" class="action-icon">',
    },
    {
      id: '4',
      title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro deserunt quo in sed! Nobis a omnis ratione fugiat temporibus itaque perspiciatis placeat, culpa, et, animi tempora nihil delectus quisquam laudantium. Rerum aliquam facilis molestias quaerat reiciendis, ea perferendis harum.',
      hotkey: 'ctrl+H',
      section: 'Actions2',
      icon: '<img src="/dev/icons/house.svg" alt="icon" class="action-icon">',
    },
    {
      id: '5',
      title: 'Open Projects',
      hotkey: 'ctrl+P',
      section: 'Actions2',
      icon: '<img src="/dev/icons/grid.svg" alt="icon" class="action-icon">',
    },
    {
      id: '6',
      title: 'Open Projects',
      hotkey: 'ctrl+P',
      section: 'Actions2',
      // icon: '<img src="/dev/icons/grid.svg" alt="icon" class="action-icon">',
    },
    {
      id: '7',
      title: 'Open Projects',
      hotkey: 'ctrl+B',
      handler: () => { console.log('Hello'); return { keepOpen: true }; },
      section: 'Actions2',
      icon: '<img src="/dev/icons/grid.svg" alt="icon" class="action-icon">',
    },
  ];

  @observe()
  accessor parent: string | undefined;

  @observe()
  accessor search = '';

  get data() {
    return this.rawData;
  }

  set data(data: IMasterAction[]) {
    const newNestedData: Map<string, INestedMasterAction> = new Map();
    const newRootData: INestedMasterAction[] = [];

    const registerChildren = (
      parent: INestedMasterAction,
      children: (IMasterAction | string)[],
    ) => {
      const newChildren = (children.filter((child) => typeof child !== 'string') as INestedMasterAction[])
        .map((child) => {
          if (!newNestedData.has(child.id)) {
            newNestedData.set(child.id, { ...child, children: [], parent: parent.id });
          }
          return newNestedData.get(child.id)!;
        });

      // eslint-disable-next-line no-param-reassign
      parent.children = parent.children!.concat(newChildren);

      newChildren.forEach((child) => {
        if (child.children != null) {
          registerChildren(child, child.children);
        }
      });

      return parent.children;
    };

    this.nestedData = data.reduce<Map<string, INestedMasterAction>>((acc, item) => {
      if (!acc.has(item.id)) {
        // TODO: Fix Redundant code
        const newItem = {
          ...item, id: item.id ?? crypto.randomUUID(), children: [], parent: undefined,
        };
        acc.set(newItem.id, newItem);
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
        // TODO: arreglar recursividad
        itemClone.children = registerChildren(itemClone, item.children!);
        // .concat(itemClone.children as INestedMasterAction[]);
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

  get breadcrumbs() {
    const breadcrumbs = [];

    if (this.parent != null) {
      let current: string | undefined = this.parent;
      while (current != null) {
        breadcrumbs.push(current);
        const parent = this.nestedData.get(current);
        if (parent == null) break;
        current = parent.parent;
      }
    }

    return breadcrumbs.reverse();
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
    this.header = new MasterKeyHeader(
      this,
    );
    this.mksActions = new MasterActions(this);
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
    let actionMatches = this.parent == null
      ? this.rootData
      : this.nestedData.get(this.parent)!.children ?? [];

    actionMatches = actionMatches.filter((action) => {
      const regex = new RegExp(this.search, 'gi');
      const matcher = action.title.match(regex) || action.keywords?.match(regex);

      return matcher;
    });

    this.mksActions.actions = actionMatches;

    // - UPDATE THE HEADER
    this.header.breadcrumbs = this.breadcrumbs;

    // - Append the children
    this.shadowRoot!.children[0]!.appendChild(this.header);
    this.shadowRoot!.children[0]!.appendChild(this.mksActions);
    this.shadowRoot!.children[0]!.appendChild(this.footer);

    const slot = document.createElement('slot');
    this.shadowRoot!.children[0]!.appendChild(slot);

    this.header.focusInput();
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
