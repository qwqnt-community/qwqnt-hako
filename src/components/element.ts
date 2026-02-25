import { css, LitElement, type TemplateResult, adoptStyles } from 'lit';

export class BaseElement extends LitElement {
  static styles = [
    css`
      :host([is-disabled]) {
        opacity: .3;
        cursor: not-allowed;
        pointer-events: none;
      }
      :host(.hidden), .hidden {
        display: none !important;
      }
    `,
  ];

  attributeChangedCallback(){
    this.update();
  };

  connectedCallback(){
    this.update();
  };

  disconnectedCallback(){};

  update(){};

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    adoptStyles(this.shadowRoot!, (this.constructor as typeof BaseElement).styles);
    this.shadowRoot!.innerHTML = (this.render as () => TemplateResult<1>)().strings[0];
  };

  setTitle(title: string){
    this.setAttribute('data-title', title);
  };

  getTitle(){
    return this.getAttribute('data-title');
  };

  setValue(value: string){
    this.setAttribute('data-value', value);
  };

  getValue(){
    return this.getAttribute('data-value');
  };

  setType(type: 'primary' | 'secondary'){
    if(!['primary', 'secondary'].includes(type)){
      throw new Error('Type must be "primary" or "secondary"');
    }
    this.setAttribute('data-type', type);
  };

  getType(){
    return this.getAttribute('data-type');
  };

  setDirection(direction: 'column' | 'row'){
    if(!['column', 'row'].includes(direction)){
      throw new Error('Direction must be "column" or "row"');
    }
    this.setAttribute('data-direction', direction);
  };

  getDirection(){
    return this.getAttribute('data-direction');
  };

  setCollapsible(collapsible: boolean){
    this.toggleAttribute('is-collapsible', collapsible);
  };

  getCollapsible(){
    return this.hasAttribute('is-collapsible');
  };

  setSelected(selected: boolean){
    this.toggleAttribute('is-selected', selected);
  };

  getSelected(){
    return this.hasAttribute('is-selected');
  };

  setActive(active: boolean){
    this.toggleAttribute('is-active', active);
  };

  getActive(){
    return this.hasAttribute('is-active');
  };

  setDisabled(disabled: boolean){
    this.toggleAttribute('is-disabled', disabled);
  };

  getDisabled(){
    return this.hasAttribute('is-disabled');
  };
}
