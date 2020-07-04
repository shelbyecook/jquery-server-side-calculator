const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //allows us to test on Postman

//data structure
const history = [
  // {
  //   mathValue1: '',
  //   mathValue2: '',
  //   mathOperator: '',
  //   answer: ''
  // }
];

//GET of equation history tested on Postman
app.get('/equation-history', (req, res) => {
  res.send(history);
});

//Post that accepts an object for an equation
app.post('/equation', (req, res) => {
  //retrieve the response of data
  const equationObject = req.body;
  const mathValue1AsInt = parseInt(equationObject.mathValue1); //turns strings into numbers
  const mathValue2AsInt = parseInt(equationObject.mathValue2); //turns strings into numbers
  let answer = 0; //stores the value of 'mathValue1AsInt + mathValue2AsInt'

  //do the math equation
  //checks for operator and does corresponding equation
  if (equationObject.mathOperator === 'add') {
    // equationObject.mathValue1 + equationObject.mathValue2; → now use the parseInt values
    answer = mathValue1AsInt + mathValue2AsInt;
  } else if (equationObject.mathOperator === 'subtract') {
    // equationObject.mathValue1 - equationObject.mathValue2; → now use the parseInt values
    answer = mathValue1AsInt - mathValue2AsInt;
  } else if (equationObject.mathOperator === 'divide') {
    // equationObject.mathValue1 / equationObject.mathValue2; → now use the parseInt values
    answer = mathValue1AsInt / mathValue2AsInt;
  } else if (equationObject.mathOperator === 'multiply') {
    // equationObject.mathValue1 * equationObject.mathValue2; → now use the parseInt values
    answer = mathValue1AsInt * mathValue2AsInt;
  }
  //add math equation and answer to history (Array)
  history.push({
    mathValue1: mathValue1AsInt,
    mathValue2: mathValue2AsInt,
    mathOperator: equationObject.mathOperator,
    answer: answer,
  });
  //reply back to client ajax request with message: "Okay!" or "Added!"
  console.log('history:', history);
  res.sendStatus(201); //(Created)
});

//This serves the static files.
app.use(express.static('server/public'));

app.listen(5000, () => {
  console.log(`Listening on port 5000!`);
});
