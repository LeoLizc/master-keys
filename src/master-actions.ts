/* eslint-disable max-len */
import { MasterHandler, IMasterAction } from './interfaces/imaster-action';
import { MasterKeys } from './master-keys';
import { Renderable } from './util.d';
import { listenHotKey, unlistenHotKey } from './utils.js';

export class MasterActions extends HTMLElement implements Renderable {
  #rendered = false;
  #masterParent: MasterKeys;
  #keyEvents: { key:string, event: EventListener }[] = [];
  actions: IMasterAction[] = [];

  constructor(parent: MasterKeys) {
    super();
    this.attachShadow({ mode: 'open' });
    this.#masterParent = parent;
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

    this.shadowRoot!.innerHTML = `
    <link rel="stylesheet" href="https://leolizc.github.io/master-keys/masterActions.css">
    `;

    // - RENDER SECTIONS
    let actionContainer: HTMLDivElement;
    let ul: HTMLUListElement;
    // -- Render undefined section first
    if (sections.has(undefined)) {
      actionContainer = document.createElement('div');
      actionContainer.classList.add('action-container');
      ul = document.createElement('ul');
      sections.get(undefined)!
        .forEach((action) => ul.appendChild(this.#constructAction(action)));
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
      actions.forEach((action) => ul.appendChild(this.#constructAction(action)));
      actionContainer.appendChild(ul);
      this.shadowRoot!.appendChild(actionContainer);
    }
  }

  #constructAction(action: IMasterAction): HTMLElement {
    // TODO: FIX HOT KEYS

    const li = document.createElement('li');
    li.innerHTML = `
      <div class="action-icon">
        ${action.icon ?? ''}
      </div>
      <div class="action-name">
        ${action.title}
      </div>
      <div class="action-hotkey">
        ${
  action.hotkey
    ? action.hotkey.split('+').map((key) => `<kbd>${key}</kbd>`).join('')
    : ''
}
      </div>
    `;

    if (action.handler) {
      const handler = this.#listenHandler(action.handler);
      li.addEventListener('click', handler);
      if (action.hotkey) {
        listenHotKey(action.hotkey, handler, this.#masterParent);
        this.#keyEvents.push({ key: action.hotkey, event: handler });
      }
    }

    return li;
  }

  async disconnectedCallback() {
    // Remove all event listeners
    this.#keyEvents.forEach(({ key, event }) => unlistenHotKey(key, event, this.#masterParent));
  }

  #listenHandler(handler: MasterHandler) {
    return (ev: Event) => {
      ev.preventDefault();
      const response = handler();

      if (!response || !response.keepOpen) {
        this.#masterParent.close();
      }
    };
  }
}

window.customElements.define('mks-actions', MasterActions);
declare global {
  interface HTMLElementTagNameMap {
    'mks-actions': MasterActions;
  }
}
