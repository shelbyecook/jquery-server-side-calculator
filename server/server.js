const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//This serves the static files.
app.use(express.static('server/public'));

app.listen(5000, () => {
  console.log(`Listening on port 5000!`);
});
