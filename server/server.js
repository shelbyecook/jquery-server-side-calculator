const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //allows us to test on Postman

//This serves the static files.
app.use(express.static('server/public'));

const history = [];

//GET of equation history tested on Postman
app.get('/equation-history', (req, res) => {
  res.send(history);
});

//Post that accepts an object for an equation
app.post('/equation', (req, res) => {
  //retrieve the response of data
  const mathEquationObject = req.body;
  const mathValue1AsInt = parseInt(mathEquationObject.mathValue1); //turns strings into numbers
  const mathValue2AsInt = parseInt(mathEquationObject.mathValue2); //turns strings into numbers
  let answer = 0; //stores the value of 'mathValue1AsInt + mathValue2AsInt'

  //do the math equation
  //checks for operator and does corresponding equation
  if (mathEquationObject.mathOperatorType === 'add') {
    // equationObject.mathValue1 + equationObject.mathValue2; → now use the parseInt values
    answer = mathValue1AsInt + mathValue2AsInt;
  } else if (mathEquationObject.mathOperatorType === 'subtract') {
    // equationObject.mathValue1 - equationObject.mathValue2; → now use the parseInt values
    answer = mathValue1AsInt - mathValue2AsInt;
  } else if (mathEquationObject.mathOperatorType === 'divide') {
    // equationObject.mathValue1 / equationObject.mathValue2; → now use the parseInt values
    answer = mathValue1AsInt / mathValue2AsInt;
  } else if (mathEquationObject.mathOperatorType === 'multiply') {
    // equationObject.mathValue1 * equationObject.mathValue2; → now use the parseInt values
    answer = mathValue1AsInt * mathValue2AsInt;
  }
  //add math equation and answer to history (Array)
  history.push({
    mathValue1: mathValue1AsInt,
    mathValue2: mathValue2AsInt,
    mathOperatorType: mathEquationObject.mathOperatorType,
    answer: answer,
  });
  //reply back to client ajax request with message: "Okay!" or "Added!"
  console.log('history:', history);
  res.sendStatus(201); //(Created)
});

app.listen(PORT, () => {
  console.log(`Listening on port 5000!`);
});
