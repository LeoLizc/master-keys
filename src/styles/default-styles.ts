import { createCSS } from "../utils.js";

export const resetCss = createCSS(`
* {
  min-height: 0;
  min-width: 0;
  font: inherit;

  margin: 0;
  padding: 0;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

img,
video,
svg {
  display: block;
  height: auto;
  max-width: 100%;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  text-wrap: balance;
}

p {
  text-wrap: pretty;
}
`);

export const masterKeyStyle = createCSS(`
  :host {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff6
  }

  .modal {
    position: relative;
    box-sizing: border-box;
    max-width: 640px;
    min-width: 0px;
    height: 285px;
    margin: auto;
    padding: 1em;
    top: 20%;
    
    background-color: #fff;
    border-radius: 1cqw;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);

    color: #333;

  }
`, { extends: resetCss});
