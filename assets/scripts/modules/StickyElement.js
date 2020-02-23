/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

/*
Example

const stickyNav = new StickyElement('#header', {
    style: 'up-and-down ou default',
});

*/
export default class StickyElement {
    constructor(selector, config) {
        this.selector = selector;
        this.$element = document.querySelector(this.selector);
        this.$wrapper = null;
        this.lastPositionY = 0;
        this.offsetTop = 0;
        this.WindowScrollY = 0;

        this.requestAnimationFrameID = null;

        const defautConfig = {
            style: 'default',
        };

        this.config = Object.assign(defautConfig, config);

        this.ticking = false;

        if (this.$element) {
            this.init();
        } else {
            console.log('Module StickyElement - Selector not found!');
        }
    }

    init() {
        this.$container = this.$element.closest('[data-sticky-element]');

        this.$wrapper = document.createElement('div');
        this.$wrapper.classList.add('js-wrapper-sticky-element');
        this.$wrapper.style.height = `${this.$element.clientHeight}px`;
        this.$wrapper.style.position = 'relative';
        this.$element.parentNode.insertBefore(this.$wrapper, this.$element);
        this.$wrapper.appendChild(this.$element);

        this.$element.dataset.module = 'sticky-element';

        this.update();

        window.addEventListener('scroll', this.onScroll.bind(this));
        window.addEventListener('resize', this.onResize.bind(this));
    }

    update() {
        this.offsetTop = this.$wrapper.offsetTop;
        this.$wrapper.style.height = `${this.$element.clientHeight}px`;
    }

    logic() {
        const maxTop = this.offsetTop;
        const maxBottom = this.$container.clientHeight + this.offsetTop - this.$element.clientHeight;

        if (this.WindowScrollY >= maxTop && this.WindowScrollY <= maxBottom) {
            this.$element.classList.add('sticky-element--is-fixed');
            this.$element.style.top = `${this.WindowScrollY - this.offsetTop}px`;
        } else if (this.WindowScrollY > maxTop) {
            this.$element.classList.add('sticky-element--is-fixed');
            this.$element.style.top = `${this.$container.clientHeight - this.$element.clientHeight}px`;
        } else {
            this.$element.classList.remove('sticky-element--is-fixed');
        }

        this.lastPositionY = this.WindowScrollY;
    }

    onScroll() {
        this.WindowScrollY = window.scrollY;

        if (!this.ticking) {
            this.requestAnimationFrameID = window.requestAnimationFrame(this.onRequestAnimationFrame.bind(this));
        }

        this.ticking = true;
    }

    onRequestAnimationFrame() {
        this.logic();
        this.ticking = false;
    }

    onResize() {
        this.update();
    }

    destroy() {
        console.log('Module StickyElement - destroy!');
        window.cancelAnimationFrame(this.requestAnimationFrameID);
        window.removeEventListener('scroll', this.onScroll.bind(this));
        window.removeEventListener('resize', this.onResize.bind(this));
    }
}
