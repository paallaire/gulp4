/* eslint-disable func-names */
const _ = require('lodash');

module.exports = function ({ variants = ['responsive'] }) {
    return function ({ e, addUtilities, config }) {
        const utilities = _.map(config('theme.ratios'), (value, name) => ({
            [`.${e(`aspect-ratio-${name}`)}`]: {
                paddingTop: `${(value)}`,
            },
        }));

        addUtilities(utilities, variants);
    };
};
