/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
import type { Renderable } from './util';

type CssProps = {
  extends?: CSSStyleSheet;
};
export function createCSS(content: string, props?: CssProps): CSSStyleSheet {
  const style = new CSSStyleSheet();
  style.replaceSync(content);

  if (!props) return style;

  if (props.extends) {
    const rules = props.extends.cssRules;
    for (let i = 0; i < rules.length; i++) {
      style.insertRule(rules[i].cssText);
    }
  }

  return style;
}

export function observe(
  callback?: Function,
) {
  return function obserDecorator<T extends Renderable, A>(
    target : ClassAccessorDecoratorTarget<T, A>,
    context: DecoratorContext,
  ): ClassAccessorDecoratorResult<T, A> | void {
    const { kind } = context;
    if (kind !== 'accessor') {
      return;
    }

    const { set } = target;

    return {
      ...target,
      set(value: A) {
        set.call(this, value);
        if (callback) {
          callback.call(this);
        } else {
          this.render();
        }
      },
    };
  };
}

const specialKeys = new Set([
  'backspace', 'tab', 'enter',
  'pageup', 'pagedown', 'end', 'home', 'arrowleft', 'arrowup', 'arrowright', 'arrowdown',
  'insert', 'delete', 'escape',
]);

const modifierKeys = [
  'ctrl', 'shift', 'alt',
];

const hotKeyRegex = new RegExp(
  `^(${[...specialKeys].join('|')}|[a-zA-Z0-9])$|` // single key
  + `^(${modifierKeys
    .map((key) => `(${key}?)`)
    .join('|')})\\+(${[...specialKeys].join('|')})$|`
  + `^(${modifierKeys
    .map((key) => `(${key}?)`)
    .join('|')})\\+([a-zA-Z0-9])$`,
);

export function validateHotKey(hotKey: string): boolean {
  if (hotKey.length === 1) {
    return true;
  }

  return hotKeyRegex.test(hotKey.toLocaleLowerCase());
}

// eslint-disable-next-line no-spaced-func
const hotKeyRegistry = new Map<string, (event: KeyboardEvent) => void>();
hotKeyRegistry.set('ctrl+k', (_event) => {});

export function listenHotKey(
  hotKey: string,
  callback: (event: KeyboardEvent) => void,
  target: EventTarget = document,
): void {
  if (!validateHotKey(hotKey)) {
    throw new Error(`Invalid hotkey: ${hotKey}`);
  }

  const keys = hotKey.split('+').reduce(
    (acc, key) => {
      if (modifierKeys.includes(key)) {
        acc[key as 'ctrl' | 'shift' | 'alt'] = true;
      } else {
        acc.key = key.toLowerCase();
      }
      return acc;
    },
    {
      key: '', ctrl: false, shift: false, alt: false,
    },
  );
  target.addEventListener('keydown', (event) => {
    if (!(event instanceof KeyboardEvent)) return;
    if (event.repeat) return;

    if (event.key.toLowerCase() === keys.key
      && event.ctrlKey === keys.ctrl
      && event.shiftKey === keys.shift
      && event.altKey === keys.alt) {
      callback(event);
    }
  });
}
