process.env.NODE_ENV = 'test';
const app = require('../app');
const connection = require('../db/connections');
const supertest = require('supertest');
const { expect } = require('chai');
const request = supertest(app);
const chaiSorted = require('chai-sorted');
const chai = require('chai');
chai.use(chaiSorted);

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
          expect(response.body.user[0]).to.contain.keys(
            'username',
            'avatar_url',
            'name'
          );
          // console.log(response.body.user[0]);
        });
    });
  });
  describe('/articles', () => {
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
    it('PATCH 202 /: article_id able to update the votes property in the database', () => {
      return request
        .patch('/api/articles/1')
        .expect(202)
        .send({ inc_vote: 1 })
        .then(response => {
          expect(response.body.votes).to.equal(101);
        });
    });
    it.only('POST 201 /:article_id/comments lets you post a comment to an article', () => {
      return request
        .post('/api/articles/1/comments')
        .expect(201)
        .send({ username: 'rogersop', body: 'shut up you bloody guy' })
        .then(response => {
          expect(response.body).to.contain.keys(
            'comment_id',
            'body',
            'author',
            'updated_at',
            'votes',
            'created_at',
            'article_id'
          );
        });
    });
  });
});
