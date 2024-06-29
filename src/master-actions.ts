/* eslint-disable max-len */
import { IMasterAction } from './interfaces/imaster-action';
import { Renderable } from './util.d';

export class MasterActions extends HTMLElement implements Renderable {
  #rendered = false;
  actions: IMasterAction[] = [
    {
      id: '1',
      title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro deserunt quo in sed! Nobis a omnis ratione fugiat temporibus itaque perspiciatis placeat, culpa, et, animi tempora nihil delectus quisquam laudantium. Rerum aliquam facilis molestias quaerat reiciendis, ea perferendis harum.',
      hotkey: 'Cmd + H',
      section: 'Actions',
      icon: '<img src="/dev/icons/house.svg" alt="icon" class="action-icon">',
    },
    {
      id: '2',
      title: 'Open Projects',
      hotkey: 'Cmd + P',
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
      hotkey: 'Cmd + H',
      section: 'Actions2',
      icon: '<img src="/dev/icons/house.svg" alt="icon" class="action-icon">',
    },
    {
      id: '5',
      title: 'Open Projects',
      hotkey: 'Cmd + P',
      section: 'Actions2',
      icon: '<img src="/dev/icons/grid.svg" alt="icon" class="action-icon">',
    },
    {
      id: '6',
      title: 'Open Projects',
      hotkey: 'Cmd + P',
      section: 'Actions2',
      // icon: '<img src="/dev/icons/grid.svg" alt="icon" class="action-icon">',
    },
    {
      id: '7',
      title: 'Open Projects',
      hotkey: 'Cmd + P',
      section: 'Actions2',
      icon: '<img src="/dev/icons/grid.svg" alt="icon" class="action-icon">',
    },
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
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
        .forEach((action) => ul.appendChild(MasterActions.#constructAction(action)));
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
      actions.forEach((action) => ul.appendChild(MasterActions.#constructAction(action)));
      actionContainer.appendChild(ul);
      this.shadowRoot!.appendChild(actionContainer);
    }
    /*
    this.shadowRoot!.innerHTML = `
    <link rel="stylesheet" href="https://leolizc.github.io/master-keys/masterActions.css">
    <div class="action-container">
      <h4 class="action-section-header">Actions</h4>
      <ul>
        <li>
          <div class="action-icon">
            <img src="/dev/icons/house.svg" alt="icon" class="action-icon">
          </div>
          <div class="action-name">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro deserunt quo in sed! Nobis a omnis ratione fugiat temporibus itaque perspiciatis placeat, culpa, et, animi tempora nihil delectus quisquam laudantium. Rerum aliquam facilis molestias quaerat reiciendis, ea perferendis harum.
          </div>
          <div class="action-hotkey">
            <kbd>Cmd</kbd>
            <kbd>H</kbd>
          </div>
        </li>
        <li>
          <div class="action-icon">
            <img src="/dev/icons/grid.svg" alt="icon" class="action-icon">
          </div>
          <div class="action-name">
            Open Projects
          </div>
          <div class="action-hotkey">
            <kbd>Cmd</kbd>
            <kbd>P</kbd>
          </div>
        </li>
        <li>
          <div class="action-icon">
            <img src="/dev/icons/bulb.svg" alt="icon" class="action-icon">
          </div>
          <div class="action-name">
            Change Themes...
          </div>
        </li>
      </ul>
    </div>
    <div class="action-container">
      <h4 class="action-section-header">Actions</h4>
      <ul>
        <li>
          <div class="action-icon">
            <img src="/dev/icons/house.svg" alt="icon" class="action-icon">
          </div>
          <div class="action-name">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro deserunt quo in sed! Nobis a omnis ratione fugiat temporibus itaque perspiciatis placeat, culpa, et, animi tempora nihil delectus quisquam laudantium. Rerum aliquam facilis molestias quaerat reiciendis, ea perferendis harum.
          </div>
          <div class="action-hotkey">
            <kbd>Cmd</kbd>
            <kbd>H</kbd>
          </div>
        </li>
        <li>
          <div class="action-icon">
            <img src="/dev/icons/grid.svg" alt="icon" class="action-icon">
          </div>
          <div class="action-name">
            Open Projects
          </div>
          <div class="action-hotkey">
            <kbd>Cmd</kbd>
            <kbd>P</kbd>
          </div>
        </li>
        <li>
          <div class="action-icon">
            <img src="/dev/icons/grid.svg" alt="icon" class="action-icon">
          </div>
          <div class="action-name">
            Open Projects
          </div>
          <div class="action-hotkey">
            <kbd>Cmd</kbd>
            <kbd>P</kbd>
          </div>
        </li>
        <li>
          <div class="action-icon">
            <img src="/dev/icons/grid.svg" alt="icon" class="action-icon">
          </div>
          <div class="action-name">
            Open Projects
          </div>
          <div class="action-hotkey">
            <kbd>Cmd</kbd>
            <kbd>P</kbd>
          </div>
        </li>
      </ul>
    </div>
    `;// */
  }

  static #constructAction(action: IMasterAction): HTMLElement {
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
    return li;
  }
}

window.customElements.define('mks-actions', MasterActions);
declare global {
  interface HTMLElementTagNameMap {
    'mks-actions': MasterActions;
  }
}
