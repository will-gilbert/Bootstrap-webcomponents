
export default class Tooltip extends HTMLElement {

  static get observedAttributes() {
    return ['tip', 'left', 'top', 'right', 'bottom','delay','duration','width'];
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

    const tip = this.getAttribute('tip')

    return `<div class='tooltip'><span class='tooltiptext'>${tip}</span><slot></slot></div>`;
  }

  css() {

    let tipPlacement;
    let arrowPlacement;
    let arrow;
    
    const width = this.getAttribute('width') || 120;
    const delay = this.getAttribute('delay') || 0.5;
    const duration = this.getAttribute('duration') || 0.3;
    
    // Placement specif CSS; 'top' is the default
    if (this.hasAttribute('right')) {
      tipPlacement = 'top: -5px; left: 115%;'
      arrowPlacement = 'top: 50%; right: 100%; margin-top: -5px;'
      arrow = 'border-color: transparent black transparent transparent;'
    } else if (this.hasAttribute('left')) {
      tipPlacement = 'top: -5px; right: 120%;'
      arrowPlacement = 'top: 50%; left: 100%; margin-top: -5px;'
      arrow = 'border-color: transparent transparent transparent black;'
    } else if (this.hasAttribute('bottom')) {
      tipPlacement = `width: ${width}px; top: 100%; left: 50%; margin-left: -${width/2}px;`
      arrowPlacement = 'bottom: 100%; left: 50%; margin-left -5px;'
      arrow = 'border-color: transparent transparent black transparent;'
    } else {
      tipPlacement = `width: ${width}px; bottom: 100%; left: 50%; margin-left: -${width / 2}px;`
      arrowPlacement = 'top: 100%; left: 50%; margin-left: -5px;'
      arrow = 'border-color: black transparent transparent transparent;'
    }

    return `<style>

    .tooltip {
      display: inline-block;
      position: relative;
    }

    .tooltip .tooltiptext {
      visibility: hidden;
      width: 120px;
      background-color: black;
      color: #fff;
      text-align: center;
      padding: 5px 0;
      border-radius: 6px;

      /* Position the tooltip text; Re: 'tipPlacement' */
      position: absolute;
      z-index: 1;

      opacity: 0;
      transition-delay: ${delay}s;
      transition-duration:  ${duration}s;
      transition-property: opacity;
    }

    /* Tip placement when visible */
    .tooltip:hover .tooltiptext {
      visibility: visible;
      ${tipPlacement}
      opacity: 1;

    }


    .tooltip .tooltiptext::after {
      content: " ";
      position: absolute;
      ${arrowPlacement}
      border-width: 5px;
      border-style: solid;
      ${arrow}
    }
    </style>`
  }

}

customElements.define('bswc-tooltip', Tooltip);
