import { Renderable } from './util.d';

export class MasterActions extends HTMLElement implements Renderable {
  #rendered = false;

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

    this.shadowRoot!.innerHTML = `
    <link rel="stylesheet" href="/dev/styles/masterActions.css">
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
    `;
  }
}

window.customElements.define('mks-actions', MasterActions);
declare global {
  interface HTMLElementTagNameMap {
    'mks-actions': MasterActions;
  }
}
