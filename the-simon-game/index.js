// color options
const COLORS = {
  1: 'green',
  2: 'red',
  3: 'yellow',
  4: 'blue',
};
// keep track of game started
var started = false;
// current level
var level = 0;
// game sequence
var game = [];
// user sequence
var user = [];

// After document loaded
$(document).ready(function () {
  // Key press event listener
  $(document).on('keypress', function (event) {
    if (!started) {
      // If space bar pressed
      if (event.keyCode === 32) {
        // update title level
        $('#level-title').text(`Level ${level}`);
        // set game to started
        started = true;
        // start the first game sequence
        nextSequence();
      }
    }
  });

  // Button click event listener
  $('.btn').on('click', function () {
    if (started) {
      // Add the color to the user array
      var chosenColor = $(this).attr('id');
      user.push(chosenColor);

      // visual/audio feedback
      playSound(chosenColor);
      animateUserPress(chosenColor);

      // check if answer is correct
      checkAnswer(user.length - 1);
    }
  });
});

// Start the next level
function nextSequence() {
  user = [];
  // update title level
  $('#level-title').text(`Level ${level}`);

  // get random number from 0 to 3
  var color_id = Math.floor(Math.random() * 4);
  var color = COLORS[color_id];
  // add to the game sequence
  game.push(color);

  // audio/animation to show player the next color
  $(`#${color}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(color);
}

// Play the sound of the given color button
function playSound(fileName) {
  // play sound
  var audio = new Audio(`sounds/${fileName}.mp3`);
  var playPromise = audio.play();

  // needed for chrome support
  if (playPromise !== undefined) {
    playPromise
      .then(function () {})
      .catch(function (error) {
        console.log('Automatic playback failed');
      });
  }
}

// animate when the user pressed color button
function animateUserPress(color) {
  // add the class to button
  $('#' + color).addClass('pressed');
  // remove the class from button
  setTimeout(function () {
    $('#' + color).removeClass('pressed');
  }, 100);
}

// check if user answer is correct
function checkAnswer(currentLevel) {
  if (user[currentLevel] === game[currentLevel]) {
    if (user.length === game.length) {
      // user gave correct answer
      // play next sequence after 600 ms
      setTimeout(function () {
        // increase level by 1
        level++;
        nextSequence();
      }, 600);
    }
  } else {
    // visual/audio game over
    playSound('wrong');
    $('#level-title').text('Game Over! Press Space to Try Again.');
    // add class game over
    $('body').addClass('game-over');

    // remove class game over
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);

    // reset for new game
    reset();
  }
}

// reset variables for new game
function reset() {
  level = 0;
  game = [];
  started = false;
}
