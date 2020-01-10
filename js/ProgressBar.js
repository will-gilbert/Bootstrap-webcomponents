
export default class ProgressBar extends HTMLElement {

  static get types() {
    return ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark'];
  }
  static get observedAttributes() {
    return ['width', ...ProgressBar.types];
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

    // Color -------------------
    let type = 'primary';

    ProgressBar.types.forEach(it => {
      if (this.hasAttribute(it)) {
        type = it;
      }
    })

    // Size --------------------
    const height = this.getAttribute('height') || '16px';
    const width = this.getAttribute('width') || '100%';
    const value = this.getAttribute('value') || '0';
    const striped = this.hasAttribute('striped') ? 'striped' : '';
    const animated = this.hasAttribute('animated') ? 'animated' : '';

    return `<div style='width:${width}; height:${height}' class='bar'>
              <div class='value ${type} ${striped} ${animated}' style='width:${value}%; height:${height}'><slot></slot></div>
            <div>`
  }

  css() {
    return `<style>
      .bar {
        display: flex;
        margin-bottom: 16px;
        height: 1rem;
        overflow: hidden;
        font-size: .75rem;
        background-color: #e9ecef;
        border-radius: .25rem;      
      }
      
      .value {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-family: san-serif;
        font-weight: 400;
        line-height: 1.5;
        text-align: center;
        white-space: nowrap;
        transition: width .6s ease;        
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
      .striped {
          background-image: linear-gradient(
            45deg,rgba(255,255,255,.15) 25%,
            transparent 25%,transparent 50%,
            rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,
            transparent 75%,
            transparent);
        background-size: 40px 40px;
      }
      .animated {
        animation-name: progress-bar-stripes;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-timing-function: linear; 
      }

     @keyframes progress-bar-stripes {
        from { background-position: 40px 0; }
          to { background-position: 0 0; }
      } 

    </style>`
  }

}

customElements.define('bswc-progress-bar', ProgressBar);
