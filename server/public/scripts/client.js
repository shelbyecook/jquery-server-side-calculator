let globalOperator = null;

$(document).ready(init);

function init() {
  $('.js-btn-submit').on('click', clickedSubmitMath);
  $('.js-btn-mathOperator').on('click', clickedMathOperator);

  //get equation history
  getHistory();
}
//Event Handlers
function clickedSubmitMath(event) {
  let num1 = $('.js-input-mathValue1').val();
  let num2 = $('.js-input-mathValue2').val();

  num1 = parseInt(num1);
  num2 = parseInt(num2);

  const equation = {
    mathValue1: num1,
    mathValue2: num2,
    mathOperatorType: globalOperator,
  };

  console.log('Submit Math', equation);
  postEquation(equation);
}

function clickedMathOperator(event) {
  globalOperator = $(this).data('operator'); //"this" is button that was clicked
  console.log('Click Operator: ', globalOperator);
}

//API Calls
function getHistory() {
  //In jquery, it's 'bling dot ajax' → $.ajax() → for ajax "call" or "request." It's a function that accepts a parameter with properties of "method" and url.
  $.ajax({
    method: 'GET',
    url: '/equation-history',
  })
    .then(function (response) {
      console.log('GET history: ', response);
      render(response);
    })
    .catch(function (err) {
      console.log('GET history error: ', err);
      alert('We had trouble with your math.');
    });
}

function postEquation(mathEquationObject) {
  if (mathEquationObject.MathOperatorType === null) {
    return false;
  }
  $.ajax({
    method: 'POST',
    url: '/equation',
    data: mathEquationObject,
  })
    .then(function (response) {
      console.log('POST math equation: ', response);
      getHistory();
    })
    .catch(function (err) {
      console.log('POST equation error: ', err);
      alert('We had trouble processing your equation.');
    });
}

//View Updates
function render(history) {
  const $answer = $('.js-answer');
  const $historyList = $('.js-history-list');
  const lastIndex = history.length - 1;
  //wanting to append last index → this "history.length - 1" gives me the last item in the array always, and I'm storing it in a variable above → lastIndex

  //Empty html content
  $answer.empty();
  $historyList.empty();

  $answer.append(history[lastIndex].answer);

  for (let data of history) {
    let thisOperator = null;

    if (data.mathOperatorType === 'add') {
      thisOperator = '+';
    } else if (data.mathOperatorType === 'subtract') {
      thisOperator = '-';
    } else if (data.mathOperatorType === 'divide') {
      thisOperator = '/';
    } else if (data.mathOperatorType === 'multiply') {
      thisOperator = '*';
    }

    $historyList.append(`
    <li>
    ${data.mathValue1}
    ${thisOperator}
    ${data.mathValue2}
    =
    ${data.answer}
    </li>
    `);
  }
}
