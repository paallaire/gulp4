import Toggle from './modules/Toggle';
import StickyNav from './modules/StickyNav';
import Tabs from './modules/Tabs';
import NavCanvas from './modules/NavCanvas';
import StickyElement from './modules/StickyElement';

export default function () {
    const toggle = new Toggle('.c-toggle');
    // toggle.destroy();

    const stickyNav = new StickyNav('#header', {
        style: 'up-and-down',
    });

    const tabs = new Tabs('.c-tabs');
    // tabs.destroy();

    const navCanvas = new NavCanvas('.c-nav-canvas');

    const $navCanvasButton = document.querySelector('#nav-canvas-button');

    if ($navCanvasButton) {
        $navCanvasButton.addEventListener('click', (e) => {
            e.preventDefault();
            navCanvas.toggle();
        });
    }

    const stickyElement = new StickyElement('#sticky-element', {
        style: 'up-and-down ou default',
    });
}
