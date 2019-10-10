process.env.NODE_ENV = 'test';
const app = require('../app');
const connection = require('../db/connections');
const supertest = require('supertest');
const { expect } = require('chai');
const request = supertest(app);
const chaiSorted = require('chai-sorted');
const chai = require('chai');
chai.use(chaiSorted);

describe('/not-valid-route', () => {
  it('returns a 404 error when an invalid route is used', () => {
    return request
      .get('/hellocheeky')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).to.equal('route not found');
      });
  });
});

describe('/api', () => {
  beforeEach(() => connection.seed.run());
  after(() => {
    return connection.destroy();
  });
  describe('/topics', () => {
    it('GET / 200 returns all of the topics in an object with a key name of what is being sent', () => {
      return request
        .get('/api/topics')
        .expect(200)
        .then(response => {
          // console.log(response.body);
          expect(response.body).to.be.an('object');
          expect(response.body).to.contain.keys('topics');
          expect(response.body.topics[0]).to.contain.keys(
            'slug',
            'description'
          );
        });
    });
  });
  describe('/users', () => {
    it('GET /:username 200 returns user with selected username', () => {
      return request
        .get('/api/users/rogersop')
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an('object');
          expect(response.body).to.contain.keys('user');
          expect(response.body.user).to.contain.keys(
            'username',
            'avatar_url',
            'name'
          );
        });
    });
    it('GET 400 returns message saying username does not exist', () => {
      return request
        .get('/api/users/123')
        .expect(404)
        .then(response => {
          expect(response.body.msg).to.equal('Username does not exist');
        });
    });
  });
  describe('/articles', () => {
    it('GET returns all articles', () => {
      return request
        .get('/api/articles')
        .expect(200)
        .then(response => {
          // console.log(response.body.articles);
          expect(response.body.articles[0]).to.contain.keys(
            'author',
            'title',
            'article_id',
            'topic',
            'created_at',
            'votes',
            'comment_count'
          );
        });
    });
    it('GET 200 / defaults to sorting by date, descending', () => {
      return request
        .get('/api/articles')
        .expect(200)
        .then(response => {
          // console.log(response.body.articles)
          expect(response.body.articles).to.be.descendingBy('created_at');
        });
    });
    it('GET 200 /sortby=query&order=query lets you choose order and sortby columns', () => {
      return request
        .get('/api/articles?sort_by=author&order=asc')
        .expect(200)
        .then(response =>
          expect(response.body.articles).to.be.ascendingBy('author')
        );
    });
    // it('GET 200 ERROR sends error message when trying to order by not ascending or dexcending', () => {
    //   return request
    //     .get('/api/articles?order=charleston')
    //     .expect(400)
    //     .then(response => {
    //       expect(response.body.msg).to.equal(
    //         'Please sort by ascending or descending'
    //       );
    //     });
    // });
    it('GET ERROR sends error message when trying to sort by a column not present', () => {
      return request
        .get('/api/articles?sort_by=spongebob')
        .expect(400)
        .then(response => {
          expect(response.body.msg).to.equal(
            'Search value does not exist in table'
          );
        });
    });
    it('GET 200 /author=:authorname lets you filter all of an authors articles', () => {
      return request
        .get('/api/articles?author=rogersop')
        .expect(200)
        .then(response => {
          // console.log(response.body);
          expect(response.body.articles[0].author).to.deep.equal('rogersop');
        });
    });
    it('GET ERROR /author = not_an_author', () => {
      return request
        .get('/api/articles?author=krishan')
        .expect(404)
        .then(response => {
          expect(response.body.msg).to.equal('Author does not exist');
        });
    });
    it('GET 200 /topic=:topicname lets you filter all of the given topic', () => {
      return request
        .get('/api/articles?topic=mitch')
        .expect(200)
        .then(response => {
          // console.log(response.body.articles, '***');
          expect(response.body.articles[0].topic).to.deep.equal('mitch');
        });
    });
    describe('/:article_id', () => {
      describe('/comments', () => {
        it('POST 201 /comments lets you post a comment to an article', () => {
          return request
            .post('/api/articles/1/comments')
            .expect(201)
            .send({ username: 'rogersop', body: 'shut up you bloody guy' })
            .then(response => {
              expect(response.body[0]).to.have.keys(
                'comment_id',
                'body',
                'author',
                'votes',
                'created_at',
                'article_id'
              );
            });
        });
        it('POST ERROR 404 trying to post a comment to an article that doesnt exist', () => {
          return request
            .post('/api/articles/1000/comments')
            .expect(404)
            .send({ username: 'rogersop', body: 'shut up you bloody guy' })
            .then(response => {
              expect(response.body.msg).to.equal('article doesnt exist');
            });
        });
        // it('POST ERROR trying to post a comment missing an article_id', () => {
        //   return request
        //     .post('/api/articles/comments')
        //     .expect(400)
        //     .send({ username: 'rogersop', body: 'shut up you bloody guy' })
        //     .then(response => {
        //       console.log(response.body.msg);
        //     });
        // });
        it('GET 200 /comments returns an array of comments for the article', () => {
          return request
            .get('/api/articles/9/comments')
            .expect(200)
            .then(response => {
              // console.log(response.body.comments, 'in spec');
              expect(response.body.comments[0]).to.contain.keys(
                'comment_id',
                'votes',
                'created_at',
                'author',
                'body'
              );
              expect(response.body.comments).to.have.length(2);
            });
        });
        it('GET 200 /comments?sortby=query defaults to sorting by created_at, descending', () => {
          return request
            .get('/api/articles/1/comments')
            .expect(200)
            .then(response => {
              // console.log(response.body);
              expect(response.body.comments).to.be.descendingBy('created_at');
            });
        });
        it('GET ERROR returns error message for ');
      });
      it('GET /: article_id returns article with input article id', () => {
        return request
          .get('/api/articles/1')
          .expect(200)
          .then(response => {
            expect(response.body).to.be.an('object');
            expect(response.body).to.contain.keys('article');
            expect(response.body.article[0].comment_count).to.equal('13');
            expect(response.body.article[0]).to.contain.keys(
              'author',
              'title',
              'article_id',
              'body',
              'topic',
              'created_at',
              'votes',
              'comment_count'
            );
          });
      });
      it('PATCH 202 able to update the votes property in the database', () => {
        return request
          .patch('/api/articles/1')
          .expect(202)
          .send({ inc_vote: 1 })
          .then(response => {
            expect(response.body.votes).to.equal(101);
          });
      });
      it('GET 200 queries can be used to change what is sorted and by asc or desc', () => {
        return request
          .get('/api/articles/1/comments?sort_by=author&order=asc')
          .expect(200)
          .then(response => {
            expect(response.body.comments).to.be.ascendingBy('author');
          });
      });
    });
  });
  describe('/comments', () => {
    describe('/:comment_id', () => {
      it('PATCH 202 /:comment_id able to update the votes property of a comment', () => {
        return request
          .patch('/api/comments/1')
          .expect(202)
          .send({ inc_votes: 1 })
          .then(response => {
            expect(response.body.votes).to.equal(15);
          });
      });
      it('DELETE 204 /: comment_id deletes a comment', () => {
        return request.delete('/api/comments/1').expect(204);
      });
    });
  });
});
