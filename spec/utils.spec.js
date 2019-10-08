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

describe('makeRefObj', () => {
  it('will return an empty object when passed an empty array', () => {
    const input = [];
    const actual = makeRefObj(input);
    const expected = {};
    expect(actual).to.deep.equal(expected);
  });
  it('will return a refobj in the correct format for an array with one object in', () => {
    const input = [
      {
        article_id: 12,
        title: 'Moustache'
      }
    ];
    const actual = makeRefObj(input, 'article_id', 'title');
    const expected = { Moustache: 12 };
    // console.log(actual);
    expect(actual).to.deep.equal(expected);
  });
  it('will work on an array containing multiple objects with multiple key value pairs', () => {
    const input = [
      {
        article_id: 1,
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: 1542284514171,
        votes: 100
      },
      {
        article_id: 2,
        title: 'Sony Vaio; or, The Laptop',
        topic: 'mitch',
        author: 'icellusedkars',
        body:
          'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
        created_at: 1416140514171
      }
    ];
    const actual = makeRefObj(input, 'article_id', 'title');
    const expected = {
      'Living in the shadow of a great man': 1,
      'Sony Vaio; or, The Laptop': 2
    };
    expect(actual).to.deep.equal(expected);
  });
  it('doesnt mutate the original array', () => {
    const input = [
      {
        article_id: 2,
        title: 'Sony Vaio; or, The Laptop',
        topic: 'mitch',
        author: 'icellusedkars',
        created_at: 1416140514171
      }
    ];
    makeRefObj(input, 'article_id', 'title');
    expect(input).to.deep.equal([
      {
        article_id: 2,
        title: 'Sony Vaio; or, The Laptop',
        topic: 'mitch',
        author: 'icellusedkars',
        created_at: 1416140514171
      }
    ]);
  });
});

describe('formatComments', () => {
  it('should return an empty array when passed an empty array', () => {
    const input = [];
    const refObj = {};
    const actual = formatComments(input, refObj);
    const expected = [];
    expect(actual).to.deep.equal(expected);
  });
  it('should rename created_by to author, belongs_to to article_id, article_id vlaue should be original article_id, created_at should be a javascript date object and the other properties hsould be maintained', () => {
    const input = [
      {
        body: 'words',
        belongs_to: 'hello',
        created_by: 'tickle122',
        votes: -1,
        created_at: 1468087638932
      }
    ];
    const refObj = {
      hello: 12
    };
    const actual = formatComments(input, refObj);
    const expected = [
      {
        body: 'words',
        article_id: 12,
        author: 'tickle122',
        votes: -1,
        created_at: new Date(1468087638932)
      }
    ];
    expect(actual).to.deep.equal(expected);
  });
  it('should work on an array with multiple comment objects', () => {
    const input = [
      {
        body: 'words',
        belongs_to: 'author',
        created_by: 'tickle122',
        votes: -1,
        created_at: 1468087638932
      },
      {
        body: 'words2',
        belongs_to: 'author2',
        created_by: 'person',
        votes: 7,
        created_at: 1468087638936
      }
    ];
    const refObj = {
      author: 1,
      author2: 2
    };
    const actual = formatComments(input, refObj);
    const expected = [
      {
        body: 'words',
        article_id: 1,
        author: 'tickle122',
        votes: -1,
        created_at: new Date(1468087638932)
      },
      {
        body: 'words2',
        article_id: 2,
        author: 'person',
        votes: 7,
        created_at: new Date(1468087638936)
      }
    ];
    expect(actual).to.deep.equal(expected);
  });
  it('doesnt mutate the original input', () => {
    const input = [
      {
        body: 'words',
        belongs_to: 'hello',
        created_by: 'tickle122',
        votes: -1,
        created_at: 1468087638932
      }
    ];
    const refobj = {};
    formatComments(input, refobj);
    expect(input).to.deep.equal([
      {
        body: 'words',
        belongs_to: 'hello',
        created_by: 'tickle122',
        votes: -1,
        created_at: 1468087638932
      }
    ]);
  });
});
