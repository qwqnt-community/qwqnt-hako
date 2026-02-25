import { BaseElement } from '../element';
import { css, html } from 'lit';

export class Panel extends BaseElement {
  static styles = [
    ...super.styles,
    css`
      :host {
        display: block;
        background-color: var(--fill_light_primary, var(--fg_white));
        border-radius: 8px;
        font-size: min(var(--font_size_3), 18px);
        line-height: min(var(--line_height_3), 24px);
        margin-bottom: 20px;
      }
    `,
  ];

  static properties = {
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