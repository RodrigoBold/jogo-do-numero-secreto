let drawnNumbers = [];
let maxLimit = 10;
let secretNumber = generateRandomNumber();
let attempts = 1;

function displayTextOnScreen(tag, text, textToSpeech) {
    let element = document.querySelector(tag);
    element.innerHTML = text;
    let readableText = textToSpeech || text.replace(/<[^>]*>/g, '');
    responsiveVoice.speak(readableText, 'Brazilian Portuguese Female', {rate:1.2});
}

function showInitialMessage() {
    displayTextOnScreen(
        'h1', 
        'Jogo do <strong class="highlight-text">número secreto</strong>',
        'Jogo do número secreto'
    );
    displayTextOnScreen('p', `Escolha um número entre 1 e <strong class="highlight-text">${maxLimit}</strong>`);
}

showInitialMessage();

function setMaxNumber() {
    let numberInput = document.getElementById('maxNumber');
    if (numberInput.value.trim() === '') {
        displayTextOnScreen('p', 'Por favor, insira um número.');
    } else {
        maxLimit = parseInt(numberInput.value);
        numberInput.value = '';
        drawnNumbers = [];
        restartGame();
        console.log('New limit:', maxLimit);
    }
}

function checkGuess() {
    let playerGuess = document.getElementById('guessInput').value;

    if (playerGuess === '') {
        displayTextOnScreen('p', 'Por favor, insira um número.');
        return; 
    }
    if (playerGuess == secretNumber) {
        displayTextOnScreen('h1', `Acertou! O <strong class="highlight-text">número secreto</strong> era <strong class="highlight-text">${secretNumber}!</strong>`);
        let attemptWord = attempts > 1 ? 'tentativas' : 'tentativa';
        let attemptsMessage = `Você descobriu com ${attempts} ${attemptWord}!`;
        displayTextOnScreen('p', attemptsMessage);
        document.getElementById('restartButton').removeAttribute('disabled');
        document.getElementById('guessButton').disabled = true;
    } else {
        if (playerGuess > secretNumber) {
            displayTextOnScreen('p', `O número secreto é menor do que ${playerGuess}`);
        } else {
            displayTextOnScreen('p', `O número secreto é maior do que ${playerGuess}`);
        }
        attempts++;
        clearInput();
    }
}

function generateRandomNumber() {
    let chosenNumber = parseInt(Math.random() * maxLimit + 1);
    let totalNumbersInList = drawnNumbers.length;

    if (totalNumbersInList == maxLimit) {
        drawnNumbers = [];
    }
    if (drawnNumbers.includes(chosenNumber)) {
        return generateRandomNumber();
    } else {
        drawnNumbers.push(chosenNumber);
        console.log(drawnNumbers);
        return chosenNumber;
    }
}

function clearInput() {
    let guessInput = document.querySelector('input');
    guessInput.value = '';
}

function restartGame() {
    document.getElementById('guessButton').disabled = false;
    secretNumber = generateRandomNumber();
    clearInput();
    attempts = 1;
    showInitialMessage();
    document.getElementById('restartButton').setAttribute('disabled', true);
    document.getElementById('guessButton').disabled = false;
}