import { BaseElement } from '../element';
import { css, html } from 'lit';


export class Item extends BaseElement {
  static styles = [
    ...super.styles,
    css`
      :host([data-direction="column"]) {
        flex: 1;
        padding: 0px 10px;
        text-align: center;
      }

      :host([data-direction="row"]) {
        padding: 12px 0px;
        display: flex;
        justify-content: space-between;
        align-items: center;
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
