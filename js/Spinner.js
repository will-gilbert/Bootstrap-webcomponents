
export default class Spinner extends HTMLElement {

  static get types() {
    return['default', 'primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark'];
  }

  static get variants() {
    return ['border', 'grow', 'pulse'];
  }

  static get observedAttributes() {
    return [ 'scale', 'duration', ...Spinner.variants, ...Spinner.types];
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
    let variant = 'border';

    Spinner.types.forEach( it => {
      if (this.hasAttribute(it)) {
        type = it;
      }
    })

    Spinner.variants.forEach(it => {
      if (this.hasAttribute(it)) {
        variant = it;
      }
    })


    return `<div class='${type} ${variant}'></div>`
  }

  css() {

    const scale = this.getAttribute('scale') || '1.0';
    const duration = this.getAttribute('duration') || '1.0';

    return `<style>
      div {
        display: inline-block;
        margin-top: 16px;
        margin-bottom: 16px;
        width: ${30 * scale}px;
        height: ${30 * scale}px;
        vertical-align: text-bottom;
        border: .25em solid currentColor;
        border-radius: 50%;
        animation-duration: ${duration}s;
        animation-iteration-count: infinite;
        animation-timing-function: linear; 
      }
      
      .border {
        margin-left: 16px;
        border: .25em solid currentColor;
        border-right-color: transparent;
        background-color: transparent;      
        animation-name: spinner-border;
      }

      .grow {
        background-color: currentColor;
        animation-name: spinner-grow ;
      }
      .pulse {
        background-color: currentColor;
        animation-name: spinner-pulse ;
      }

      .default {
        color: #999;
      }
      .primary {
        color: #007bff;
      }
      .secondary {
        color: #6c757d;
      }
      .success {
        color: #28a745;
      }
      .info {
        color: #17a2b8;
      }
      .warning {
        color: #ffc107;
      }
      .danger {
        color: #dc3545;
      }
      .light {
        color: #f8f9fa;
      }
      .dark {
        color: #343a40;
      }

      @keyframes spinner-border {
        0% {transform: translate3d(-50%, -50%, 0) rotate(0deg); }
        100% { transform: translate3d(-50%, -50%, 0) rotate(360deg); }
      }
      @keyframes spinner-grow {
        0% { transform: scale(.0001) rotateZ(360deg) ; }
        100% { transform: scale(.99) rotateZ(-360deg); }      
      }
      @keyframes spinner-pulse {
        0% { transform: scale(.0001) rotateZ(360deg) ; }
        50% { transform: scale(.99) rotateZ(-360deg); }      
        100% { transform: scale(.0001) rotateZ(360deg) ; }
      }

    </style>`
  }

}

customElements.define('bswc-spinner', Spinner);
