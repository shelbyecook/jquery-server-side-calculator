$(document).ready(init);

function init() {
  console.log('Document ready.');
  //get equation history
  getHistory();
}

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

function render(history) {
  const $answer = $('.js-answer');
  const $history = $('.js-history');
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

    $history.append(`
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
