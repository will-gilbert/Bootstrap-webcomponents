
export default class Badge extends HTMLElement {

  static get types() {
    return ['default', 'primary', 'success', 'secondary', 'info', 'warning', 'danger', 'light', 'dark'];
  }

  static get variants() {
    return ['pill'];
  }

  static get observedAttributes() {
    return [...Badge.variants, ...Badge.types];
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
    let variant = 'plain';

    Badge.types.forEach(it => {
      if (this.hasAttribute(it)) {
        type = it;
      }
    })

    Badge.variants.forEach( it => {
      if (this.hasAttribute(it)) {
        variant = it;
      }

    })

    return `<div class='${variant} ${type}'><slot></slot></div>`
  }

  css() {
    return `<style>

      .plain {
        display: inline-block;
        padding: .25em .4em;
        font-size: 75%;
        font-weight: 700;
        line-height: 1;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: .25rem;
        color: #fff;
        background-color: #6c757d;      
      }
 
      .pill {
        display: inline-block;
        padding: .25em .4em;
        font-size: 75%;
        font-weight: 700;
        line-height: 1;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        padding-right: .6em;
        padding-left: .6em;
        border-radius: 10rem;
      }

      .default {
        background-color: #999;
      }
      .primary {
        color: #fff;
        background-color: #007bff;      
      }
      .secondary {
        color: #fff;
        background-color: #6c757d;      
      }
      .success {
        color: #fff;
        background-color: #28a745;      
      }
      .info {
        color: #fff;
        background-color: #17a2b8;      
      }
      .warning {
        color: #212529;
        background-color: #ffc107;      
      }
      .danger {
        color: #fff;
        background-color: #dc3545;      
      }
      .light {
        color: #212529;
        background-color: #f8f9fa;      
      }
      .dark {
        color: #fff;
        background-color: #343a40;      
      }

    </style>`
  }

}

customElements.define('bswc-badge', Badge);
