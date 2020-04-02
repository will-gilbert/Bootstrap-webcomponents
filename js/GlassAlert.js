
export default class GlassAlert extends HTMLElement {

  static get types() {
    return ['default', 'primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark'];
  }
  static get observedAttributes() {
    return ['visible', 'opacity', 'blur', 'timeout', ...GlassAlert.types];
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

    // Nothing to see here, skip rendering; NB: Setting visible='false'
    //  will cause the component to breifly appear and fade to opacity of 0
    if(this.hasAttribute('visible') === false) {
      return;
    }

    // Show the component using a fadein/fadeout on hide
    const visible = (this.getAttribute('visible') || 'false').toLowerCase() === 'true';
    const element = this.shadowRoot.getElementById('container');

    // Need 'focus' & 'tabindex=0' in order to receive 'Escape' key to close
    if( visible ) {
      element.classList.remove('hide');
      element.classList.add('show');
      element.focus();
    } else {
      element.classList.remove('show');
      element.classList.add('hide');
    }

    // Handle a timeout in seconds
    const timeout = this.getAttribute('timeout');

    // The 'timeout' must be in integer seconds
    if(timeout !== undefined ) {
      const seconds = parseInt(timeout);
      if( Number.isInteger(seconds)) {

        new Promise( (resolve, reject) => {
          this.timer = setTimeout( () => { 
            resolve(); 
          }, seconds * 1000 );
        })
        .then( () => {
          element.classList.remove('show');
          element.classList.add('hide');
          this.timer = undefined;
        });
      }
    }

    // 'Esc' key to close the GlassAlert; Cancel any timeout timer
    this.shadowRoot.querySelector('#container').addEventListener('keydown', event => {
      if(event.keyCode === 27) {
        this.setAttribute('visible', 'false')
        if(this.timer !== undefined) {
          clearTimeout(this.timer);
          this.timer = undefined;
        }
      }
    })
  }

  html() {

    let type = 'default';

    GlassAlert.types.forEach( it => {
      if (this.hasAttribute(it)) {
        type = it;
      }
    })


    return `<div id='container' tabindex='0' class='${type}'>
              <span id='content'>
                <slot></slot>
              </span>
            </div>`
  }

  css() {

    const opacity = this.getAttribute('opacity') || '0.75';
    const blur = this.getAttribute('blur') || '5px';

    return `<style>
      
      #container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        text-align: center;
        font-family: inherit;
        z-index: 99999;
        opacity: 0;
        pointer-events: none;
      }

      #content {
        position: fixed;
        top: 50%;
        left: 0;
        right: 0;
        font-size: 50px;
        margin: auto;
        background-color:transparent;
        color: inherit;
        font-family: inherit;
      }

      #container.show {
        opacity: ${opacity};
        pointer-events: auto;
        backdrop-filter: blur(${blur});
        animation: fadein 0.5s;
      }

      #container.hide {
        opacity: 0;
        pointer-events: none;
        backdrop-filter: none;
        animation: fadeout 0.5s;
      }

      @keyframes fadein {
        from {opacity: 0;}
        to {opacity: ${opacity};}
      }

      @keyframes fadeout {
        from {opacity: ${opacity};}
        to {opacity: 0;}
      }

      .default {
        color: black;
      }

      .primary {
        color: #6063ef;
        background-image: linear-gradient(to bottom,#c6e0f7 0, #9cbad4 100%);
      }
      .secondary {
        color: #383d41;
        background-image: linear-gradient(to bottom,#e2e3e5 0,#c1bfd1 100%);
      }
      .success {
        color: #3c763d;
        background-image: linear-gradient(to bottom,#d4edda 0,#afdeba 100%);
      }
      .info {
        color: #31708f;
        background-image: linear-gradient(to bottom,#d9edf7 0,#b9def0 100%);;
      }
      .warning {
        color: #856404;
        background-image: linear-gradient(to bottom,#fff3cd 0,#ffe490 100%);
      }
      .danger {
        color: #721c24;
        background-image: linear-gradient(to bottom,#f8d7da 0,#f3babf 100%);
      }
      .light {
          color: #818182;
          background-image: linear-gradient(to bottom,#fefefe 0,#fdfdfe 100%);
      }
      .dark {
        color: #1b1e21;
        background-image: linear-gradient(to bottom, #d6d8d9 0,#c6c8ca 100%);
        border-color: #c6c8ca;      
      }

    </style>`
  }

}

customElements.define('bswc-glass-alert', GlassAlert);
