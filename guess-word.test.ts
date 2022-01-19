import { describe } from 'jest-circus';
import { normalizeCorrectIndex, normalizePresentIndex } from './guess-word';

describe('normalizeSurveyResults', () => {
  describe('normalizeCorrectIndex', () => {
    it('should transcribe survey results into indexes', () => {
      expect(
        normalizeCorrectIndex({
          letter0: 'green',
          letter1: 'gray',
          letter2: 'gray',
          letter3: 'gray',
          letter4: 'green',
        })
      ).toEqual(
        [true, false, false, false, true]
      );
    });
  });

  describe('normalizePresentIndex', () => {
    it('should transcribe survey results into indexes', () => {
      expect(
        normalizePresentIndex({
          letter0: 'yellow',
          letter1: 'gray',
          letter2: 'green',
          letter3: 'gray',
          letter4: 'yellow',
        })
      ).toEqual(
        [true, false, false, false, true]
      );
    });
  });
});
