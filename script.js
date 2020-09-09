/* The gameData object will store all variables related to the Quiz Game, inlcuding score, time, player name and the array for questions*/

let quizData = {

    gameScore: 0,
    playerName: "",
    isGameOver: false,
    quizScores: {
    },
    quizQuestions: [
      {
        question: "1. Who invented JavaScript?",
        answers: {
          a: "Douglas Crockford",
          b: "Sheryl Sandberg",
          c: "Brendan Eich",
          d:  "Bill Gates"
        },
        correctAnswer: "C"
      },
      {
        question: "2. Which one of these is a JavaScript package manager?",
        answers: {
          a: "Node.js",
          b: "TypeScript",
          c: "npm",
          d: "PyCharm"
        },
        correctAnswer: "C"
      },
      {
        question: "3. Which tool can you use to ensure code quality?",
        answers: {
          a: "Angular",
          b: "jQuery",
          c: "RequireJS",
          d: "ESLint"
        },
        correctAnswer: "D"
      },
    ]
}

let secondsCounter = 29;
let i = 0;

if (secondsCounter === 0) {
  gameOver();
}

function buildQuiz() {

  getStepsDiv.style.display = "none";
  getImg.style.display = "none";
  getButton.style.display = "none";

  getQuizDiv.style.display = "block";

  const getQuestionBox = document.getElementById("quiz-question");
  const getansOptA = document.getElementById("A");
  const getansOptB = document.getElementById("B");
  const getansOptC = document.getElementById("C");
  const getansOptD = document.getElementById("D");

  switchQuestion(i);

  timer();

  function switchQuestion(i) {
    getQuestionBox.innerHTML = quizData.quizQuestions[i].question;
    getansOptA.innerHTML = quizData.quizQuestions[i].answers.a;
    getansOptB.innerHTML = quizData.quizQuestions[i].answers.b;
    getansOptC.innerHTML = quizData.quizQuestions[i].answers.c;
    getansOptD.innerHTML = quizData.quizQuestions[i].answers.d; 

    getansOptA.onclick = answerChoice;
    getansOptB.onclick = answerChoice;
    getansOptC.onclick = answerChoice;
    getansOptD.onclick = answerChoice;

    console.log("The correct answer is " + quizData.quizQuestions[i].correctAnswer);

  }
    function answerChoice(clicked) {

      if (i === 2){
        endScreen();
      } else {
        let userOption = this.id;
      console.log("The user option is " + userOption);
      if(userOption === quizData.quizQuestions[i].correctAnswer){
        secondsCounter += 10;
      }else {
        secondsCounter -= 10;
      }
      console.log("i = " + i);
        i++;
        switchQuestion(i);
      }
    }
    
}

function endScreen() {

  quizData.gameScore = secondsCounter;

  getQuizDiv.style.display = "none";

  getImg.style.display = "block";
  getImg.style.height = "250px";
  getLine1.style.display = "block";
  getButton.style.display = "block";
  getButton.setAttribute("onclick", "saveScores()")

  getLine1.innerHTML = ("Great! Your score is " + quizData.gameScore);
  getButton.innerHTML = "Save my score";

}

function saveScores() {
  quizData.quizScores[quizData.playerName] = quizData.gameScore;
  console.log(quizData.quizScores);
  localStorage.setItem(quizData.playerName, quizData.gameScore);

  showScores();
}

function showScores() {

  const getScoreDiv = document.getElementById("score-table-div");
  const getScoreTable = document.getElementById("score-table-body");

  getImg.style.display = "none";
  getLine1.style.display = "none";
  getButton.innerHTML = "Clear Scores";
  getButton.setAttribute("onclick", "clearStorage()")

  getScoreDiv.style.display ="block";

  for (x = 1; x < localStorage.length; x++){
    getScoreTable.innerHTML += "<tr><td>" + localStorage.key(x) + "</td><td>" + localStorage.getItem(localStorage.key(x)) + "</td> </tr>"
  }
}

function clearStorage () {

  if (confirm("Clear all Scores")){
    localStorage.clear();
  }
  location.reload();
}

function timer() {

  let getTimer = document.getElementById("quiz-time");

  setInterval( function secondsTimer() {
    
    if (secondsCounter < 10){
      getTimer.innerHTML = "0" + secondsCounter + " s";
    } else {
      getTimer.innerHTML = secondsCounter + " s";
    }
    secondsCounter --;
  }, 1000);
}

// targeting all required HTML tags //
const getLine1 = document.getElementById("heading1");
const getLine2 = document.getElementById("heading2");
const getLine3 = document.getElementById("heading3");
const getnameInputDiv = document.getElementById("nameInputDiv");
const getButton = document.getElementById("button");
const getImg = document.getElementById("quiz-icon");
const getError = document.getElementById("nameError");
let nameValue = document.getElementById("nameInput");
const getStepsDiv = document.getElementById("steps-wrapper");
const getQuizDiv = document.getElementById("quiz-div");


/* The below function prompts the user to store the player name after the home screen*/
function getUserName() {

    getLine1.innerHTML = "Great!";
    getLine2.innerHTML = "Lets start with your name";
    getLine3.style.display = "none";
    getnameInputDiv.style.display = "block";
    getButton.innerHTML = "OK";
    getButton.setAttribute("onclick", "validateName()");
  
}

/* Function to validate user name, all inputs are accepted except a blank input field*/
function validateName() {
    let getNameValue = nameValue.value;

    if (getNameValue.length === 0) {
      getError.style.display = "block";
    } /* else if (nameValue.match((/^(?=.*[a-zA-Z0-9])/))) {
      getError.style.display = "block";
    
    } */else {
      quizData.playerName = getNameValue;
      getError.style.display = "none";
      displaySteps();
    }
  }

/* The function displays the set of instructions alongwith the playername, it also sets th ebutton's onclick attribute to */
  function displaySteps() {
    
    let getNameSpan = document.getElementById("playerName");

    getLine1.style.display = "none";
    getLine2.style.display = "none";
    getLine3.style.display = "none";
    getImg.style.height= "125px";
    nameValue.style.display = "none";

    getStepsDiv.style.display = "block";
    getNameSpan.innerHTML = quizData.playerName;
    getButton.innerHTML = "Let's Go";

    getButton.setAttribute("onclick", "buildQuiz()");
  }

/*
function displayItem(elementID) {
    var item = document.getElementById(elementID).id;
    console.log("item is " + item);
    if (item.style.display === "none") {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  }
  */
  console.log(localStorage.length);

