/* eslint-disable no-plusplus */
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
