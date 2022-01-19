import { filterWords } from './filter-words';
import { Result } from './guess-word';

describe('filter words', () => {
  it('should exclude words without correct letters', () => {
    const words = ['abcde', 'abcdf'];
    const results: Result[] = [
      {
      letter: 'q',
      isCorrect: false,
      isPresent: false
    },
      {
        letter: 'q',
        isCorrect: false,
        isPresent: false
      },
      {
        letter: 'q',
        isCorrect: false,
        isPresent: false
      },
      {
        letter: 'q',
        isCorrect: false,
        isPresent: false
      },
      {
        letter: 'e',
        isCorrect: true,
        isPresent: false
      }
    ]
    expect(filterWords(words, results)).toEqual(['abcde'])
  })

  it('should exclude words without present letters', () => {
    const words = ['abcde', 'abcdf'];
    const results: Result[] = [
      {
        letter: 'q',
        isCorrect: false,
        isPresent: false
      },
      {
        letter: 'q',
        isCorrect: false,
        isPresent: false
      },
      {
        letter: 'q',
        isCorrect: false,
        isPresent: false
      },
      {
        letter: 'e',
        isCorrect: false,
        isPresent: true
      },
      {
        letter: 'q',
        isCorrect: false,
        isPresent: false
      }
    ]
    expect(filterWords(words, results)).toEqual(['abcde'])
  })

  it('should include words when results have no matches', () => {
    const words = ['abcde', 'abcdf'];
    const results: Result[] = [
      {
        letter: 'q',
        isCorrect: false,
        isPresent: false
      },
      {
        letter: 'q',
        isCorrect: false,
        isPresent: false
      },
      {
        letter: 'q',
        isCorrect: false,
        isPresent: false
      },
      {
        letter: 'q',
        isCorrect: false,
        isPresent: false
      },
      {
        letter: 'q',
        isCorrect: false,
        isPresent: false
      }
    ]
    expect(filterWords(words, results)).toEqual(['abcde', 'abcdf'])
  })

  it('should exclude words when present letters are absent', () => {
    const words = ['abcde', 'abcdf'];
    const results: Result[] = [
      {
        letter: 'q',
        isCorrect: false,
        isPresent: false
      },
      {
        letter: 'f',
        isCorrect: false,
        isPresent: true
      },
      {
        letter: 'q',
        isCorrect: false,
        isPresent: false
      },
      {
        letter: 'q',
        isCorrect: false,
        isPresent: false
      },
      {
        letter: 'q',
        isCorrect: false,
        isPresent: false
      }
    ]
    expect(filterWords(words, results)).toEqual(['abcdf'])
  })
});
