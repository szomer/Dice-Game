// DOM elements
var img1 = document.querySelectorAll('img')[0];
var img2 = document.querySelectorAll('img')[1];
var title = document.querySelector('#title');

// Event listener for body clicks
document.body.addEventListener('click', onClick, true);

// Callback function for click event
function onClick() {
  var str = 'Refresh Me';

  let player1 = getNum();
  let player2 = getNum();

  // check which player won
  if (player1 === player2) {
    str = "It's a Tie!";
  } else if (player1 > player2) {
    str = 'Player 1 Wins!';
  } else {
    str = 'Player 2 Wins!';
  }

  // update source of image
  img1.setAttribute('src', `images/dice${player1}.png`);
  img2.setAttribute('src', `images/dice${player2}.png`);

  // set title message
  title.textContent = str;
}

// get random number from 1 and 6
function getNum() {
  return Math.floor(Math.random() * 6) + 1;
}
