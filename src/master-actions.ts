/* eslint-disable max-len */
import { IMasterAction } from './interfaces/imaster-action';
import { MasterKeys } from './master-keys';
import { masterActionsStyle } from './styles/default-styles.js';
import { Renderable } from './util.d';
import {
  customElement, listenHotKey, observe, unlistenHotKey,
} from './utils.js';

@customElement('mks-actions')
export class MasterActions extends HTMLElement implements Renderable {
  #rendered = false;
  #masterParent: MasterKeys;
  #keyEvents: { key:string, event: EventListener }[] = [];
  actions: IMasterAction[] = [];
  lastSelected = -1;
  myScroll = 0;

  @observe()
  accessor hotkeysjoinedview = null;

  constructor(parent: MasterKeys) {
    super();
    this.attachShadow({ mode: 'open' });
    this.#masterParent = parent;
    this.shadowRoot!.adoptedStyleSheets = [masterActionsStyle];

    this.addEventListener('scroll', (ev) => {
      const scroll = (ev.target as HTMLElement)?.scrollTop;

      this.myScroll = scroll;
    });
  }

  connectedCallback() {
    this.#rendered = true;
    this.render();
  }

  render() {
    if (!this.#rendered) return;

    const sections = this.actions.reduce<Map<string | undefined, IMasterAction[]>>(
      (entryMap, e) => entryMap.set(e.section, [...(entryMap.get(e.section) || []), e]),
      new Map(),
    );

    this.shadowRoot!.innerHTML = '';

    // - RENDER SECTIONS
    let actionContainer: HTMLDivElement;
    let ul: HTMLUListElement;
    let counter = 0;

    // -- Render undefined section first
    if (sections.has(undefined)) {
      actionContainer = document.createElement('div');
      actionContainer.classList.add('action-container');
      ul = document.createElement('ul');
      sections.get(undefined)!
        .forEach((action) => ul.appendChild(
          this.#constructAction(action, this.#masterParent.selectedAction === counter++),
        ));
      actionContainer.appendChild(ul);
      this.shadowRoot!.appendChild(actionContainer);
    }
    // -- Render other sections
    for (const [section, actions] of sections) {
      // eslint-disable-next-line no-continue
      if (section === undefined) continue;

      actionContainer = document.createElement('div');
      actionContainer.classList.add('action-container');
      actionContainer.innerHTML = `
        <h4 class="action-section-header">${section}</h4>
      `;

      ul = document.createElement('ul');
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      actions.forEach((action) => ul.appendChild(
        this.#constructAction(action, this.#masterParent.selectedAction === counter++),
      ));
      actionContainer.appendChild(ul);
      this.shadowRoot!.appendChild(actionContainer);
    }
  }

  #constructAction(action: IMasterAction, selected = false): HTMLElement {
    // TODO: FIX HOT KEYS

    const li = document.createElement('li');
    // hotkeysjoinedview

    let hotkeys = '';
    if (action.hotkey) {
      const hotkeyList = action.hotkey.split(',').map((key) => key.trim());
      hotkeys = hotkeyList.map((keys) => {
        let result = '<kbd class="hotkey">';

        if (this.hotkeysjoinedview != null) {
          result += `<kbd class="hotkey">${keys}</kbd>`;
        } else {
          keys.split('+').map((key) => key.trim()).forEach((key) => {
            result += `<kbd class="hotkey">${key}</kbd>`;
          });
        }

        result += '</kbd>';
        return result;
      }).join('\n');
    }

    li.innerHTML = `
      <div class="action-icon">
        ${action.icon ?? ''}
      </div>
      <div class="action-name">
        ${action.title}
      </div>
      <div class="action-hotkey">
        ${hotkeys}
      </div>
    `;

    if (selected) {
      li.classList.add('selected');
    }

    const handler = (e: Event) => {
      e.preventDefault();
      this.#masterParent.selectAction(action);
    };

    li.addEventListener('click', handler);
    if (action.hotkey) {
      listenHotKey(action.hotkey, handler, this.#masterParent);
    }

    li.addEventListener('mouseover', () => {
      if (selected) return;

      const sel = this.actions.indexOf(action) || 0;

      if (this.lastSelected === sel) return;

      this.#masterParent.selectedAction = sel;
      this.lastSelected = this.#masterParent.selectedAction;
    });

    return li;
  }

  async disconnectedCallback() {
    // Remove all event listeners
    this.actions.forEach((action) => {
      if (action.hotkey && action.handler) {
        unlistenHotKey(action.hotkey, (e: Event) => {
          e.preventDefault();
          this.#masterParent.selectAction(action);
        }, this.#masterParent);
      }
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mks-actions': MasterActions;
  }
}
