const fs = require('fs');
const path = require('path');
const TailwindConfig = require('../tailwind.config');

const outPath = path.join(__dirname, '../assets/styles/01.settings/_tailwind-theme-variables.scss');
const resolveConfig = require('tailwindcss/lib/util/resolveConfig');

// If the file exists, delete it.
fs.unlink(outPath, (err) => {
    if (err && err.code !== 'ENOENT') return console.error(err);

    const { theme } = resolveConfig.default([TailwindConfig]);

    for (const configKey in theme) {
        const object = theme[configKey];
        Object.keys(object).forEach((key) => {
            const value = object[key];
            if (typeof value === 'object') {
                Object.keys(value).forEach((childKey) => {
                    const childValue = value[childKey];
                    const keyName = `${normalizeKey(key)}-${normalizeKey(childKey)}`;
                    const line = `$${configKey}-${keyName}: ${childValue};\n`;

                    fs.appendFileSync(outPath, line);
                    console.log(`wrote ${configKey} ${key}`);
                });
            } else {
                const keyName = normalizeKey(key);
                const line = `$${configKey}-${keyName}: ${value};\n`;

                fs.appendFileSync(outPath, line);
                console.log(`wrote ${configKey} ${key}`);
            }
        });

        fs.appendFileSync(outPath, '\n', (err) => {
            if (err) return console.error(err);
        });
    }
});

function normalizeKey(key) {
    return key.replace('/', '_');
}
