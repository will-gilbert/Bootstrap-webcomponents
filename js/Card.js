
export default class Card extends HTMLElement {

  static get types() {
    return ['default', 'primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark'];
  }
  static get observedAttributes() {
    return [...Card.types];
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

    Card.types.forEach(it => {
      if (this.hasAttribute(it)) {
        type = it;
      }
    })

    return `<div id='container' class='${type}'>
      <slot name='header'></slot>
      <slot name='body'></slot>
      <slot name='footer'></slot>
      <slot id='anonymous'></slot>
    </div>`
  }

  css() {
    return `<style>

      :host {
        position: relative;
        display: flex;
        flex-direction: column;
        word-wrap: break-word;
      }
      
      #container {
        border-width: 1px;
        border-style: solid;
        border-radius: 0.8rem;      
        background-clip: border-box;
      }

      slot#anonymous {
        display: block;
        flex: 1 1 auto;
        padding: 1rem;
        background-color:transparent;
      }

      .primary {
        color: #6063ef;
        background-image: linear-gradient(to bottom,#c6e0f7 0,#9cbad4 100%);
        border-color: #98b3ca;  
      }
      .secondary, .default {
        color: #383d41;
        background-image: linear-gradient(to bottom,#e2e3e5 0,#c1bfd1 100%);
        border-color: #e2e3e5;
      }
      .success {
        color: #3c763d;
        background-image: linear-gradient(to bottom,#d4edda 0,#afdeba 100%);
        border-color: #b2dba1;
      }
      .info {
        color: #31708f;
        background-image: linear-gradient(to bottom,#d9edf7 0,#b9def0 100%);;
        border-color: #94cfea;
      }
      .warning {
        color: #856404;
        background-image: linear-gradient(to bottom,#fff3cd 0,#ffe490 100%);
        border-color: #ffeeba;
      }
      .danger {
        color: #721c24;
        background-image: linear-gradient(to bottom,#f8d7da 0,#f3babf 100%);
        border-color: #f5c6cb;
      }
      .light {
          color: #818182;
          background-image: linear-gradient(to bottom,#fefefe 0,#fdfdfe 100%);
          border-color: #fdfdfe;      
        }
      .dark {
        color: #1b1e21;
        background-image: linear-gradient(to bottom, #d6d8d9 0,#c6c8ca 100%);
        border-color: #c6c8ca;      
      }

    </style>`
  }

}

customElements.define('bswc-card', Card);
