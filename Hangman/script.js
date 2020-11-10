const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = WordsList;

let selectedWord = words[
  Math.floor(Math.random() * words.length)
].toUpperCase();

const correctLetters = [];
const wrongLetters = [];

// show hidden word
function displayWord() {
  wordEl.innerHTML = ` ${selectedWord
    .split('')
    .map(
      letter =>
        `<span class="letter"> ${
          correctLetters.includes(letter) ? letter : '_'
        }      </span> `
    )
    .join('')}  `;

  // replace the newlines with regular spaces in the word element
  const innerWord = wordEl.innerText.replace(/\n/g, '');

  // show message when player guessed the word and won the game.
  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Gefeliciteerd! \n Je hebt gewonnen! \n 🎉🎊🥳🙌';
    popup.style.display = 'flex';
  }
}

// Update and display the wrong letters array
function updateWrongLettersEl() {
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? '<p>Fout geraden letters</p>' : ''}
  ${wrongLetters.map(letter => `<span>${letter} </span>`)}

  `;

  // display the figure parts svg based on the wrong letters array
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });
  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = `Helaas... je hebt verloren. 😢 \n het woord dat ik zocht was \n ${selectedWord}`;
    popup.style.display = 'flex';
  }

  console.log(wrongLetters.length + ' ' + figureParts.length);
}

// function that shows a notification when a letter is already guessed.
function showNotification() {
  notification.classList.add('show');
  setTimeout(() => notification.classList.remove('show'), 2000);
}

// Add an keyboard eventlistener for only letters A-Z. then push the letter to the appropriate array.
window.addEventListener('keydown', e => {
  let letter = e.key.toUpperCase();

  if (alphabet.includes(letter)) {
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
  // Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)].toUpperCase();

  displayWord();
  updateWrongLettersEl();

  popup.style.display = 'none';
});

displayWord();
