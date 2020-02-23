// polyfills
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'dom4';
import 'whatwg-fetch';
import 'picturefill';
import 'svgxuse';

// modules
import demoInit from './demo';
import { $body, isDebug } from './utils/environment';
import loadWebfonts from './utils/webFonts';
import lazyLoadInit from './utils/lazyLoad';
import GridVisualizer from './modules/GridVisualizer';

document.addEventListener('DOMContentLoaded', () => {
    // set helper class
    $body.classList.add(isDebug ? 'is-dev' : 'is-production');

    // load webfonts
    loadWebfonts();

    // init
    demoInit();
    lazyLoadInit();
    const websiteGrid = new GridVisualizer({
        numberColumns: 12,
        // columnsCssClassCustom: [
        //     'lg:w-1/12 md:w-1/8 w-1/4 visible',
        //     'lg:w-1/12 md:w-1/8 w-1/4 visible',
        //     'lg:w-1/12 md:w-1/8 w-1/4 visible',
        //     'lg:w-1/12 md:w-1/8 w-1/4 visible',
        //     'lg:w-1/12 md:w-1/8 hidden md:block',
        //     'lg:w-1/12 md:w-1/8 hidden md:block',
        //     'lg:w-1/12 md:w-1/8 hidden md:block',
        //     'lg:w-1/12 md:w-1/8 hidden md:block',
        //     'lg:w-1/12 hidden lg:block',
        //     'lg:w-1/12 hidden lg:block',
        //     'lg:w-1/12 hidden lg:block',
        //     'lg:w-1/12 hidden lg:block',
        // ],
    });
    websiteGrid.init();
});
