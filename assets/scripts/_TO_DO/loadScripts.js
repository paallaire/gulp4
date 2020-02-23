export default function (src) {
    const js = document.createElement('script');
    js.src = src;
    js.onload = () => {
        console.log(`${src} loaded`);
    };
    js.onerror = () => {
        console.log(`Failed to load script ${src}`);
    };
    document.head.appendChild(js);
}
