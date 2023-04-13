// Server
type Interval = { min: number; max: number };
type Result = {
    suggestion: string;
    auxiliary?: string;
}

function getRandomString(length: number) {
  const characterChoices =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ";
  const characters = [];
  while (characters.length < length) {
    const randomIndex = Math.floor(Math.random() * characterChoices.length);
    characters.push(characterChoices[randomIndex]);
  }
  return characters.join("");
}

function getRandomInteger(interval: Interval): number {
  return Math.floor(
    Math.random() * (interval.max - interval.min) + interval.min
  );
}

function generateSuggestion(prefix: string) {
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

function getAutocompleteHandler(data: string) {
  const MAX_CHARS = 10;
  const NUM_AUTOCOMPLETE_RESULTS = 10;
  const RATIO_AUXILIARY_DATA = 0.1;

  if (data.length > MAX_CHARS) {
    return [];
  }

  const results: Array<Result> = [];
  while (results.length < NUM_AUTOCOMPLETE_RESULTS) {
    const suggestion = generateSuggestion(data);
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
    } else {
      results.push({ suggestion, auxiliary: "" });
    }
  }
  return results;
}