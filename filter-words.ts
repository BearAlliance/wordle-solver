import { Result } from './guess-word';

export function filterWords(words: string[], results: Result[]) {
  return words.filter(word => {
    return results.every((result, idx) => {
      if(result.isCorrect) {
        return word.charAt(idx) === result.letter;
      }
      if (result.isPresent) {
        return word.includes(result.letter);
      }
      return true;
    })
  })
}
