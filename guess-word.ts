import inquirer from 'inquirer';

export interface Result {
  letter: string;
  isCorrect: boolean;
  isPresent: boolean;
}

export function normalizeCorrectIndex(surveyResults) {
  const isGreen = (input => input === 'green')
  return Object.values(surveyResults).map(isGreen)
}

export function normalizePresentIndex(surveyResults) {
  const isYellow = (input => input === 'yellow')
  return Object.values(surveyResults).map(isYellow)
}

export async function guessWord(word): Promise<Result[]> {
  const surveyResult = await inquirer.prompt(word.split('').map((letter, idx) => (
    {
      name: `letter${idx}`,
      message: `What color is ${letter}?`,
      type: 'list',
      choices: [
        'gray',
        'green',
        'yellow'
      ],
      default: 0
    }
  )))

  const correctIndex = normalizeCorrectIndex(surveyResult);
  const presentIndex = normalizePresentIndex(surveyResult);

  return word.split('').map((letter, idx) => ({
    letter,
    isCorrect: correctIndex[idx],
    isPresent: presentIndex[idx],
  }));
}
