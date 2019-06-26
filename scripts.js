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

inputField.setAttribute("type", "text")
inputField.setAttribute("value", "Hello World!")
inputField.setAttribute("id", "myAnswer")


let initialUrl = "https://api.noopschallenge.com"
let myUrl = "" //"https://api.noopschallenge.com"
let Rubrik = ""
let nextQuestion = ""
let firstTime = true


function setUrl(url){
  myUrl = initialUrl+url
  console.log("setUrl: "+myUrl)
  return myUrl
}
setUrl("/fizzbot")


function setTexts(heading, content){
  h1.textContent = heading
  p.textContent = content
}
function setColors(containerColor, h1Color){
  container.style.backgroundColor = containerColor
  h1.style.backgroundColor = h1Color
}

function initialFizz(){
  fetch(myUrl)
  .then(function(response) {
      return response.json();
  })
  .then(function(myJson) {  
    setTexts("Welcome stranger!", myJson.message)
    //console.log("myJson: "+JSON.stringify(myJson))
    
    if(firstTime){
      setUrl(myJson.nextQuestion)
      //console.log("efter: "+myUrl)
      //console.log("myJson.nextQuestion: "+myJson.nextQuestion)
    }
    card.appendChild(inputField)
  })
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
  setUrl(nextQuestion)
  console.log("setStuff: "+myUrl)
}

function pressedBtn() {
  //console.log(firstTime)
  if(firstTime){
    //console.log("Min Url är: "+myUrl)
    initialFizz()
    firstTime = false
    //card.appendChild(inputField)
  } else {
    postData(myUrl, {answer: document.getElementById("myAnswer").value})
    // Jobba här: Bara ändra urlen om man har svarat korrekt, så att länken finns kvar att prova igen på -------> 
    .then(data => setStuff(data.result, data.message, data.nextQuestion)) // JSON-string from `response.json()` call
    .catch(error => console.error(error))
  }
  /*
  {"result":"correct","message":"Of course. How interesting. Are you ready for your first REAL question?","nextQuestion":"/fizzbot/questions/bWxOgBqSA0dkSP7ElkazujaKdwdDx2uWDgQV-f9Q0MQ"}

  {"message":"FizzBuzz is the name of the game.\nHere's a list of numbers.\nSend me back a string as follows:\nFor each number:\nIf it is divisible by 3, print \"Fizz\".\nIf it is divisible by 5, print \"Buzz\".\nIf it is divisible by 3 and 5, print \"FizzBuzz\".\nOtherwise, print the number.\n\nEach entry in the string should be separated by a space.\n\nFor example, if the numbers are [1, 2, 3, 4, 5], you would send back:\n\n{\n  \"answer\": \"1 2 Fizz 4 Buzz\"\n}\n","rules":[{"number":3,"response":"Fizz"},{"number":5,"response":"Buzz"}],"numbers":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],"exampleResponse":{"answer":"1 2 Fizz 4 Buzz..."}}


  */
}

initialFizz()
btn.addEventListener("click", pressedBtn);

container.appendChild(card)
card.appendChild(h1)
card.appendChild(p)
card.appendChild(inputField) 
card.appendChild(btn)

