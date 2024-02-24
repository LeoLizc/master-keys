import { Renderable } from './utils';
import { masterActionsStyle } from './styles/default-styles.js';

export class MasterActions extends HTMLElement implements Renderable {
  #rendered = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.adoptedStyleSheets = [masterActionsStyle];
  }

  connectedCallback() {
    this.#rendered = true;
    this.render();
  }

  render() {
    if (!this.#rendered) return;

    this.shadowRoot!.innerHTML = `
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
    `;
  }
}

window.customElements.define('mks-actions', MasterActions);
declare global {
  interface HTMLElementTagNameMap {
    'mks-actions': MasterActions;
  }
}
