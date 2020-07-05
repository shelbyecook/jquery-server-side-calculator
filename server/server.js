const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = 5000;

//This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //allows us to test on Postman

//Serve the static files
app.use(express.static('server/public'));

const history = [];

app.get('/equation-history', (req, res) => {
  res.send(history);
});

//Accepts an object for an equation
app.post('/equation', (req, res) => {
  const mathEquationObject = req.body;
  const mathValue1AsInt = parseInt(mathEquationObject.mathValue1); //turns strings into numbers
  const mathValue2AsInt = parseInt(mathEquationObject.mathValue2); //turns strings into numbers
  let answer = 0; //stores the value of 'mathValue1AsInt + mathValue2AsInt'

  //Checks for operator type and does corresponding equation
  if (mathEquationObject.mathOperatorType === 'add') {
    answer = mathValue1AsInt + mathValue2AsInt;
  } else if (mathEquationObject.mathOperatorType === 'subtract') {
    answer = mathValue1AsInt - mathValue2AsInt;
  } else if (mathEquationObject.mathOperatorType === 'divide') {
    answer = mathValue1AsInt / mathValue2AsInt;
  } else if (mathEquationObject.mathOperatorType === 'multiply') {
    answer = mathValue1AsInt * mathValue2AsInt;
  }

  //Adds to the history array
  history.push({
    mathValue1: mathValue1AsInt,
    mathValue2: mathValue2AsInt,
    mathOperatorType: mathEquationObject.mathOperatorType,
    answer: answer,
  });

  //Replies to client ajax requests
  res.sendStatus(201); //(Created)
});

//sets up local host
app.listen(PORT, () => {
  console.log(`Listening on port 5000!`);
});
