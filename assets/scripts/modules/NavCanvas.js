export default class NavCanvas {
    constructor(selector, config) {
        this.selector = selector;
        this.$element = document.querySelector(this.selector);
        this.$body = document.querySelector('body');

        const defautConfig = {
            style: 'default',
        };

        this.config = Object.assign(defautConfig, config);

        if (this.$element) {
            this.init();
        } else {
            console.log('Module NavCanvas - Selector not found!');
        }
    }

    init() {
        this.$body.classList.add('c-nav-canvas--loaded');
    }

    open() {
        this.$body.classList.add('c-nav-canvas--is-active');
    }

    close() {
        this.$body.classList.remove('c-nav-canvas--is-active');
    }

    toggle() {
        if (this.$body.classList.contains('c-nav-canvas--is-active')) {
            this.close();
        } else {
            this.open();
        }
    }
}
