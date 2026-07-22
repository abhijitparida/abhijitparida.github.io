import { CONTENT } from '../data/content.js';

/**
 * InfoPanel.js — Slide-in overlay panel for object interactions.
 * Opens with content keyed from content.js, closes on X or ESC.
 */
export class InfoPanel {
  constructor(onClose) {
    this.onClose = onClose;
    this.isOpen = false;

    this.panel = document.getElementById('info-panel');
    this.panelTag = document.getElementById('panel-tag');
    this.panelTitle = document.getElementById('panel-title');
    this.panelBody = document.getElementById('panel-body');
    this.closeBtn = document.getElementById('panel-close');

    this._onClose = this._onClose.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);

    this.closeBtn.addEventListener('click', this._onClose);
    this.panel.addEventListener('click', (e) => {
      if (e.target === this.panel) this._onClose();
    });
    document.addEventListener('keydown', this._onKeyDown);
  }

  open(key) {
    const content = CONTENT[key];
    if (!content) return;

    this.panelTag.textContent = content.tag;
    this.panelTitle.textContent = content.title;
    this.panelBody.innerHTML = content.body;
    this.panel.classList.remove('hidden');
    this.isOpen = true;
  }

  _onClose() {
    this.panel.classList.add('hidden');
    this.isOpen = false;
    this.onClose();
  }

  _onKeyDown(e) {
    if (e.code === 'Escape' && this.isOpen) {
      // Note: ESC also exits pointer lock. We just close panel if it's open.
      this._onClose();
    }
  }

  dispose() {
    this.closeBtn.removeEventListener('click', this._onClose);
    document.removeEventListener('keydown', this._onKeyDown);
  }
}
