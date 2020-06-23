# Task-it
Task-it is a Express web-service that keeps track of personal tasks

# Installation
Make sure you have Node and NPM installed. You will also need [MangoDB](https://www.mongodb.com/) database to hook up.

1. clone repository
```bash
git clone https://github.com/Carlos460/task-it.git
```
2. Install Dependencies
```bash
npm install

```
3. Make and connect [MangoDB](https://www.mongodb.com/) database.
```javascript
mongoose.connect(
  <YOUR_KEY_GOES_HERE>,
  // {Mongoose Config Stuff},
  // Some JS Code
);
```
note: If you want to upload your own changes to a repository, remember to use a .env file with the [dotenv](https://www.npmjs.com/package/dotenv) dependency to keep your key safe!

4. Run script to start server with nodemon!
```git
npm start
```
