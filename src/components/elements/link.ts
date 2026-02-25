import { BaseElement } from '../element';
import { css, html } from 'lit';

export class Link extends BaseElement {
  static styles = [
    ...super.styles,
    css`
      :host {
        color: var(--text_link);
        cursor: pointer;
      }
    `,
  ];

  static properties = {
    dataValue: {
      type: 'String',
      attribute: 'data-value',
    },
    isDisabled: {
      type: 'Boolean',
      attribute: 'is-disabled',
    },
  };

  #openExternalBound = this.#openExternal.bind(this);

  connectedCallback(){
    super.connectedCallback();
    this.addEventListener("click", this.#openExternalBound);
  };

  disconnectedCallback(){
    super.disconnectedCallback();
    this.removeEventListener("click", this.#openExternalBound);
  };

  #openExternal(){
    const value = this.getValue()!;
    try {
      new URL(value);
      PluginSettings.renderer.openExternal(value);
    } catch {
      PluginSettings.renderer.openPath(value);
    }

  };

  update(){
    this.textContent ||= this.getValue();
  };

  render(){
    return html`
      <slot></slot>
    `;
  };
};