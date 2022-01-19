import wordnet from 'wordnet';
import ora from 'ora';
import chalk from 'chalk';
import { guessWord, Result } from './guess-word';
import { filterWords } from './filter-words';

async function getAllWords() {
  await wordnet.init();
  return wordnet.list();
}

async function getFiveLetterWords() {
  const allWords = await getAllWords();
  return allWords.filter((word) => word.match(/^[a-zA-Z]{5}$/));
}

async function init() {
  return await getFiveLetterWords();
}

function pickRandomly(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function logResults(results: Result[]) {
  const line = [];
  results.forEach((result) => {
    let color;
    if (result.isPresent) {
      color = chalk.yellow;
    } else if (result.isCorrect) {
      color = chalk.green;
    } else {
      color = chalk.white;
    }
    line.push(`${color(result.letter)}  `);
  });
  console.log(...line);
}

function logResultList(resultList: Result[][]) {
  console.log('');
  resultList.forEach((list) => logResults(list));
}

function isLastResultCorrect(results: Result[][]): boolean {
  return results.length > 0 && results[results.length - 1].every(item => item.isCorrect);
}

async function solve() {
  const spinner = ora('Initializing...').start();
  const words = await init();
  spinner.succeed('Initialized');

  let filteredWords = words;
  let guess;
  let results;
  const resultList = [];

  for (let guessIdx = 0; guessIdx < 6; guessIdx++) {
    if (isLastResultCorrect(resultList)) {
      console.log('We did it! Nice work.');
      break;
    }

    if (filteredWords.length === 0) {
      console.log('No words remain, I can\'t solve it!');
      break;
    }

    console.log(`${filteredWords.length} possible words remain`);

    guess = pickRandomly(filteredWords);
    delete filteredWords[filteredWords.indexOf(guess)];
    console.log(`Type this: ${chalk.white(guess)}`);
    results = await guessWord(guess);
    resultList.push(results);
    logResultList(resultList);

    filteredWords = filterWords(filteredWords, results);
  }
}

solve();
