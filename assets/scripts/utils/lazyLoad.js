import LazyLoad from 'vanilla-lazyload';

export default function () {
    window.lazyLoadInstance = new LazyLoad({
        elements_selector: '.o-lazy',
    });
}
