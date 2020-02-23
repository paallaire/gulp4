const fontSizeUnit = {};
const multiplicator = 2;

for (let i = 1; i <= 50; i++) {
    fontSizeUnit[i] = `${i * multiplicator}px`;
}

module.exports = fontSizeUnit;
