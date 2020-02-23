import WebFont from 'webfontloader'; // https://github.com/typekit/webfontloader

export default function () {
    WebFont.load({
        google: {
            families: ['Playfair+Display:400,500,700,800', 'Nunito+Sans:300,400,400'],
        },
    });
}
