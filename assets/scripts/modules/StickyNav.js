/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

/*
Example

// Show on scroll Up and hide on scroll Down
// https://medium.com/@mariusc23/hide-header-on-scroll-down-show-on-scroll-up-67bbaae9a78c

const stickyNav = new StickyNav('#header', {
    style: 'up-and-down ou default',
});

*/
export default class StickyNav {
    constructor(selector, config) {
        this.selector = selector;
        this.$element = document.querySelector(this.selector);
        this.$elementWrapper = null;
        this.lastPositionY = 0;
        this.offsetTop = 0;
        this.elementHeight = 0;
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
            console.log('Module StickyNav - Selector not found!');
        }
    }

    init() {
        this.$elementWrapper = document.createElement('div');
        this.$elementWrapper.classList.add('js-wrapper-sticky-nav');
        this.$elementWrapper.style.height = `${this.elementHeight}px`;
        this.$element.parentNode.insertBefore(this.$elementWrapper, this.$element);
        this.$elementWrapper.appendChild(this.$element);

        this.$element.dataset.module = 'sticky-nav';

        this.update();

        window.addEventListener('scroll', this.onScroll.bind(this));
        window.addEventListener('resize', this.onResize.bind(this));
    }

    update() {
        this.elementHeight = this.$element.clientHeight;
        this.offsetTop = this.$elementWrapper.offsetTop;
        this.$elementWrapper.style.height = `${this.elementHeight}px`;
    }

    logic() {
        if (this.WindowScrollY > this.offsetTop) {
            this.$element.classList.add('sticky-nav--is-fixed');

            if (this.config.style === 'up-and-down') {
                if (this.WindowScrollY > this.lastPositionY) {
                    this.$element.classList.add('sticky-nav--is-hidden');
                } else {
                    this.$element.classList.remove('sticky-nav--is-hidden');
                }
            }
        } else {
            this.$element.classList.remove('sticky-nav--is-fixed');
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
        window.cancelAnimationFrame(this.requestAnimationFrameID);
        window.removeEventListener('scroll', this.onScroll.bind(this));
        window.removeEventListener('resize', this.onResize.bind(this));
        console.log('Module StickyNav - destroy!');
    }
}
