/*

1. Variabler
2. Funktioner som sätter 
- text
- länkar till knappar
- inputfält och knapp

Först en funktion som sätter initiala fält och rubriker
Sedan en funktion som sätter frågor och svar, och hanterar error


*/

// Variables
const app = document.getElementById('root')
const navbar = document.createElement('div')
const container = document.createElement('div')
const card = document.createElement('div')
const h1 = document.createElement('h1')
const p = document.createElement('p')
const btn = document.createElement('BUTTON')
const inputField = document.createElement("INPUT");

const containerColor1 = '#784212'
const containerColor2 = '#2980B9'
const colorHead1 = '#FAD7A0'
const colorHead2 = '#D7BDE2'

// TOP NAVBAR
navbar.setAttribute('class', 'navbar')
navbar.style.backgroundColor = '#212F3C'
navbar.textContent = "Fizzy bot engaged"   
app.appendChild(navbar)

container.setAttribute('class', 'container')
//container.style.backgroundColor = containerColor1
app.appendChild(container)

card.setAttribute('class', 'card')
 
//h1.style.backgroundColor = colorHead1
h1.style.color = "black"

setColors(containerColor1, colorHead1)
 
btn.innerHTML = "Hit me!" 
btn.setAttribute('class', 'button')

inputField.setAttribute("type", "text");
inputField.setAttribute("value", "Hello World!");


let initialUrl = "https://api.noopschallenge.com"
let myUrl = initialUrl //"https://api.noopschallenge.com"
let Rubrik = ""
let nextQuestion = ""
let firstTime = true


//function setUrl(url){
//  myUrl = "https://api.noopschallenge.com"+url
//}


function setTexts(heading, content){
  h1.textContent = heading
  p.textContent = content
}
function setColors(containerColor, h1Color){
  container.style.backgroundColor = containerColor
  h1.style.backgroundColor = h1Color
}

function initialFizz(){
  myUrl += "/fizzbot"
  //console.log(myUrl)
  
  fetch(myUrl)
  .then(function(response) {
      return response.json();
  })
  .then(function(myJson) {
  
  setTexts("Welcome stranger!", myJson.message)
  myUrl = initialUrl + myJson.nextQuestion
  })
  firstTime = false
}

//  postData('http://example.com/answer', {answer: 42})
//  .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
//  .catch(error => console.error(error));

function postData(url = '', data = {}) {
  // Default options are marked with *
    return fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json()); // parses JSON response into native JavaScript objects 
}

function setStuff(myResult, myMessage, nextQuestion){
setTexts(myResult, myMessage)
setColors(containerColor2, colorHead2)
myUrl = initialUrl + nextQuestion
}

function pressedBtn() {
console.log("Firsttime: "+firstTime)
  if(firstTime){
    initialFizz()
  } else {
    postData(myUrl, {answer: inputField})
    .then(data => setStuff(data.result, data.message, data.nextQuestion)) // JSON-string from `response.json()` call
    .catch(error => console.error(error))
  }
  /*
  {"result":"correct","message":"Of course. How interesting. Are you ready for your first REAL question?","nextQuestion":"/fizzbot/questions/bWxOgBqSA0dkSP7ElkazujaKdwdDx2uWDgQV-f9Q0MQ"}
  */
}

initialFizz()
btn.addEventListener("click", pressedBtn);

container.appendChild(card)
card.appendChild(h1)
card.appendChild(p)
card.appendChild(inputField)
card.appendChild(btn)