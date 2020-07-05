//DEFINING GLOBAL VARIABLE
let globalOperator = null;

//INITIALIZING DOC + ACTIONS PERFORMED WHEN PAGE LOADS
$(document).ready(init);

function init() {
  $('.js-btn-submit').on('click', clickedSubmitMath);
  $('.js-btn-mathOperator').on('click', clickedMathOperator);

  getHistory();
}

//EVENT HANDLERS
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

  postEquation(equation);
}

function clickedMathOperator(event) {
  globalOperator = $(this).data('operator'); //"this" is button that was clicked
}

//AJAX REQUESTS
function getHistory() {
  $.ajax({
    method: 'GET',
    url: '/equation-history',
  })
    .then(function (response) {
      render(response);
    })
    .catch(function (err) {
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
      getHistory();
    })
    .catch(function (err) {
      alert('We had trouble processing your equation.');
    });
}

//RENDERING + APPENDING TO THE DOM
function render(history) {
  const $answer = $('.js-answer');
  const $historyList = $('.js-history-list');
  const lastIndex = history.length - 1;

  //EMPTYING HTML CONTENT
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
