const processCommand = require('./controllers');

processCommand()
  .then((msg) => {
    process.exit();
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
