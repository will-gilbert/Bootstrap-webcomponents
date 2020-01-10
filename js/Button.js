
export default class Button extends HTMLElement {

  static get types() {
    return ['default', 'primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark', 'link']
  }

  static get observedAttributes() {
    return [...Button.types];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
      this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
            ${this.css()}
            ${this.html()} 
        `;
  }

  html() {

    let type = 'default';

    Button.types.forEach(it => {
      if (this.hasAttribute(it)) {
        type = it;
      }
    })

    return `<button class='${type}'><slot></slot></button>`
  }

  css() {
    return `<style>
      button {
        margin-top: 5px;
        margin-bottom: 5px;
        display: inline-block;
        padding: 6px 12px;
        font-family:inherit;
        font-size: 14px;
        font-weight: normal;
        line-height: 1.428571429;
        text-align: center;
        vetical-align: middle;
        white-space: nowrap;
        cursor: pointer;
        border: 1px solid transparent;
        border-radius: 4px;
        background-image: linear-gradient(to bottom, #fff 0, #e0e0e0 100%);
        background-repeat: repeat-x;
      }
      
      .default {
        color: #444;
        background-image: linear-gradient(to bottom, #dbdbdd 0,#cacacd 100%);
        border-color: #cacacd
      }
      .primary {
        color: #fff;
        background-image: linear-gradient(to bottom,#0069d9 0,#0056b2 100%);
        border-color: #0062cc
      }
      .secondary {
        color: #444;
        background-image: linear-gradient(to bottom, #dbdbdd 0,#cacacd 100%);
        border-color: #cacacd
      }
      .success {
        color: #fff;
        background-image: linear-gradient(to bottom,#5cb85c 0,#419641 100%);
        border-color: #3e8f3e;
      }
      .info {
        color: #fff;
        background-image: linear-gradient(to bottom,#5bc0de 0,#2aabd2 100%);
        border-color: #28a4c9
      }
      .warning {
        color: #fff;
        background-image: linear-gradient(to bottom,#f0ad4e 0,#eb9316 100%);
        border-color: #e38d13
      }
      .danger {
        color: #fff;
        background-image: linear-gradient(to bottom,#d9534f 0,#c12e2a 100%);
        border-color: #b92c28
     }
      .light {
        color: #212529;
        background-image: linear-gradient(to bottom,#f8f9fa 0,#d8dde3 100%);
        border-color: #f8f9fa;     
      }
      .dark {
        color: #fff;
        background-image: linear-gradient(to bottom,#d8dde3  0,#343a40 100%);
        border-color: #343a40;     
      }
      .link {
        font-weight: 400;
        color: #007bff;
        background-image: none;
        background-color: transparent;
        border-color: none;     
     }

    </style>`
  }

}

customElements.define('bswc-button', Button);
