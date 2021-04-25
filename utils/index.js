function modulo(a, b) {
    return ((a % b) + b) % b;
}

export function vigeneredHexSolver(cipher) {
    const letters = cipher
        .toLowerCase()
        .split('')
        .filter(c => c >= 'a' && c <= 'z');

    if (letters.length === 0) {
        return [];
    }

    const letterCodes = letters.map(c => c.charCodeAt(0) - 97);

    const combinations = letterCodes.map(letter =>
        new Array(6)
            .fill(0)
            .map((_, i) => String.fromCharCode(modulo(letter - i, 26) + 97))
    );

    const combinationKeyLens = combinations.map((combination, i) => {
        return combination
            .map(c => {
                const keylens = [];
                for (let keylen = 2; keylen <= 13; keylen++) {
                    if (keylen + i >= combinations.length) {
                        continue;
                    }
                    let possible = true;
                    for (
                        let j = keylen + i;
                        j < combinations.length;
                        j += keylen
                    ) {
                        if (!combinations[j].includes(c)) {
                            possible = false;
                            break;
                        }
                    }
                    if (possible) {
                        keylens.push(keylen);
                    }
                }
                return { letter: c, keylens };
            })
            .filter(({ keylens }) => keylens.length > 0);
    });

    const potentialSolutions = [];
    for (let keylen = 2; keylen <= 13; keylen++) {
        const wordCombinations = [];
        for (let i = 0; i < keylen; i++) {
            const combinations = combinationKeyLens[i] || [];
            const letters = [];
            wordCombinations.push(letters);
            combinations.forEach(({ letter, keylens }) => {
                if (keylens.includes(keylen)) {
                    letters.push(letter);
                }
            });
        }
        if (!wordCombinations.find(letters => letters.length === 0)) {
            potentialSolutions.push(wordCombinations);
        }
    }

    return potentialSolutions;
}
