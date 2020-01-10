

export default class Alert extends HTMLElement {

  static get types() {
    return ['default', 'primary', 'success', 'secondary', 'info', 'warning', 'danger', 'light', 'dark'];
  }

  static get observedAttributes() {
    return [...Alert.types];
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

    this.shadowRoot.querySelector('button').addEventListener('click', event => {
      this.shadowRoot.innerHTML = '';
    }) 
  }


  html() {

    let type = 'default';

    Alert.types.forEach(it => {
      if (this.hasAttribute(it)) {
        type = it;
      }
    })

    // Handle 'close' attribute
    const isClosed = this.hasAttribute('close')
    let classList = '';
    let closeIcon = ''
    if(isClosed) {
      classList = 'close';
      closeIcon = 'X';
    }

    return `<div class='${type}'>
              <button class='${classList}'>${closeIcon}</button>
              <slot></slot>
            </div>`
  }

  css() {
    return `<style>
      div {
        font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
        font-size: 14px;
        line-height: 1.428571429;
        display: block;
        padding: 15px;
        margin-bottom: 20px;
        border: 1px solid transparent;
        border-radius: 4px;
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.25), 0 1px 2px rgba(0,0,0,0.05);
        background-repeat: repeat-x;
        color: #a94448;
        color: #721c24;
        background-image: linear-gradient(to bottom,#f8d7da 0,#f3babf 100%);
        border-color: #f5c6cb;
      }


      button {
        display: inline-block;
        text-align: center;
        align-items: flex-start;
        text-indent: 0px;
        background: transparent;
        padding: 0;
        cursor: pointer;
        background: transparent;
        border: 0;
      }

      button.close {
        float: right;
        font-size: 21px;
        font-weight: bold;
        line-height: 1;
        color: #000;
        text-shadow: 0 1px 0 #fff;
        opacity: .2;
      }

      .primary {
        color: #6063ef;
        background-image: linear-gradient(to bottom,#c6e0f7 0,#9cbad4 100%);
        border-color: #98b3ca;  
      }
      .secondary {
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
      .danger .default {
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

customElements.define('bswc-alert', Alert);
