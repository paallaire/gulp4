const APP_NAME = 'Boilerplate';

const $html = document.documentElement;
const $body = document.body;

const searchTerms = ['local', 'dev', 'stage', 'test'];
const lang = $html.getAttribute('lang') !== null ? $html.getAttribute('lang') : 'en';
const isDebug = searchTerms.some((el) => window.location.href.includes(el));

export {
    APP_NAME, $html, $body, lang, isDebug,
};
