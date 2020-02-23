const paddingUnits = {};
const multiplicator = 5;

for (let i = 1; i <= 100; i++) {
    paddingUnits[i] = `${i * multiplicator}px`;
}

module.exports = paddingUnits;
