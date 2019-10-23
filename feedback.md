## Test Output
Read through all errors. Note that any failing test could be caused by a problem uncovered in a previous test on the same endpoint.


### PATCH `/api/articles/1`
Assertion: expected 200 to equal 400
Hints:
- use a 400: Bad Request status code when sent an invalid `inc_votes` value


### DELETE `/api`
Assertion: expected 404 to equal 405
Hints:
- use `.all()` on each route, to serve a 405: Method Not Found status code