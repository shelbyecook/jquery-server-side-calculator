let mathOperatorType = null;

$(document).ready(init);

function init() {
  $('.js-btn-submit').on('click', submitMath);
  $('.js-btn-mathOperator').on('click', mathOperator);

  //get equation history
  getHistory();
}
//Event Handlers
function submitMath(event) {
  let num1 = $('.js-input-mathValue1').val();
  let num2 = $('.js-input-mathValue2').val();

  num1 = parseInt(num1);
  num2 = parseInt(num2);

  const mathEquation = {
    mathValue1: num1,
    mathValue2: num2,
    mathOperator: mathOperatorType,
  };

  console.log('Submit Math', mathEquation);
}

function mathOperator(event) {
  mathOperatorType = $(this).data('operator'); //"this" is button that was clicked
  console.log('Click Operator: ', mathOperatorType);
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
    });
}

//View Updates
function render(history) {
  const $answer = $('.js-answer');
  const $historyList = $('.js-history-list');
  const lastIndex = history.length - 1;
  //wanting to append last index → this "history.length - 1" gives me the last item in the array always, and I'm storing it in a variable above → lastIndex

  for (let data of history) {
    let operatorType = null;
    if (data.mathOperator === 'add') {
      operatorType = '+';
    } else if (data.mathOperator === 'subtract') {
      operatorType = '-';
    } else if (data.mathOperator === 'divide') {
      operatorType = '/';
    } else if (data.mathOperator === 'multiply') {
      operatorType = '*';
    }

    $historyList.append(`
    <li>
    ${data.mathValue1}
    ${data.operatorType}
    ${data.mathValue2}
    =
    ${data.answer}
    </li>
    `);
  }
}
