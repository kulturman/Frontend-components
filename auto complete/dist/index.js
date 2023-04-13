"use strict";
const searchBarInput = document.querySelector('.search__bar__input');
const suggestionsElement = document.querySelector('.search__suggestions__list');
searchBarInput === null || searchBarInput === void 0 ? void 0 : searchBarInput.addEventListener('input', e => {
    const input = e.target;
    const inputValue = input.value;
    //Let's just simulate an HTTP call, backend is not the important thing here
    setTimeout(() => {
        onSuggestionsLoaded(getAutocompleteHandler(inputValue));
    }, 1000);
});
function wrapBoldedCharacters(inputValue, suggestion) {
    if (suggestion.startsWith(inputValue)) {
        return `${suggestion.substring(0, inputValue.length)}<b>${suggestion.substring(inputValue.length, suggestion.length)}</b>`;
    }
    return `<b>${suggestion}</b>`;
}
function onSuggestionsLoaded(suggestions) {
    console.log(suggestions);
    if (suggestions.length > 0) {
        suggestionsElement.classList.add('search__actions--autosuggest');
    }
    else {
        suggestionsElement.classList.remove('search__actions--autosuggest');
    }
    suggestionsElement.innerHTML = suggestions.map(suggestion => createSuggestionListElement(suggestion)).join('');
}
function createSuggestionListElement(suggestion) {
    return `<li>${wrapBoldedCharacters(searchBarInput.value, suggestion.suggestion) + (suggestion.auxiliary ? ' - ' + suggestion.auxiliary : '')}</li>`;
}
function getRandomString(length) {
    const characterChoices = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ";
    const characters = [];
    while (characters.length < length) {
        const randomIndex = Math.floor(Math.random() * characterChoices.length);
        characters.push(characterChoices[randomIndex]);
    }
    return characters.join("");
}
function getRandomInteger(interval) {
    return Math.floor(Math.random() * (interval.max - interval.min) + interval.min);
}
function generateSuggestion(prefix) {
    const RATIO_EXACT_MATCH = 0.3;
    const RATIO_AUTOCORRECT = 0.1;
    if (Math.random() < RATIO_AUTOCORRECT) {
        return getRandomString(getRandomInteger({ min: 1, max: prefix.length }));
    }
    if (Math.random() < RATIO_EXACT_MATCH) {
        return prefix;
    }
    return prefix + getRandomString(getRandomInteger({ min: 1, max: 10 }));
}
function getAutocompleteHandler(inputValue) {
    const MAX_CHARS = 10;
    const NUM_AUTOCOMPLETE_RESULTS = 10;
    const RATIO_AUXILIARY_DATA = 0.1;
    if (inputValue.length > MAX_CHARS || inputValue.length <= 0) {
        return [];
    }
    const results = [];
    while (results.length < NUM_AUTOCOMPLETE_RESULTS) {
        const suggestion = generateSuggestion(inputValue);
        if (results.find((result) => result.suggestion === suggestion)) {
            continue;
        }
        if (Math.random() < RATIO_AUXILIARY_DATA) {
            for (let i = 0; i < 2; i++) {
                results.push({
                    suggestion,
                    auxiliary: getRandomString(getRandomInteger({ min: 5, max: 15 })),
                });
            }
        }
        else {
            results.push({ suggestion, auxiliary: "" });
        }
    }
    return results;
}
//# sourceMappingURL=index.js.map