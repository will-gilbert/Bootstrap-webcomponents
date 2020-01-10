
export default class Breadcrumbs extends HTMLElement {

// https://catalin.red/css3-breadcrumbs

  static get types() {
    return ['default', 'primary', 'success', 'secondary', 'info', 'warning', 'danger', 'light', 'dark'];
  }

  static get variants() {
    return ['one','two','three', 'four']
  }

  static get observedAttributes() {
    return [...Breadcrumbs.types];
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
    return '<slot></slot>';
  }

  css() {

    let variant = 'one';
    Breadcrumbs.variants.forEach(it => {
      if (this.hasAttribute(it)) {
        variant = it;
      }
    })


    let type = 'default';
    Breadcrumbs.types.forEach(it => {
      if (this.hasAttribute(it)) {
        type = it;
      }
    })

    const colorsMap = {
      'default': {
        'hover': '#999','start': '#ddd', 'end': '#bbb'},
      'primary': { 
        'hover': '#83aed4','start': '#c6e0f7', 'end': '#9cbad4'},
      'secondary': {
        'hover': '#b1add2','start': '#e2e3e5', 'end': '#c1bfd1'},
      'success': {
        'hover': '#99db76','start': '#d4edda', 'end': '#afdeba'},
      'info': {
        'hover': '#9cd5f1','start': '#d9edf7', 'end': '#b9def0'},
      'warning': {
        'hover': '#fbda74','start': '#fff3cd', 'end': '#ffe490'},
      'danger': {
        'hover': '#f3a0a8','start': '#f8d7da', 'end': '#f3babf'},
      'light': {
        'hover': '#eee','start': '#fefefe', 'end': '#fdfdfe'},
      'dark': {
        'hover': '#acadaf','start': '#d6d8d9', 'end': '#c6c8ca'}
    }


    const hover = colorsMap[type]['hover'];
    const backgroundColor = colorsMap[type]['end'];
    const start = colorsMap[type]['start'];
    const end = colorsMap[type]['end'];
    
    if(variant === 'one') {
      
        /* ONE ========================================================= */

        return `<style>
          :host {
            margin: 0px;
            padding: 0px;
            display: block;
            overflow: hidden;
            width: 100%;
          }
          
          ::slotted(*) {
            position: relative;
            float: left;
            padding: .7em 1em .7em 2em;
            color: #000;
            text-decoration: none;
            background-image: linear-gradient(to right, ${start}, ${end});
          }

        
          ::slotted(*)::after {
            position: absolute;
            top: 50%;
            right: -1em;
            margin-top: -1.5em;
            border-top: 1.5em solid transparent;
            border-bottom: 1.5em solid transparent;
            border-left: 1em solid ${backgroundColor};
            content: '';
          }
          
          ::slotted(*:first-child) {
            padding-left: 1em;
          }

          ::slotted(*:hover) {
            background: ${hover};
          }

          ::slotted(*:last-child) {
            font-weight: bold;
          }

        </style>`
      } else if(variant === 'two') {

          /* TWO ========================================================= */

        return `<style>

          :host {
            margin: 0px;
            padding: 0px;
            display: block;
            overflow: hidden;
            width: 100%;
          }

          ::slotted(*)::before {
            position: absolute;
            top: 50%;
            left: -1.0em;
            margin-top: -1.5em;
            border-width: 1.5em 0 1.5em 1em;
            border-style: solid;
            border-color: ${backgroundColor} ${backgroundColor} ${backgroundColor} transparent;
            content: '';
          }
          
          ::slotted(*) {
            position: relative;
            float: left;
            margin: 0 .5em 0 1em;
            padding: .7em 1em;
            text-decoration: none;
            color: #000;
            background: ${backgroundColor};
          }

          ::slotted(*)::after {
            position: absolute;
            top: 50%;
            right: -1em;
            margin-top: -1.5em;
            border-top: 1.5em solid transparent;
            border-bottom: 1.5em solid transparent;
            border-left: 1em solid ${backgroundColor};
            content: '';
          }

          ::slotted(*:hover)::before {
            border-color: ${hover} ${hover} ${hover} transparent;
          }

          ::slotted(*:hover) {
            background-color: ${hover};
          }

          ::slotted(*:hover)::after {
            border-left-color: ${hover};
          }

          ::slotted(*:last-child) {
            font-weight: bold;
          }

        </style>`

      } else if (variant === 'three') {

        return `<style>

          /* THREE ========================================================= */

          :host {
            margin: 0px;
            padding: 0px;
            display: block;
            overflow: hidden;
            width: 100%;
          }
          
          ::slotted(*) {
            position: relative;
            float: left;
            margin: 0 2em 0 0;
            padding: .7em 1em .7em 2em;
            text-decoration: none;
            z-index: 1;
            border-radius: .4em 0 0 .4em;
            color: #000;
            background: ${backgroundColor};
          }

          ::slotted(*)::after {
            position: absolute;
            margin-top: -1.25em;
            right: -1em;
            top: 50%;
            height: 2.5em;
            width: 2.5em;
            z-index: -1;
            transform: rotate(45deg);
            border-radius: 0.3em;
            background: ${backgroundColor};
            content: '';
          }
          
          ::slotted(*:hover) {
            background: ${hover};
          }

          ::slotted(*:hover)::after {
            background: ${hover};
          }

          ::slotted(*:last-child) {
            font-weight: bold;
          }

        </style>`

        } else if(variant === 'four') {

        return `<style>

          /* FOUR ========================================================= */

          :host {
            margin: 0px;
            padding: 0px;
            display: block;
            overflow: hidden;
            width: 100%;
          }

          ::slotted(*)::before {
            left: -.5em;
            border-radius: 5px 0 0 5px;
          }
          
          ::slotted(*) {
            position: relative;
            float: left;
            margin: 0 .5em 0 1em;
            padding: .7em 1em;
            text-decoration: none;
            color: #000;
            background: ${backgroundColor};
          }

          ::slotted(*)::before,
          ::slotted(*)::after {
            position:absolute;
            top: 0;
            bottom: 0;
            width: .9em;
            height: 2.em;
            transform: skew(-15deg);
            background: ${backgroundColor};
            content:'';
          }
          
          ::slotted(*)::after {
            right: -.5em;
            border-radius: 0 5px 5px 0;
          }
          
          ::slotted(*:hover)::before {
            background: ${hover};
          }

          ::slotted(*:hover) {
            background: ${hover};
          }

          ::slotted(*:hover)::after {
            background: ${hover};
          }
          
          ::slotted(*:last-child) {
            font-weight: bold;
          }

        </style>`
      } 

  }
}

customElements.define('bswc-breadcrumbs', Breadcrumbs);
