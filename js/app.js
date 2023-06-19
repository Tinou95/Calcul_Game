document.addEventListener("DOMContentLoaded", () => {

//son bonne réponse
const correctSound = new Audio('asset/correct.mp3');
//son mauvaise réponse
const incorrectSound = new Audio('asset/incorrect.mp3');
//son reset
const resetSound = new Audio('asset/reset.mp3');
//son changer
const changeSound = new Audio('asset/changer.mp3');

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
//le joueur peux choisir la range de nombre luit même dans le html directement
  const changeRange = () => {
    const min = parseInt(document.getElementById('min').value, 10);
    const max = parseInt(document.getElementById('max').value, 10);

    if (min > max) {
      alert('Le nombre minimum doit être inférieur au nombre maximum.');
      return;
    }

    generateQuestion();

  };

  document.getElementById('changeRange').addEventListener('click', () => {
    changeRange();

    changeSound.play();
  });


  const generateQuestion = () => {
    const min = parseInt(document.getElementById('min').value, 10);
    const max = parseInt(document.getElementById('max').value, 10);

    const num1 = getRandomNumber(min, max);
    const num2 = getRandomNumber(min, max);

    const operator = getSelectedOperator();

    document.getElementById('question').textContent = `${num1} ${operator} ${num2}`;
    resetTimer();
  };


  const getSelectedOperator = () => {
    const selectElement = document.getElementById('mode');
    const selectedValue = selectElement.value;

    switch (selectedValue) {
      case 'addition':
        return '+';
      case 'soustraction':
        return '-';
      case 'multiplication':
        return '*';
      default:
        return '+';
    }
  };

  const checkAnswer = () => {
    const answer = parseInt(document.getElementById('answer').value, 10);
    const questionText = document.getElementById('question').textContent;
    const operator = getSelectedOperator();
    const [num1, num2] = questionText.split(operator).map(Number);

    let correctAnswer;

    switch (operator) {
      case '+':
        correctAnswer = num1 + num2;
        break;
      case '-':
        correctAnswer = num1 - num2;
        break;
      case '*':
        correctAnswer = num1 * num2;
        break;
      default:
        correctAnswer = 0;
        break;
    }

    const resultElement = document.getElementById('result');
    if (answer === correctAnswer) {
      increaseScore();
      resultElement.textContent = 'Correct!';
      correctSound.play();
    } else {
      resultElement.textContent = `Incorrect. La réponse était ${correctAnswer}.`;
      incorrectSound.play();
    }

    generateQuestion();
  };

  const increaseScore = () => {
    const scoreElement = document.getElementById('score');
    const currentScore = parseInt(scoreElement.textContent.split(':')[1], 10);
    const newScore = currentScore + 1;
    scoreElement.textContent = `Score: ${newScore}`;
  };

  const restartGame = () => {
document.getElementById('score').textContent = 'Score: 0';
resetTimer();
resetSound.play();

};

document.getElementById('restart').addEventListener('click', restartGame);

  const changeMode = () => {
    generateQuestion();
    changeSound.play();
  };

  document.getElementById('submit').addEventListener('click', checkAnswer);
  document.getElementById('restart').addEventListener('click', restartGame);
  document.getElementById('changeMode').addEventListener('click', changeMode);

  //faire en sorte que quand j'appui sur la touche entrer ça valide la réponse
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      checkAnswer();
    }
  });

  //système de timer
  let time = 0;
  const timer = () => {
    time++;
    document.getElementById('timer').textContent = `Temps: ${time} secondes`;
  };
  setInterval(timer, 1000);
  //fonction timer reset
  const resetTimer = () => {
    time = 0;
  };

  //et reset l'espace de réponse quand je clique sur le bouton et sur entrer aussi



  document.getElementById('submit').addEventListener('click', () => {
    document.getElementById('answer').value = '';


  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      document.getElementById('answer').value = '';
   
    }
  });


  generateQuestion();
  });
  