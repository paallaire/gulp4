export default function ($element) {
    let height = 0;

    $element.style.display = 'block'; // Make it visible
    height = `${$element.scrollHeight}px`; // Get it's height
    $element.style.display = ''; //  Hide it again

    return height;
}
