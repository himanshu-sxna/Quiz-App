let gameData ={

    gameScore: 0,
    playerName: "",

}

const getLine1 = document.getElementById("heading1");
const getLine2 = document.getElementById("heading2");
const getLine3 = document.getElementById("heading3");
const getnameInputDiv = document.getElementById("nameInputDiv");
const getButton = document.getElementById("button");

function getUserName() {

    getLine1.innerHTML = "Great!";
    getLine2.innerHTML = "Lets start with your Name:";
    getLine3.style.display = "none";
    getnameInputDiv.style.display = "block";
    getButton.innerHTML = "OK";
    getButton.setAttribute("onclick", "validateName()");
  
}

function validateName() {
    const nameValue = document.getElementById("nameInput").value;
    if (nameValue == "") {
      const getError = document.getElementById("nameError");
      getError.style.display = "block";
    } else {
      nameValue = gameData.playerName;
      getError.style.display = "hidden";
      getButton.setAttribute("onclick", "newfuncton()");
    }
  }
function displayItem(id) {
    let x = id.toString();
    let item = document.getElementById(x).style.display;
    console.log(item);
    if (item === "none") {
      item = "block";
    } else {
      item = "none";
    }
  }

