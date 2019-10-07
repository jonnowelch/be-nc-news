const { expect } = require('chai');
const {
  formatDates,
  makeRefObj,
  formatComments
} = require('../db/utils/utils');

describe('formatDates', () => {
  it('should return an empty array if passed an empty array', () => {
    const input = [];
    const actual = formatDates(input);
    const expected = [];
    expect(actual).to.deep.equal(expected);
  });
  it('should format date when passed an array containing object with a created_at timestamp', () => {
    const input = [{ created_at: 1511354163389 }];
    const actual = formatDates(input);
    expect(actual[0].created_at).to.be.an.instanceOf(Date);
  });
  it('should alter the created_at value in an object with several properties and not alter the key names', () => {
    const input = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: 'butter_bridge',
        votes: 16,
        created_at: 1511354163389
      }
    ];
    const actual = formatDates(input);
    expect(actual[0].created_at).to.be.an.instanceOf(Date);
    expect(actual[0]).to.contain.keys(
      'body',
      'belongs_to',
      'created_by',
      'votes',
      'created_at'
    );
  });
  it('should work on an array with mutliple objects inside', () => {
    const input = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: 'butter_bridge',
        votes: 16,
        created_at: 1511354163389
      },
      {
        body:
          'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
        belongs_to: 'Living in the shadow of a great man',
        created_by: 'butter_bridge',
        votes: 14,
        created_at: 1479818163389
      }
    ];
    const actual = formatDates(input);
    expect(actual[0].created_at).to.be.an.instanceOf(Date);
    expect(actual[0]).to.contain.keys(
      'body',
      'belongs_to',
      'created_by',
      'votes',
      'created_at'
    );
  });
  it('shouldnt mutate the original array', () => {
    const input = [{ created_at: 1511354163389 }];
    formatDates(input);
    expect(input).to.deep.equal([{ created_at: 1511354163389 }]);
  });
});

describe('makeRefObj', () => {});

describe('formatComments', () => {});
