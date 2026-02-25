import { BaseElement } from '../element';
import { css, html } from 'lit';

export class Text extends BaseElement {
  static styles = [
    ...super.styles,
    css`
      :host {
        display: -webkit-box;
        word-break: break-all;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }

      :host([data-type='secondary']) {
        color: var(--text_secondary);
        font-size: min(var(--font_size_2), 16px);
        line-height: min(var(--line_height_2), 22px);
        margin-top: 4px;
      }
    `,
  ];

  static properties = {
    dataType: {
      type: 'String',
      attribute: 'data-type',
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