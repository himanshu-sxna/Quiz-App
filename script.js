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

/* targeting all required HTML tags 
/ these tags have global scope because they will be used in /
/ the functions below multiple times */
let getLine1 = document.getElementById("heading1");
let getLine2 = document.getElementById("heading2");
let getLine3 = document.getElementById("heading3");
let getnameInputDiv = document.getElementById("nameInputDiv");
let getButton = document.getElementById("button");
let getImg = document.getElementById("quiz-icon");
let getError = document.getElementById("nameError");
let nameValue = document.getElementById("nameInput");
let getStepsDiv = document.getElementById("steps-wrapper");
let getQuizDiv = document.getElementById("quiz-div");
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

/* Function to validate user name, all inputs are accepted except a blank input field, Regex still need work, as user can enter witespace only as name*/
function validateName() {

  let getNameValue = nameValue.value;
  // checks lenghth is not zero//
  if (getNameValue.length === 0) {
    getError.style.display = "block";
  } // Regex to check must have letter or numbers //
   else if (getNameValue.length > 0 && /[A-Za-z0-9]+/g.test(getNameValue)) {
    quizData.playerName = getNameValue;
    getError.style.display = "none";
    displaySteps();
  }
  else {
    getError.style.display = "block";
    getNameValue.placeholder = "Enter your name here...";

  }
}

/* The function displays the set of instructions alongwith the playername, it also sets th ebutton's onclick attribute to the buildQuiz() to start the quiz when user is ready */
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

/* The main function that does the following: /
/ Sets the HTML for displaying the question and options/
/ Sets the seconds counter for the timer /
/ var i to iterate through the question and answer array /
/Switches the questions afetr user inputs /
/ compares the user input to the correct answer/*/
function buildQuiz() {

  let secondsCounter = 74;
  // variable to iterate the questions array //
  let i = 0;

  // setting up the HTML for the page //
  getStepsDiv.style.display = "none";
  getImg.style.display = "none";
  getButton.style.display = "none";

  getQuizDiv.style.display = "block";

  let getQuestionBox = document.getElementById("quiz-question");
  let getansOptA = document.getElementById("A");
  let getansOptB = document.getElementById("B");
  let getansOptC = document.getElementById("C");
  let getansOptD = document.getElementById("D");

  // functon to iterate through the question array //
  // It also sets the timer to 75s//
  switchQuestion(i);
  
  let startTimer = setInterval( function secondsTimer() {
    
    if (secondsCounter <= 0){
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
  }
  // function that compares the user inoput to asses correct answer//
    function answerChoice() {

      let userOption = this.id;
      // if answer is correct add 10 seconds//
      // call ansRight() //
      if(userOption === quizData.quizQuestions[i].correctAnswer){
        secondsCounter += 10;
        ansRight();
      } // if answer is incorrect //
      // deduct 5 seconds, call ansWrong()//
      else {
        secondsCounter -= 5;
        ansWrong();
      }
      i++;
      /* try catch loop to catch the instance for when var i iterates more than the length of the array  */
      try {
        switchQuestion(i);
      } catch {
        setTimeout (endScreen, 500);
        clearInterval(startTimer);
      }
      
      quizData.gameScore = secondsCounter;
    
      
      }
}

/*Flashes correct when the the users answer is correct*/
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

/*Flashes incorrect when the the users answer is wrong*/
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
/*Function displays the score screen with the option /
/ to write score data to local storage */
function endScreen() {

  var getRestartBtn = document.getElementById("restart-btn");
  getQuizDiv.style.display = "none";

  getRestartBtn.style.display = "block";
  getImg.style.display = "block";
  getImg.style.height = "250px";
  getLine1.style.display = "block";
  getButton.style.display = "block";
  getButton.setAttribute("onclick", "saveScores()")

  // set the usersoce to 0 if timer goes to zero//
  if (quizData.gameScore <=0){
    getLine1.innerHTML = ("All done. Your score is 0");
  }else {
    getLine1.innerHTML = ("All done. Your score is " + quizData.gameScore);
  }
  // the below button will save scores//
  getButton.innerHTML = "Save my score";
}

/* The below function saves the user score in local storage /
/ and populates the html table to display all saved scores*/
function saveScores() {
  // save scores to storage//
  quizData.quizScores[quizData.playerName] = quizData.gameScore;
  localStorage.setItem(quizData.gameScore, quizData.playerName);

  // set up html for the table//
  const getScoreDiv = document.getElementById("score-table-div");
  const getScoreTable = document.getElementById("score-table-body");

  getImg.style.display = "none";
  getLine1.style.display = "none";
  getButton.innerHTML = "Clear Scores";
  // button with clear local storage option//
  getButton.setAttribute("onclick", "clearStorage()")

  getScoreDiv.style.display ="block";

  /* display the scores if the length of the score is 3 or less/
  / this prevents other items in local storage to be displayed*/
  for (x = 0; x < localStorage.length; x++){

    if (localStorage.key(x).length <= 3) {
      getScoreTable.innerHTML += "<tr><td>" + localStorage.getItem(localStorage.key(x)) + "</td><td>" + localStorage.key(x) + "</td> </tr>";
    }
    
  }
}

// local storage cleared and quiz reloads//
function clearStorage () {

  if (confirm("All scores have been cleared")){
    localStorage.clear();
  }
  location.reload();
}

// this function can loads the quiz//
function loadQuiz() {
  location.reload();
}

/* the fucntion displays the timeput screen /
/ when the user runs out of time*/
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
