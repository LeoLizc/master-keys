import { createCSS } from '../utils.js';

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

input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  border: 1px solid green;
  // -webkit-text-fill-color: green;
  -webkit-box-shadow: 0 0 0px 1000px #000 inset;
  transition: background-color 5000s ease-in-out 0s;
}

input:-webkit-autofill {
  background-color: #FAFFBD !important;
color: #2a2a2a !important;
}

ul {
  list-style: none;
}
`);
// TODO: Arreglar estilos en autocompletado

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
    min-height: 285px;
    margin: auto;
    padding: 1em;
    padding-bottom: 0;
    top: 20%;
    max-height: 70%;
    
    overflow: auto;
    background-color: #fff;
    border-radius: 1cqw;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);

    color: #333;

    display: flex;
    flex-direction: column;
    gap: .5rem;
    // justify-content: space-between;
  }

  .modal *:first-child,.modal *:last-child {
    flex-shrink: 0;
  }
`, { extends: resetCss });

export const masterHeaderStyle = createCSS(
  `nav.breadcrumbs {
  margin-bottom: .6rem;
  
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-items: center;
  gap: 0.4rem;
  
}

nav .breadcrumb {
  display: inline-block;
  width: fit-content;
  padding: .1rem 0.5rem;

  font-size: 0.8rem;
  border-radius: 0.3rem;
  background-color: rgba(177, 176, 176, 0.3);
  
  color: rgb(99 103 110);
  border: none;
  cursor: pointer;
}

// nav .breadcrumb:hover {
//   background-color: rgba(177, 176, 176, 0.39);
//   color: rgb(80, 84, 90);

//   // transition: all 0.3s;
// }

header .search {
  margin: 0;
  margin-bottom: 1rem;
}

.search input {
  width: 100%;
  padding: 0.5rem;

  border-radius: 0.5rem;
  border: none;
  background: transparent;

  font-size: 1.3rem;
  font-weight: 350;
}

.search input:focus {
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.4);

  color: rgb(80, 84, 90);
}


header {
  border-bottom: 1px solid rgba(177, 176, 176, 0.222)
}`,
  { extends: resetCss },
);

export const masterActionsStyle = createCSS(`
:host {
  overflow: auto;
}

:host li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  padding-block: .8rem;
  /* border-bottom: 1px solid rgb(23, 23, 23); */
  color: #6b6f76;
  font-size: .95rem;
  user-select: none;
  cursor: pointer;
}

:host li:hover {
  background-color: rgb(236 238 244);
}

.action-name {
  text-align: start;
  flex-grow: 2;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

div.action-icon {
  padding-inline-end: 1rem;
  flex-shrink: 0;
}

img.action-icon {
  max-width: 1.3rem;
  max-height: 1.3rem;
}

kbd {
  background-color: #f7f7f7;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-shadow: 0 1px 0 #ccc, 0 2px 0 #fff inset;
  color: #333;
  display: inline-block;
  font-size: 11px;
  line-height: 1.4;
  margin: 0 .1em;
  padding: 2px 4px;
  white-space: nowrap;
}

.action-hotkey {
  margin-inline-start: 1rem;
  flex-shrink: 0;
}
`, { extends: resetCss });
