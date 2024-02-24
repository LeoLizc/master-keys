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

export function observe<T extends Renderable, A>(
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
      this.render();
    },
  };
}
