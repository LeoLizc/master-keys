const masterKeyStyle = new CSSStyleSheet();
masterKeyStyle.replaceSync(`
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
`);

export { masterKeyStyle };
