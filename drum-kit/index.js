const DRUMS = {
  w: 'tom-1',
  a: 'tom-2',
  s: 'tom-3',
  d: 'tom-4',
  j: 'snare',
  k: 'crash',
  l: 'kick-bass',
};

document.read;

// get number of .drum elements
let nbrOfDrumButtons = document.querySelectorAll('.drum').length;
// another approach:
let nbrOfDrumButtons2 = DRUMS.length;

// loop through all .drum elements
for (let i = 0; i < nbrOfDrumButtons; i++) {
  // attach event listener to the element
  document.querySelectorAll('.drum')[i].addEventListener('click', onClick);
}

// callback function
function onClick() {
  // 'this' will be the button element
  playSound(this.innerHTML);
}

function playSound(drumKey) {
  // play the audio that matches the button element clicked
  if (DRUMS[drumKey]) {
    // animation
    buttonAnimation(drumKey);
    // sound
    var audio = new Audio(`sounds/${DRUMS[drumKey]}.mp3`);
    audio.play();
  }
}

// Listen for key pressed
document.addEventListener('keydown', function (event) {
  playSound(event.key);
});

// Show button animation
function buttonAnimation(drumKey) {
  // add class to the button
  var activeBtn = document.querySelector(`.${drumKey}`);
  activeBtn.classList.add('pressed');

  // after delay remove the class
  setTimeout(function () {
    activeBtn.classList.remove('pressed');
  }, 2000);
}
