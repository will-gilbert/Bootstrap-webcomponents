
export default class Crumb extends HTMLElement {

  static get types() {
    return ['default', 'primary', 'success', 'secondary', 'info', 'warning', 'danger', 'light', 'dark'];
  }

  static get observedAttributes() {
    return [...Crumb.types];
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

    Crumb.types.forEach(it => {
      if (this.hasAttribute(it)) {
        type = it;
      }
    })

    return `<div><slot></slot><div>`
  }

  css() {
    return `<style>
    </style>`
  }

}

customElements.define('bswc-crumb', Crumb);
