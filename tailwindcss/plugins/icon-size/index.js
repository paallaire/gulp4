/* eslint-disable func-names */
const _ = require('lodash');

module.exports = function ({ variants = ['responsive'] }) {
    return function ({ e, addUtilities, config }) {
        const utilities = _.map(config('theme.iconSize'), (value, key) => ({
            [`.${e(`icon-size-${key}`)}`]: {
                'font-size': `${value}`,
            },
        }));

        addUtilities(utilities, variants);
    };
};
