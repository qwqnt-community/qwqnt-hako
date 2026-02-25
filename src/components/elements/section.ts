import { BaseElement } from '../element';
import { css, html } from 'lit';

export class Section extends BaseElement {
  #title = this.shadowRoot!.querySelector('h1')!;

  static styles = [
    ...super.styles,
    css`
      h1 {
        color: var(--text_primary);
        font-weight: var(--font-bold);
        font-size: min(var(--font_size_3), 18px);
        line-height: min(var(--line_height_3), 24px);
        padding: 0px 16px;
        margin: 0px 0px 8px;
      }
    `,
  ];

  static properties = {
    dataTitle: {
      type: 'String',
      attribute: 'data-title',
    },
    isDisabled: {
      type: 'Boolean',
      attribute: 'is-disabled',
    },
  };

  render(){
    return html`
      <h1></h1>
      <slot></slot>
    `;
  };

  update(){
    this.#title.textContent = this.getTitle();
  };
};