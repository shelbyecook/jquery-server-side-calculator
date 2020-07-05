//DEFINING GLOBAL VARIABLES
let globalOperator = null;
let equation = [];

//INITIALIZING DOC + ACTIONS PERFORMED WHEN PAGE LOADS
$(document).ready(init);

function init() {
  $('.js-btn-submit').on('click', clickedSubmitMath);
  $('.js-btn-mathOperator').on('click', clickedMathOperator);
  $('.js-btn-clear').on('click', deleteHistory);

  getHistory();
}

//EVENT HANDLERS + AJAX REQUESTS
function clickedSubmitMath(event) {
  let num1 = $('.js-input-mathValue1').val();
  let num2 = $('.js-input-mathValue2').val();

  num1 = parseInt(num1);
  num2 = parseInt(num2);

  let newEquation = {
    mathValue1: num1,
    mathValue2: num2,
    mathOperatorType: globalOperator,
  };

  if (
    newEquation.mathValue1 === '' ||
    newEquation.mathValue2 === '' ||
    newEquation.mathOperatorType === ''
  ) {
    alert("Oops! We're having trouble with this equation.");
    return;
  }

  $.ajax({
    type: 'POST',
    url: '/equation',
    data: newEquation,
  }).then(function (response) {
    getHistory();
  });
  equation.push(newEquation);
  clearInputs();
}

function deleteHistory(event) {
  $.ajax({
    type: 'DELETE',
    url: '/equation',
  }).then(function (response) {
    render(response);
  });
}

function getHistory(event) {
  $.ajax({
    type: 'GET',
    url: '/equation',
  }).then(function (response) {
    render(response);
  });
}

function clickedMathOperator(event) {
  globalOperator = $(this).data('operator'); //"this" is button that was clicked
}

function clearInputs(event) {
  $('.js-input-mathValue1').val('');
  $('.js-input-mathValue2').val('');
}

//RENDERING
function render(listOfMathObjects) {
  let $answer = $('.js-answer');
  let $historyList = $('.js-history-list');

  //EMPTY
  $answer.empty();
  $historyList.empty();

  //APPEND
  $answer.append(listOfMathObjects[listOfMathObjects.length - 1].answer);

  for (let data of listOfMathObjects) {
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
      <ul><li>
        ${data.mathValue1}
        ${thisOperator}
        ${data.mathValue2}
        =
        ${data.answer}
      </li></ul>
      `);
  }
}
