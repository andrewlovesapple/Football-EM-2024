"use strict"
const questions = [  //array  to store questions objects 
    {
        //properties of question objects:
        question: "In welchem Jahr fand die erste Fußball-Europameisterschaft statt und?",
        answers: [ //array to store answers as objects
            //properties of answer objects:
            { text: "1973", correct: false },
            { text: "1955", correct: false },
            { text: "1960", correct: true },
            { text: "1966", correct: false },
        ]
    },

    {
        question: "Wie viele Mannschaften nehmen an der EM 2024 teil?",
        answers: [
            { text: "24", correct: true },
            { text: "12", correct: false },
            { text: "36", correct: false },
            { text: "19", correct: false },
        ]
    },

    {
        question: "Welches Stadion ist für das Finale der EM 2024 vorgesehen",
        answers: [
            { text: "Olympiastadion München", correct: false },
            { text: "Borussia-Park", correct: false },
            { text: "Olympiastadion Berlin", correct: true },
            { text: "Veltins Arena", correct: false },
        ]
    },

    {
        question: "Welches Land spielt mit Deutschland in einer Gruppe?",
        answers: [
            { text: "Schottland", correct: true },
            { text: "Slowenien", correct: false },
            { text: "Österreich", correct: false },
            { text: "Finnland", correct: false },
        ]
    },

    {
        question: "Wer ist der Trainer der deutschen Nationalmannschaft bei der EM 2024",
        answers: [
            { text: "Franz Beckenbauer", correct: false },
            { text: "Erich Ribbeck", correct: false },
            { text: "Otto Nerz", correct: false },
            { text: "Julian Nagelsmann", correct: true },
        ]
    },


    {
        question: "Welche Mannschaft hat die meisten EM-Titel gewonnen?",
        answers: [
            { text: "Türkei und Frankreich", correct: false },
            { text: "Belgien und Italien", correct: false },
            { text: "Deutschland und Spanien", correct: true },
            { text: "Island und Portugal", correct: false },
        ]
    },
    {
        question: "Wie oft hat Deutschland die EM bereits gewonnen?",
        answers: [
            { text: "dreimal", correct: true },
            { text: "fünfmal", correct: false },
            { text: "zehnmal", correct: false },
            { text: "einmal", correct: false },
        ]
    },
    {
        question: "Würdest du die EM 2024-Fußballmeisterschaft besuchen?",
        answers: [
            { text: "Nein", correct: false },
            { text: "Ja", correct: true },
        ]
    }

]
const QuestionTitle = document.getElementById("QuestionTitle");
const AnswerButtons = document.getElementById("AnswerButtons"); //div that comprises all answer buttons 
const NextButton = document.getElementById("NextButton");
let CurrentQuestionIndex = 0;
let Score = 0;


function startQuiz() {
    //starts the game, by setting both score and question indices to 0
    CurrentQuestionIndex = 0;
    Score = 0;
    NextButton.innerHTML = "Next"; //ensures that at the start the text on the next button is appropriate
    showQuestion();
}

function showQuestion() {
    resetElements();
    let CurrentQuestion = questions[CurrentQuestionIndex];
    let QuestionNumber = CurrentQuestionIndex + 1;// used to represent array indices in "normal numbers"
    QuestionTitle.innerHTML = QuestionNumber + ". " + CurrentQuestion.question; // We add QuestionNumber and . to display the normal number of the question 
    CurrentQuestion.answers.forEach(answer => {
        const Button = document.createElement("button");
        Button.innerHTML = answer.text;
        Button.classList.add("AnswButton");// give css styles of our answer buttons to this newly created one
        AnswerButtons.appendChild(Button);
        if (answer.correct) {
            Button.dataset.correct = answer.correct;// assign correct attribute to the button  if the correct one was pressed
        } 
        Button.addEventListener("click", selectAnswer);
    });

}

function resetElements() {
    //takes care of the initial styling, makes next button not visible, deletes the pre-written text on HTML elemnts 
    NextButton.style.display = "none";
    while (AnswerButtons.firstChild) {
        AnswerButtons.removeChild(AnswerButtons.firstChild);
    }

}

function selectAnswer(e) {
    const SelectedButton = e.target;//capture the button element which was clicked by the user
    const IsCorrect = SelectedButton.dataset.correct === "true";
    if (IsCorrect) {
        SelectedButton.classList.add("correct"); //add styling of a correct class
        Score++;

    } else {
        SelectedButton.classList.add("incorrect");
    }
    Array.from(AnswerButtons.children).forEach(Button => {//organize child elemnts into an array
        if (Button.dataset.correct === "true ") { //iterate over other buttons, maybe there is more than 1 true answer 
            Button.classList.add("correct");
        }
        Button.disabled = true;
    });
    NextButton.style.display = "block";
}

function showScore() {
    resetElements();
    QuestionTitle.innerHTML = `Du hast ${Score} von   ${questions.length} Fragen richtig beantwortet!`; //append template literals(variables) within a string
    NextButton.innerHTML = "Nochmal spielen"
    NextButton.style.display = "block";
}

function handleNextButton() {
    CurrentQuestionIndex++;
    if (CurrentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

NextButton.addEventListener("click", () => {
    if (CurrentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz(); //play again
    }
});
startQuiz();