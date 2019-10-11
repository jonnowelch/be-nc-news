## Test Output

​
Read through all errors. Note that any failing test could be caused by a problem uncovered in a previous test on the same endpoint.
​

### GET `/api/articles?author=lurker`

​
Assertion: expected 404 to equal 200
​
Hints:

- give a 200 status and an empty array when articles for a topic that does exist, but has no articles is requested
- use a separate model to check whether the user exists
  ​
  ​

### GET `/api/articles?topic=paper`

​
Assertion: expected 404 to equal 200
​
Hints:

- give a 200 status and an empty array when articles for a topic that does exist, but has no articles is requested
- use a separate model to check whether the topic exists
  ​
  ​

### GET `/api/articles/1`

​
Assertion: expected [ Array(1) ] to be an object
​
Hints:

- send the article to the client in an object, with a key of `article`: `{ article: {} }`
- return the single article in an object, not in an array
- ensure there are no discrepancies between the README specification and your table column names
  ​
  ​

### GET `/api/articles/2`

​
Assertion: expected undefined to equal 0
​
Hints:

- default the vote column to `0` in the migration
- article with article_id 2 has no comments, you may need to check your join
  ​
  ​

### GET `/api/articles/1`

​
Assertion: expected undefined to equal '13'
​
Hints:

- ensure you have calculated a comment_count for the article
  ​
  ​

### GET `/api/articles/1000`

​
Assertion: expected 200 to equal 404
​
Hints:

- if an article is not found with a valid `article_id`, use a 404: Not Found status code
  ​
  ​

### GET `/api/articles/dog`

​
Assertion: expected 500 to equal 400
​
Hints:

- if send an invalid `article_id`, use a 400: Bad Request status code
  ​
  ​

### PATCH `/api/articles/1`

​
Assertion: expected 202 to equal 200
​
Hints:

- use a 200: OK status code for successful `patch` requests
  ​
  ​

### PATCH `/api/articles/1`

​
Assertion: expected { Object (article_id, title, ...) } to contain key 'article'
​
Hints:

- send the updated article with a key of `article`
  ​
  ​

### PATCH `/api/articles/1`

​
Assertion: Cannot read property 'votes' of undefined
​
Hints:

- increment / decrement the `votes` of the specified article with the knex method **`increment`**
  ​
  ​

### PATCH `/api/articles/1`

​
Assertion: expected 202 to equal 200
​
Hints:

- ignore a `patch` request with no information in the request body, and send the unchanged article to the client
- provide a default argument of `0` to the `increment` method, otherwise it will automatically increment by 1
  ​
  ​

### PATCH `/api/articles/1`

​
Assertion: expected 202 to equal 400
​
Hints:

- use a 400: Bad Request status code when sent an invalid `inc_votes` value
  ​
  ​

### GET `/api/articles/1000/comments`

​
Assertion: expected 200 to equal 404
​
Hints:

- return 404: Not Found when given a valid `article_id` that does not exist
  ​
  ​

### GET `/api/articles/not-a-valid-id/comments`

​
Assertion: **ERROR WITH NO CATCH: CHECK YOUR CONTROLLERS!**
​
​
​

### GET `/api/articles/1/comments?sort_by=not-a-valid-column`

​
Assertion: **ERROR WITH NO CATCH: CHECK YOUR CONTROLLERS!**
​
​
​

### POST `/api/articles/1/comments`

​
Assertion: expected [ Array(1) ] to be an object
​
Hints:

- send the new comment back to the client in an object, with a key of comment: `{ comment: {} }`
- ensure all columns in the comments table match the README
  ​
  ​

### POST `/api/articles/1/comments`

​
Assertion: Cannot read property 'votes' of undefined
​
Hints:

- default `votes` to `0` in the migrations
- default `created_at` to the current time in the migrations
  ​
  ​

### POST `/api/articles/1/comments`

​
Assertion: expected 500 to equal 400
​
Hints:

- use a 400: Bad Request status code when `POST` request does not include all the required keys
- use `notNullable` in migrations for required columns
  ​
  ​

### POST `/api/articles/not-a-valid-id/comments`

​
Assertion: expected 500 to equal 400
​
Hints:

- use a 400: Bad Request when `POST` contains an invalid article_id
  ​
  ​

### PATCH `/api/comments/1`

​
Assertion: expected 202 to equal 200
​
Hints:

- use a 200: OK status code for successful `patch` requests
  ​
  ​

### PATCH `/api/comments/1`

​
Assertion: expected { Object (comment_id, author, ...) } to contain key 'comment'
​
Hints:

- send the updated comment back to the client in an object, with a key of comment: `{ comment: {} }`
  ​
  ​

### PATCH `/api/comments/1`

​
Assertion: Cannot read property 'votes' of undefined
​
Hints:

- increment / decrement the `votes` of the specified article with the knex method **`increment`**
  ​
  ​

### PATCH `/api/comments/1`

​
Assertion: **ERROR WITH NO CATCH: CHECK YOUR CONTROLLERS!**
​
​
​

### PATCH `/api/comments/1`

​
Assertion: expected 202 to equal 200
​
Hints:

- use 200: OK status code when sent a body with no `inc_votes` property
- send an unchanged comment when no `inc_votes` is provided in the request body
  ​
  ​

### PATCH `/api/comments/1000`

​
Assertion: expected 202 to equal 404
​
Hints:

- use a 404: Not Found when `PATCH` contains a valid comment_id that does not exist
  ​
  ​

### PATCH `/api/comments/not-a-valid-id`

​
Assertion: **ERROR WITH NO CATCH: CHECK YOUR CONTROLLERS!**
​
​
​

### PATCH `/api/comments/1`

​
Assertion: **ERROR WITH NO CATCH: CHECK YOUR CONTROLLERS!**
​
​
​

### DELETE `/api/comments/1000`

​
Assertion: expected 204 to equal 404
​
Hints:

- use a 404: Not Found when `DELETE` contains a valid comment_id that does not exist
  ​
  ​

### DELETE `/api/comments/not-a-number`

​
Assertion: **ERROR WITH NO CATCH: CHECK YOUR CONTROLLERS!**
​
​
​

### DELETE `/api`

​
Assertion: expected 404 to equal 405
​
Hints:

- use `.all()` on each route, to serve a 405: Method Not Found status code
