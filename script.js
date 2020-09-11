/* The gameData object will store all variables related to the Quiz Game, inlcuding score, time, player name and the array for questions*/

let quizData = {

    gameScore: 0,
    playerName: "",
    quizScores: {
    },
    quizQuestions: [
      {
        question: "1. Which is a synonym of deleterious?",
        answers: {
          a: "Harmful",
          b: "Pure",
          c: "Necessary",
          d: "Hollow"
        },
        correctAnswer: "A"
      },
      {
        question: "2. A small, rounded hill",
        answers: {
          a: "Pioneer",
          b: "Knoll",
          c: "Stoic",
          d: "Plateau"
        },
        correctAnswer: "B"
      },
      {
        question: "3. Dried out with heat, extremely thirsty",
        answers: {
          a: "Nepotism",
          b: "Descend",
          c: "Occurrence",
          d: "Parched"
        },
        correctAnswer: "D"
      },
      {
        question: "4. Which is a synonym of reminisce?",
        answers: {
          a: "Remember",
          b: "Solve",
          c: "Injure",
          d: "Practice",
        },
        correctAnswer: "A"
      },
      {
        question: "5. Which is a synonym of perennial?",
        answers: {
          a: "Lasting",
          b: "Loyal",
          c: "Affordable",
          d: "Sentimental",
        },
        correctAnswer: "A"
      },
    ]
}

let secondsCounter = 74;
let i = 0;



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

  
  let startTimer = setInterval( function secondsTimer() {
    
    if (secondsCounter == 0){
      timeOut();
      clearInterval(startTimer);
    } else if (secondsCounter < 10){
      getTimer.innerHTML = "0" + secondsCounter + " s";
    } else {
      getTimer.innerHTML = secondsCounter + " s";
    }
    secondsCounter --;
  }, 1000);

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
    function answerChoice() {

      let userOption = this.id;
      if(userOption === quizData.quizQuestions[i].correctAnswer){
        secondsCounter += 10;
        ansRight();
      }else {
        secondsCounter -= 5;
        ansWrong();
      }
      i++;
      try {
        switchQuestion(i);
      } catch {
        setTimeout (endScreen, 500);
        clearInterval(startTimer);
      }
        quizData.gameScore = secondsCounter;
      }
}

function ansRight() {

  getAnsCheck = document.getElementById("ans-check");

  getAnsCheck.innerHTML = "Correct!";
  getAnsCheck.style.color = "#4cee18";
  getAnsCheck.style.display = "block";

  function hideMe(){
    getAnsCheck.style.display = "none" ;
}

  setTimeout( hideMe, 250 );
}

function ansWrong() {

  getAnsCheck = document.getElementById("ans-check");

  getAnsCheck.innerHTML = "Incorrect";
  getAnsCheck.style.color = "#dd1e04";
  getAnsCheck.style.display = "block";

  function hideMe(){
    getAnsCheck.style.display = "none" ;
}

  setTimeout( hideMe, 250 );
}


function endScreen() {

  var getRestartBtn = document.getElementById("restart-btn");
  getQuizDiv.style.display = "none";

  getRestartBtn.style.display = "block";
  getImg.style.display = "block";
  getImg.style.height = "250px";
  getLine1.style.display = "block";
  getButton.style.display = "block";
  getButton.setAttribute("onclick", "saveScores()")

  getLine1.innerHTML = ("All done. Your score is " + quizData.gameScore);
  getButton.innerHTML = "Save my score";

}

function timeOut(){

  getQuizDiv.style.display = "none";
  getLine1.style.display = "block";
  getButton.style.display = "block";
  getImg.style.display = "block";
  getImg.style.height = "250px";

  getLine1.innerHTML = "Oops! Looks like you ran out of time";
  getButton.innerHTML = "Try Again";

  getButton.onclick = loadQuiz;

}

function loadQuiz() {
  location.reload();
}

function saveScores() {
  quizData.quizScores[quizData.playerName] = quizData.gameScore;
  localStorage.setItem(quizData.gameScore, quizData.playerName);

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

  for (x = 0; x < localStorage.length; x++){

    if (localStorage.key(x).length <= 2) {
      getScoreTable.innerHTML += "<tr><td>" + localStorage.getItem(localStorage.key(x)) + "</td><td>" + localStorage.key(x) + "</td> </tr>";
    }
    
  }
}

function clearStorage () {

  if (confirm("All scores have been cleared")){
    localStorage.clear();
  }
  location.reload();
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
let getTimer = document.getElementById("quiz-time");


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