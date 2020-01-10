
export default class Loader extends HTMLElement {

  static get types() {
    return['default', 'primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark'];
  }

  static get variants() {
    return ['bars', 'circles', 'facebook']
  }

  static get observedAttributes() {
    return ['scale', ...Loader.variants, ...Loader.types];
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
    let variant = 'bars'

    Loader.types.forEach( it => {
      if (this.hasAttribute(it)) {
        type = it;
      }
    })

    Loader.variants.forEach( it => {
      if (this.hasAttribute(it)) {
        variant = it;
      }
    })

    return `<div class='loader ${variant}'>
              <div class='${type}'></div>
              <div class='${type}'></div>
              <div class='${type}'></div>
              <div class='${type}'></div>
              <div class='${type}'></div>
              <div class='${type}'></div>
              <div class='${type}'></div>
              <div class='${type}'></div>
          </div>`
  }

  css() {

    const scale = this.getAttribute('scale') || '1.0';

    return `<style>

      .loader {
        display: inline-block;
        position:relative;
      }
      
      .loader.bars, .loader.circles {
        margin: 30px auto;
        width:${100 * scale}px;
        height: ${100 * scale}px;
        transform: scale(${scale});
      }


      .bars div {
        width: 10px;
        height: 30px;
        position: absolute;
        top: 35px;
        left: 45px;
        opacity:0.05;
        animation: fadeit 1.1s linear infinite;
      }

      .bars div:nth-child(1) {
        transform: rotate(0deg) translate(0, -30px); 
        animation-delay:0.39s;
      }
      
      .bars div:nth-child(2){
          transform: rotate(45deg) translate(0, -30px); 
          animation-delay:0.52s;
      } 

      .bars div:nth-child(3){
          transform: rotate(90deg) translate(0, -30px); 
          animation-delay:0.65s;
      } 

      .bars div:nth-child(4){
          transform: rotate(135deg) translate(0, -30px); 
          animation-delay:0.78s;
      } 

      .bars div:nth-child(5){
          transform: rotate(180deg) translate(0, -30px); 
          animation-delay:0.91s;
      } 

      .bars div:nth-child(6){
          transform: rotate(225deg) translate(0, -30px); 
          animation-delay:1.04s;
      } 

      .bars div:nth-child(7){
          transform: rotate(270deg) translate(0, -30px); 
          animation-delay:1.17s;
      } 

      .bars div:nth-child(8){
          transform: rotate(315deg) translate(0, -30px); 
          animation-delay:1.3s;
      }

      .circles div{
          width: 20px;
          height: 20px;
          border-radius:50%;
          position: absolute;
          top: 35px;
          left: 45px;
          animation: fadeit 1.1s linear infinite;
      }

      .circles div:nth-child(1){
        transform: rotate(0deg) translate(0, -35px) scale(1.4);
        animation-delay:0.39s;
      }
      .circles div:nth-child(2){
        transform: rotate(45deg) translate(0, -35px) scale(1.2);
         animation-delay:0.52s;
      }
      .circles div:nth-child(3){
        transform: rotate(90deg) translate(0, -35px) scale(1.1);
        animation-delay:0.65s;
      }
      .circles div:nth-child(4){
        transform: rotate(135deg) translate(0, -35px) scale(0.9);
        animation-delay:0.78s;
      }
      .circles div:nth-child(5){
        transform: rotate(180deg) translate(0, -35px) scale(0.7);
        animation-delay:0.91s;
      }
      .circles div:nth-child(6){
        transform: rotate(225deg) translate(0, -35px) scale(0.5);
        animation-delay:1.04s;
      }
      .circles div:nth-child(7){
        transform: rotate(270deg) translate(0, -35px) scale(0.3);
        animation-delay:1.17s;
      }
      .circles div:nth-child(8){
        transform: rotate(315deg) translate(0, -35px) scale(0.1);
        animation-delay:1.3s;
      }

      .facebook {
        width: ${100*scale}px;
        height: ${100*scale}px;
      }

      .facebook div {
        display:none;
        height:${50 * scale}px;
        width:${20 * scale}px;
        animation:facebook_loader 1.3s linear infinite;
      }

      .facebook div:nth-child(1){
        display:inline-block;
        animation-delay:0.39s;
      }
      .facebook div:nth-child(2){
        display:inline-block;
        animation-delay:0.52s;
      }
      .facebook div:nth-child(3){
        display:inline-block;
        animation-delay:0.65s;
      }
   

      .default {
        background-color: #999;
      }
      .primary {
        background-color: #007bff;
      }
      .secondary {
        background-color: #6c757d;
      }
      .success {
        background-color: #28a745;
      }
      .info {
        background-color: #17a2b8;
      }
      .warning {
        background-color: #ffc107;
      }
      .danger {
        background-color: #dc3545;
      }
      .light {
        background-color: #f8f9fa;
      }
      .dark {
        background-color: #343a40;
      }

      @keyframes fadeit {
        0%{opacity:1;}
        100%{opacity:0;}
      }

      @keyframes facebook_loader{
        0%{ transform:scale(1.2); opacity:1 }
        100%{ transform:scale(0.7); opacity:0.1 }
      }

    </style>`
  }

}

customElements.define('bswc-loader', Loader);
