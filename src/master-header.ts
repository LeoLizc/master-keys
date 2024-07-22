import { observe } from './utils.js';
import { Renderable } from './util.js';
import { MasterKeys } from './master-keys.js';
import { masterHeaderStyle } from './styles/default-styles.js';

export class MasterKeyHeader extends HTMLElement implements Renderable {
  #rendered = false;
  #masterParent: MasterKeys;
  breadcrumbs: string[] = ['Home'];
  get #inputValue() {
    return this.#masterParent.search;
  }

  @observe()
  accessor placeholder = 'Type a command or search...';

  @observe()
  accessor 'hide-breadcrumbs' = false;

  constructor(
    masterParent: MasterKeys,
    placeholder:string = 'Type a command or search...',
  ) {
    super();
    this.#masterParent = masterParent;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.adoptedStyleSheets = [masterHeaderStyle];
    this.placeholder = placeholder;
  }

  connectedCallback() {
    this.#rendered = true;
    this.render();
  }

  render() {
    if (!this.#rendered) return;

    // TODO: make the render method more efficient by node manipulation

    this.shadowRoot!.innerHTML = '';

    const header = document.createElement('header');
    this.shadowRoot!.appendChild(header);

    if (!this['hide-breadcrumbs']) {
      const breadcrumbs = document.createElement('nav');
      breadcrumbs.classList.add('breadcrumbs');
      header.appendChild(breadcrumbs);

      // - Add default home breadcrumb
      const home = document.createElement('button');
      home.classList.add('breadcrumb');
      home.textContent = 'Home';
      home.addEventListener('click', () => this.selectParent());
      breadcrumbs.appendChild(home);

      this.breadcrumbs.forEach((breadcrumb) => {
        const button = document.createElement('button');
        button.classList.add('breadcrumb');
        button.textContent = breadcrumb;
        button.addEventListener('click', () => this.selectParent(breadcrumb));

        breadcrumbs.appendChild(button);
      });
    }

    const search = document.createElement('div');
    search.classList.add('search');
    header.appendChild(search);

    const input = document.createElement('input');
    input.name = 'search';
    input.type = 'text';
    input.placeholder = this.placeholder;
    input.value = this.#inputValue;
    input.addEventListener('input', (e: Event) => {
      // console.log('input', (e.target as HTMLInputElement).value);
      this.#masterParent.search = (e.target as HTMLInputElement).value;
    });

    search.appendChild(input);

    /*
    <header>
      ${
  this['hide-breadcrumbs']
    ? ''
    : `<nav class="breadcrumbs">
${
  this.breadcrumbs.map((breadcrumb) => `
    <button class="breadcrumb">
      ${breadcrumb}
    </button>
  `).join('')
}
      </nav>`}
      <div class="search">
        <input name="search" type="text" placeholder="${this.placeholder}" />
      </div>
    </header>
    `;// */
  }

  private selectParent(parent?: string) {
    this.#masterParent.parent = parent;
  }

  focusInput() {
    const input = this.shadowRoot!.querySelector('input');
    input?.focus();
  }
}

window.customElements.define('mks-header', MasterKeyHeader);
declare global {
  interface HTMLElementTagNameMap {
    'mks-header': MasterKeyHeader;
  }
}
