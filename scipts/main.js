// hide the opening and start the game
document.querySelector('.start-btn').addEventListener('click', () => {
    document.querySelector('.start-game').classList.add('hide');
    play();
})
document.querySelector('.next-btn').addEventListener('click', () => {
    document.querySelector('.correct-answer').classList.toggle('active');
    document.querySelector('.animateDiv').classList.add('animate');
    setTimeout(() => {
        document.querySelector('.animateDiv').classList.remove('animate');
    }, 2000)
    play();
})
const resetBtns = document.querySelectorAll('.reset-btn');
[...resetBtns].forEach(btn => {
    btn.addEventListener('click', () => {
        window.location.reload()
    });
})

const gameData = {
    questionAmount: 10,
    questionCounter: 1,
    correctQuestion: 0,
}

const questionHolder = document.querySelector('.question h3');
const answerHolder = document.querySelectorAll('.answer p');
const questionNumberHolder = document.querySelector('.question-counter');
window.onload = document.querySelector('.question-number').textContent = `${gameData.questionAmount}`;

// randomizeTextContent function makes sure that each question is random, and each answer goes to a random HTML element


const randomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
let answersNumber = 4;
let rightAnswer;
const randomizeTextContent = () => {
    const questionIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions.splice(questionIndex, 1);
    gameData.correctQuestion = questionIndex;
    questionHolder.textContent = randomQuestion[0][0];
    rightAnswer = randomQuestion[0][1];
    console.log(rightAnswer);
    [...answerHolder].forEach(item => {
        const answerIndex = randomNumber(1, answersNumber);
        const randomAnswer = randomQuestion[0][answerIndex];
        item.textContent = randomAnswer;
        randomQuestion[0].splice(answerIndex, 1)
        answersNumber--;
    })
    answersNumber = 4;
}
const play = () => {
    questionNumberHolder.textContent = gameData.questionCounter;
    gameData.questionCounter++;
    randomizeTextContent();
}

// check answer

const checkAnswer = function () {
    console.log(this);
    if (this.querySelector('p').textContent == rightAnswer) {
        if (gameData.questionCounter > gameData.questionAmount) {
            document.querySelector('.win').classList.add('active');
        } else {
            document.querySelector('.correct-answer').classList.toggle('active');
        }
    } else
        document.querySelector('.loss').classList.toggle('active');
    document.querySelector('.loss p').textContent = `Correct answer is: ${rightAnswer}`
}
const answers = document.querySelectorAll('.answer');
[...answers].forEach(answer => {
    answer.addEventListener('click', checkAnswer);
})
