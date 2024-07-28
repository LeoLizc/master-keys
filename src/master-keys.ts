import { MasterKeyHeader } from './master-header.js';
import { MasterActions } from './master-actions.js';
import { MasterFooter } from './master-footer.js';
import { type Renderable } from './util.js';
import {
  observe, listenHotKey, unlistenHotKey, customElement,
} from './utils.js';
import { IMasterAction, INestedMasterAction } from './interfaces/imaster-action.js';
import { masterKeyStyle } from './styles/default-styles.js';

@customElement('master-keys')
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

  get actions() {
    return this.parent == null
      ? this.rootData
      : this.nestedData.get(this.parent)!.children ?? [];
  }

  @observe()
  accessor selectedAction: number = 0;

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
    function t(this: MasterKeys, name: string, oldValue: string) {
      this.onHotKeyChanged(name, oldValue);
    },
  )
  accessor openhotkey = 'ctrl+k';

  @observe(
    function t(this: MasterKeys, name: string, oldValue: string) {
      this.onHotKeyChanged(name, oldValue);
    },
  )
  accessor closehotkey = 'escape';

  @observe(
    function t(this: MasterKeys, name: string, oldValue: string) {
      this.onHotKeyChanged(name, oldValue);
    },
  )
  accessor navigationuphotkey = 'arrowup,shift+tab';

  @observe(
    function t(this: MasterKeys, name: string, oldValue: string) {
      this.onHotKeyChanged(name, oldValue);
    },
  )
  accessor navigationdownhotkey = 'arrowdown,tab';

  @observe(
    function t(this: MasterKeys, name: string, oldValue: string) {
      this.onHotKeyChanged(name, oldValue);
    },
  )
  accessor gobackhotkey = 'backspace';

  @observe(
    function t(this: MasterKeys, name: string, oldValue: string) {
      this.onHotKeyChanged(name, oldValue);
    },
  )
  accessor selecthotkey = 'enter';

  static #heareableAttr: Record<string, keyof MasterKeys | 'no-render'> = {
    placeholder: 'header',
    'hide-breadcrumbs': 'header',
    openhotkey: 'no-render',
    closehotkey: 'no-render',
    navigationuphotkey: 'no-render',
    navigationdownhotkey: 'no-render',
    gobackhotkey: 'no-render',
    selecthotkey: 'no-render',
  };

  open() {
    this.hidden = false;
    this.header.focusInput();
  }

  close() {
    this.hidden = true;
  }

  selectAction(action: IMasterAction) {
    if (action.children && action.children.length > 0) {
      this.parent = action.id;
      this.search = '';
      this.header.focusInput();
    }

    if (action.handler != null) {
      const result = action.handler();
      if (result?.keepOpen !== true) {
        this.close();
      }
    }
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
    this.shadowRoot!.adoptedStyleSheets = [masterKeyStyle];
  }

  attributeChangedCallback(name:string, oldVal:string, newVal:string) {
    if (oldVal !== newVal) {
      const targetKey = MasterKeys.#heareableAttr[name];
      if (targetKey === 'no-render') {
        if (this.hasAttribute(name)) {
          this[name as keyof typeof this] = newVal as any;
        }
        return;
      }

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

    //! THIS NEEDS TO BE REFRACTORED
    this.mksActions.scrollTop = this.mksActions.myScroll;
  }

  private loadHotKeys() {
    if (this.openhotkey) {
      listenHotKey(this.openhotkey, (_e) => {
        _e.preventDefault();
        if (this.hidden) this.open(); else this.close();
      });
    }

    if (this.closehotkey) {
      listenHotKey(this.closehotkey, (_e) => {
        if (!this.hidden) {
          _e.preventDefault();
          this.close();
        }
      }, this);
    }

    if (this.navigationuphotkey) {
      listenHotKey(this.navigationuphotkey, (_e) => {
        _e.preventDefault();

        this.selectedAction = (
          this.actions.length
          + ((this.selectedAction - 1) % this.actions.length)
        ) % this.actions.length;
      }, this);
    }

    if (this.navigationdownhotkey) {
      listenHotKey(this.navigationdownhotkey, (_e) => {
        _e.preventDefault();

        this.selectedAction = (
          this.actions.length
          + ((this.selectedAction + 1) % this.actions.length)
        ) % this.actions.length;
      }, this);
    }

    if (this.gobackhotkey) {
      listenHotKey(this.gobackhotkey, (e) => {
        if (this.search) return;

        if (this.parent) {
          e.preventDefault();
          this.parent = this.nestedData.get(this.parent)?.parent ?? undefined;
        }
      }, this);
    }

    if (this.selecthotkey) {
      listenHotKey(this.selecthotkey, (_e) => {
        const action = this.actions[this.selectedAction];

        if (action) {
          _e.preventDefault();
          this.selectAction(action);
        }
      }, this);
    }
  }

  private unlistenHotKeys() {
    if (this.openhotkey) {
      unlistenHotKey(this.openhotkey);
    }

    if (this.closehotkey) {
      unlistenHotKey(this.closehotkey, undefined, this);
    }

    if (this.navigationuphotkey) {
      unlistenHotKey(this.navigationuphotkey, undefined, this);
    }

    if (this.navigationdownhotkey) {
      unlistenHotKey(this.navigationdownhotkey, undefined, this);
    }

    if (this.gobackhotkey) {
      unlistenHotKey(this.gobackhotkey, undefined, this);
    }

    if (this.selecthotkey) {
      unlistenHotKey(this.selecthotkey, undefined, this);
    }
  }

  connectedCallback() {
    this.render();
    this.hidden = true;

    this.loadHotKeys();
    this.tabIndex = -1;
  }

  disconnectedCallback() {
    this.unlistenHotKeys();
  }

  onHotKeyChanged(name: string, oldVal: string) {
    if (name === 'openhotkey') {
      unlistenHotKey(oldVal);
    } else {
      unlistenHotKey(oldVal, undefined, this);
    }

    this.loadHotKeys();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'master-keys': MasterKeys;
  }
}
