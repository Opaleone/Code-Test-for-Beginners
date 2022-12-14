// Query selectors for DOM manipulation later

var question = document.getElementById('question');
var answer = document.querySelector('#question-answers');
var intro = document.querySelector('#introduction');
var timer = document.querySelector('#timer');
var highScores = document.querySelector('#highscore');
var leaderBoard = document.querySelector('#leaderboard');
const start = document.querySelector('#start-button');

// Check for question number
var count = 0;

// Question and Answer objects for reference
const questions = {
  question1: 'Which is NOT a primitive data type?',
  question2: 'What does CSS stand for?',
  question3: 'Which one is a semantic HTML element?',
  question4: 'How do you select an ID in CSS?',
  question5: 'Which is used to link a Javascript file?'
}


const answers = {
  question1W: ['string', 'object', 'number', 'boolean'],
  question2W: ['Crevice Sand Storm', 'Computer Secret Sauce', 'Computer Science Sheets', 'Cascading Style Sheets'],
  question3W: ['<div>', '<head>', '<section>', '<h1>'],
  question4W: ['.selector', 'selector', '#selector', '/selector'],
  question5W: ['<link>', '<connect>','<join>', '<append>']
}

const correctAnswerIndex = [1, 3, 2, 2, 0];

// Timer variables

var secondsLeft = 60;

var timerInterval;

// Variable that stores values retrieved from computers local storage

var scores = localStorage.getItem('highScore');

// Timer Function

function timerCounter() {
  secondsLeft--;
  timer.textContent = secondsLeft;
  
  if (secondsLeft === 0) {
    clearInterval(timerInterval);
  }
}

// Starts the timer and displays next question

function startQuiz() {

  intro.style.display = 'none';
  question.style.display = 'flex';

  timerInterval = setInterval(timerCounter, 1000);
  displayQuestion();
}

// Question Display Functions

function displayQuestion() {

  if (count < 5) {
    question.children[0].textContent = questions[Object.keys(questions)[count]];
    let myArr = answers[Object.keys(answers)[count]];

    console.log(myArr);

    for (let i = 0; i < 4; i++) {
      answer.children[i].textContent = myArr[i];
    }
  } else {
    question.style.display = 'none';
    clearInterval(timerInterval);
    timer.textContent = secondsLeft;
    localStorage.setItem('highScore', secondsLeft);
    var latestScore = localStorage.getItem('highScore')
    displayLeaderboard(latestScore);
  }
}

function nextQuestion(evt) {

  if (question.childElementCount === 3) {
    question.lastChild.remove();
  } 

  let userInput = evt.target.getAttribute('id');
  let pEl = document.createElement('p');

  pEl.setAttribute('id', 'status');

  userInput = parseInt(userInput[userInput.length-1]) - 1;

  if (userInput === correctAnswerIndex[count]) {
    pEl.textContent = 'Correct!';
    question.appendChild(pEl);
  } else {
    pEl.textContent = 'WRONG!';
    question.appendChild(pEl);
    secondsLeft -= 12;
  }

  count++;
  displayQuestion();

}

// Leaderboard Functions

function displayLeaderboard(num) {
  var titleEl = document.createElement('h1');
  var scoreDisplay = document.createElement('p');
  var playAgain = document.createElement('button')

  titleEl.setAttribute('id', 'leaderboard-title');
  scoreDisplay.setAttribute('id', 'score-display');
  playAgain.setAttribute('id', 'playAgain');

  scoreDisplay.textContent = num;

  titleEl.textContent = 'Your last score is:'

  playAgain.textContent = 'Play again';

  leaderBoard.appendChild(titleEl);
  leaderBoard.appendChild(scoreDisplay);
  leaderBoard.appendChild(playAgain);

  document.querySelector('#playAgain').addEventListener('click', reloadPage);

  leaderBoard.style.display = 'flex';
  
}

function leaderBoardLink() {
  intro.style.display = 'none';

  leaderBoard.innerHTML = '';

  var titleEl = document.createElement('h1');
  var scoreDisplay = document.createElement('p');
  var playAgain = document.createElement('button')

  titleEl.setAttribute('id', 'leaderboard-title');
  scoreDisplay.setAttribute('id', 'score-display');
  playAgain.setAttribute('id', 'playAgain');

  scoreDisplay.textContent = scores;

  titleEl.textContent = 'Your last score is:';

  playAgain.textContent = 'Home';

  leaderBoard.appendChild(titleEl);
  leaderBoard.appendChild(scoreDisplay);
  leaderBoard.appendChild(playAgain);

  document.querySelector('#playAgain').addEventListener('click', reloadPage);
  highScores.addEventListener('click', reloadPage);

  leaderBoard.style.display = 'flex';
}

function reloadPage() {
  location.reload();
}

// Event listeners on buttons that run the different Functions

start.addEventListener('click', startQuiz);
answer1.addEventListener('click', nextQuestion);
answer2.addEventListener('click', nextQuestion);
answer3.addEventListener('click', nextQuestion);
answer4.addEventListener('click', nextQuestion);
highScores.addEventListener('click', leaderBoardLink);