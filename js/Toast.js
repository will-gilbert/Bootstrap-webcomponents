
/*
https://www.w3schools.com/howto/howto_js_snackbar.asp
https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_snackbar
*/


export default class Toast extends HTMLElement {

  static get types() {
    return ['default', 'primary', 'success', 'secondary', 'info', 'warning', 'danger', 'light', 'dark'];
  }

  static get observedAttributes() {
    return ['visible', ...Toast.types];
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
    const duration = this.getAttribute('duration') || '2.5';
    const element = this.shadowRoot.getElementById('container')

    // Invoke at start and if the close icon is clicked
    if (visible) {
      element.classList.add('show');

      // Timeout; Is overriden by close icon click.
      // NB: Give enought time for the fadeout to complete
      //     before resetting 'visible'.
      setTimeout( () => {
        this.setAttribute('visible', 'false')
      }, ((parseFloat(duration) + 0.5) * 1000) - 20); 

    } else {
      element.classList.remove('show');
    }

    this.shadowRoot.querySelector('button').addEventListener('click', event => {
      this.setAttribute('visible', 'false')
      // ToDo: create Custom close event   
    })

  }


  html() {

    let type = 'default';

    Toast.types.forEach(it => {
      if (this.hasAttribute(it)) {
        type = it;
      }
    })

    // Handle 'close' attribute
    const hasClose = this.hasAttribute('hasClose')
    let classList = hasClose ? 'close' : '';
    let closeIcon = hasClose ? 'X' : '';


    return `<div id='container' class='${type}'>
              <button class='${classList}'>${closeIcon}</button>
              <slot id='title' name='title'></slot>
              <slot></slot>
            </div>`
  }

  css() {

    const duration = this.getAttribute('duration') || '2.5';
    const width = this.getAttribute('width') || '250';

    return `<style>
      
      div#container {       
        position: fixed;
        left: 50%;
        bottom: 30px;
        padding: 15px;
        margin-left: -${width/2}px;
        font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
        line-height: 1.428571429;
        min-width: ${width}px;
        max-width: ${width}px;
        background-repeat: repeat-x;
        text-align: left;
        border-radius: 4px;
        z-index: 1;
        font-size: 14px;
        visibility: hidden;
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

      slot#title {
        font-size: 20px;
      }

      #container.show {
        visibility: visible;
        animation: fadein 0.5s, fadeout 0.5s ${duration}s;
      }

      @keyframes fadein {
        from {bottom: 0; opacity: 0;}
        to {bottom: 30px; opacity: 1;}
      }

      @keyframes fadeout {
        from {bottom: 30px; opacity: 1;}
        to {bottom: 0; opacity: 0;}
      }

      .default {
        color: #383d41;
        background-image: linear-gradient(to bottom,#e2e3e5 0,#c1bfd1 100%);
        border-color: #e2e3e5;
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

customElements.define('bswc-toast', Toast);
