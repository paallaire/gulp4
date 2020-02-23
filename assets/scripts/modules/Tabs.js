/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

export default class Tabs {
    constructor(selector) {
        this.selector = selector;
        this.$elements = document.querySelectorAll(this.selector);
        this.buttonHandlerClick = [];

        if (this.$elements) {
            this.init();
        } else {
            console.log('Module Tabs - Selector not found!');
        }
    }

    init() {
        const hash = window.location.hash.substr(1);

        this.$elements.forEach(($tab, indexElement) => {
            const $buttons = $tab.querySelectorAll('.c-tabs__header-button');
            const $contents = $tab.querySelectorAll('.c-tabs__content');

            $tab.dataset.module = 'tabs';

            this.buttonHandlerClick[indexElement] = [];

            // Active first item
            if ($buttons && $contents) {
                $buttons[0].classList.add('is-active');
                $contents[0].classList.add('is-active');
            } else {
                console.log('Module Tabs - Missing button or content!');
            }

            $buttons.forEach(($item) => {
                if ($item.hash.substr(1) === hash) {
                    this.tabs(hash, $item);
                }

                const handlerClick = this.onClick.bind(this);

                this.buttonHandlerClick[indexElement].push(handlerClick);
                $item.addEventListener('click', handlerClick);
            });
        });
    }

    tabs(hash, target) {
        const $tab = target.closest('.c-tabs');
        const $buttons = $tab.querySelectorAll('.c-tabs__header-button');
        const $contents = $tab.querySelectorAll('.c-tabs__content');

        $contents.forEach(($block) => {
            if ($block.id === hash) {
                // buttons
                $buttons.forEach((button) => {
                    button.classList.remove('is-active');
                });
                target.classList.add('is-active');

                // content
                $contents.forEach((content) => {
                    content.classList.remove('is-active');
                });
                $block.classList.add('is-active');
            }
        });
    }

    destroy() {
        console.log('Module Tabs - destroy!', this);

        this.$elements.forEach(($tab, indexElement) => {
            const $buttons = $tab.querySelectorAll('.c-tabs__header-button');
            $buttons.forEach(($link, indexButton) => {
                $link.removeEventListener('click', this.buttonHandlerClick[indexElement][indexButton]);
            });
        });
    }

    onClick(e) {
        this.tabs(e.target.hash.substr(1), e.target);
    }
}
