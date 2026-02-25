import { BaseElement } from '../element';
import { css, html } from 'lit';


export class Divider extends BaseElement {
  static styles = [
    ...super.styles,
    css`
      :host {
        display: block;
        background-color: rgba(127, 127, 127, .15);
      }

      :host([data-direction="row"]) {
        height: 1px;
      }

      :host([data-direction="column"]) {
        width: 1px;
      }
    `,
  ];

  static properties = {
    dataDirection: {
      type: 'String',
      attribute: 'data-direction',
    },
    isDisabled: {
      type: 'Boolean',
      attribute: 'is-disabled',
    },
  };

  render(){
    return html`
      <slot></slot>
    `;
  };
};
