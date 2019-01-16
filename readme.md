# Develop “news application” that provides basic functionality: add, get, edit, delete news using node.js and express framework.

## Part 1:
1. Install NodeJS. Use npm to install express framework to your project folder.

2. Implement and run simple web-server which will always return JSON of fixed news entities (any route, any request).

3. Extend web-server functionality from #2. Use Rest API to implement CRUD operations endpoints for news articles. You can log on console all operations until part 2. Use postman, curl or any other tool to test your endpoints.

Example of routes:
* GET /news
* GET /news/{id}
* POST /news
* PUT /news/{id}
* DELETE /news/{id}

4. Implement error handling middleware which will send an error without stack trace to the client. Use any express view engine to wrap an error.

## Advanced:
1. All frameworks and libraries that used in project should be added to package.json.
2. Application (node.js server) should launch with command “npm start”.
3. Add simple logging mechanism to write URL and Date info to file per each request (try https://github.com/winstonjs/winston or any other library).
