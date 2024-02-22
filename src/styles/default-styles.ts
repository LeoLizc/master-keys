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
    max-width: 640px;
    min-width: 0px;
    height: 285px;
    top: 20%;
    margin: auto;
    
    background-color: #fff;
    border-radius: 1cqw;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  }
`);

export { masterKeyStyle };
