const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//data structure
const history = [
  // {
  //   mathVal1: '',
  //   mathVal2: '',
  //   mathOperator: '',
  //   solution: ''
  // }
];

//GET of equation history tested on Postman
app.get('/api/equation-history', (req, res) => {
  res.send(history);
});

//This serves the static files.
app.use(express.static('server/public'));

app.listen(5000, () => {
  console.log(`Listening on port 5000!`);
});
