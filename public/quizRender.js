"use strict";

const questionEl = document.querySelector("#question");
const answersEl = document.querySelector("#answers");
const quizTitle = document.querySelector(".quiz-title");
const nextQu = document.querySelector("#next");
let questionArr = questions[0].quizDaten.slice()

let currentQuestion = 0;
let score = 0;

window.addEventListener("load", () => {
    quizTitle.innerHTML = questions[0].title;
});

let showQuestion = () => {
    const resultEl = document.querySelector("#result");
    resultEl.textContent = "";
    questionEl.textContent = questionArr[currentQuestion].question;
    answersEl.innerHTML = "";
    for (let i = 0; i < questionArr[currentQuestion].answer.length; i++) {
        const answerNr = document.createElement("li");
        answerNr.textContent = questionArr[currentQuestion].answer[i];
        answerNr.setAttribute("onclick", "isAnswer(" + i + " )");
        answersEl.appendChild(answerNr);
    }
};

let isAnswer = (answ) => {
    // console.log("Answer is: " + answ);

    const resultEl = document.querySelector("#result");

    if (answ === questionArr[currentQuestion].correctAnswer) {
        resultEl.textContent = ("Korrekte Antwort!");
        score += 1;
    } else {
        resultEl.textContent = ("Falsche Antwort! Korrekte Antwort ist " +
            (parseInt(questionArr[currentQuestion].correctAnswer) + 1) + ".");
    };
    nextQu.disabled = false;
    document.querySelector("#answers").style.pointerEvents = "none";

};


function nextQuestion() {
    if (currentQuestion == questionArr[currentQuestion].answer.length) {
        showResult();
    } else {
        currentQuestion += 1;
        showQuestion();
        nextQu.disabled = true;
        document.querySelector("#answers").style.pointerEvents = "auto";
    };
};

function showResult() {
    const container = document.querySelector(".container");
    container.innerHTML = `<h1>Quiz beendet!</> <p>Score: ${score}/
    ${questionArr[currentQuestion].answer.length + 1}</p> 
    <a href="./">Startseite</a>`;

}

showQuestion();



