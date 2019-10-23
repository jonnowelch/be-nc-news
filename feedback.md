## Test Output
Read through all errors. Note that any failing test could be caused by a problem uncovered in a previous test on the same endpoint.


### PATCH `/api/articles/1`
Assertion: expected 200 to equal 400
Hints:
- use a 400: Bad Request status code when sent an invalid `inc_votes` value

### GET `/api/articles/2/comments`
Assertion: expected 404 to equal 200
Hints:
- return 200: OK when the article exists
- serve an empty array when the article exists but has no comments


### PATCH `/api/comments/1000`
Assertion: expected 200 to equal 404
Hints:
- use a 404: Not Found when `PATCH` contains a valid comment_id that does not exist

### DELETE `/api`
Assertion: expected 404 to equal 405
Hints:
- use `.all()` on each route, to serve a 405: Method Not Found status code