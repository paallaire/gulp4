import loadScripts from './loadScripts';

// https://philipwalton.com/articles/loading-polyfills-only-when-needed/
export default function () {
    if (!!window.HTMLPictureElement === false) {
        loadScripts('https://polyfill.io/v3/polyfill.min.js?features=HTMLPictureElement');
    }
}
