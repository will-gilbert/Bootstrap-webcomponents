
export default class Modal extends HTMLElement {

  static get types() {
    return ['default', 'primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark'];
  }
  static get observedAttributes() {
    return ['visible', ...Modal.types];
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

    const visible = (this.getAttribute('visible') || 'false').toLowerCase() === 'true';
    const element = this.shadowRoot.getElementById('container')

    if(visible) {
      element.classList.remove('hide');
      element.classList.add('show');
    } else {
      element.classList.remove('show');
      element.classList.add('hide');
    }

    this.shadowRoot.querySelector('#close').addEventListener('click', event => {
      this.setAttribute('visible', 'false')
      // ToDo: create Custom close event   
    })
  }

  html() {

    let type = 'default';

    Modal.types.forEach(it => {
      if (this.hasAttribute(it)) {
        type = it;
      }
    })

    return `<div id='container'>
              <div id='content' class='${type}'>
                <div id="close">X</div>
                <slot name='header'></slot>
                <slot name='body'></slot>
                <slot name='footer'></slot>
                <slot id='anonymous'></slot>
              </div>
            </div>`
  }

  css() {

    const width = this.getAttribute('width') || '65%';

    return `<style>
      
      #container {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        font-family: inherit;
        background: rgba(0, 0, 0, 0.6);
        z-index: 99999;
        opacity: 0.0;
        pointer-events: none; 
      }

      #content {
        position:relative;
        display: flex;
        flex-direction: column;
        word-wrap: break-word;
        width: ${width};
        margin: 10% auto;
        border-width: 1px;
        border-style: solid;
        border-radius: 0.8rem;      
        background-clip: border-box;
        font-family: inherit;
      }

      #container.show {
        opacity: 1.0;
        pointer-events: auto;
        animation: fadein 0.5s;
      }

      .hide {
        opacity: 0.0;
        pointer-events: none;
        animation: fadeout 0.5s;
      }

      @keyframes fadein {
        from {bottom: 0; opacity: 0;}
        to {bottom: 30px; opacity: 1;}
      }

      @keyframes fadeout {
        from {bottom: 30px; opacity: 1;}
        to {bottom: 0; opacity: 0;}
      }

      #close {
        background: #606061;
        color: #FFFFFF;
        line-height: 25px;
        position: absolute;
        right: -12px;
        text-align: center;
        top: -10px;
        width: 24px;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
        border-radius: 12px;
        box-shadow: 1px 1px 3px #000;
      }

      #close:hover {
        background: #00d9ff;
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

customElements.define('bswc-modal', Modal);
