// Variables
const app = document.getElementById('root')
const navbar = document.createElement('div')
const container = document.createElement('div')
const card = document.createElement('div')
const h1 = document.createElement('h1')
const p = document.createElement('p')
const inputDiv = document.createElement('p')
const btnGet = document.createElement('BUTTON')
const inputField = document.createElement("INPUT");
const btnPost = document.createElement('BUTTON')

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
 
btnGet.innerHTML = "Get" 
btnGet.setAttribute('class', 'button')
btnGet.setAttribute("id", "myBtn")

btnPost.innerHTML = "Post" 
btnPost.setAttribute('class', 'button')
btnPost.setAttribute("id", "myBtnPost")

inputField.setAttribute("type", "text")
inputField.setAttribute("value", "Hello World!")
inputField.setAttribute("id", "myAnswer")


let initialUrl = "https://api.noopschallenge.com"
let myUrl = "" //"https://api.noopschallenge.com"
let Rubrik = ""
let nextQuestion = ""
let firstTime = true


function setUrl(url){
  if(url){
    myUrl = initialUrl+url
    console.log("setUrl: "+myUrl)
    return myUrl
  }
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

function setStuff(myResult, myMessage, nextQuestion){
  setTexts(myResult, myMessage)
  setColors(containerColor2, colorHead2)
  if(nextQuestion){
      setUrl(nextQuestion)   
      console.log("i if") 
  }
  document.getElementById("myAnswer").value = ''
  console.log("+++ setStuff, myUrl: "+myUrl)
}

function getFizz(){
  
  fetch(myUrl)
  .then(function(response) {
      return response.json();
  })
  .then(function(myJson) {  
    console.log("myJson: "+JSON.stringify(myJson))
    if(firstTime){
      setTexts("Welcome stranger!", myJson.message)
      setUrl(myJson.nextQuestion)
    } else {
      setTexts(myJson.result, myJson.message)
      //card.appendChild(inputField)
      //document.getElementById("myAnswer").style.order = "1";
      //document.getElementById("myBtn").style.order = "2";
    }    
  })
}

function postData(url = '', data = {}) {
  // Default options are marked with *
  console.log("inne i postData")
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

function pressedBtnGet() {
  getFizz()

  if(firstTime){
    firstTime = false
  }
}

function pressedBtnPost() {
  postData(myUrl, {answer: document.getElementById("myAnswer").value})
  .then(data => setStuff(data.result, data.message, data.nextQuestion), console.log("my data from post: "+JSON.stringify(data))) 
  .catch(error => console.error(error))
}

getFizz()
btnGet.addEventListener("click", pressedBtnGet);
btnPost.addEventListener("click", pressedBtnPost);

container.appendChild(card)
card.appendChild(h1)
card.appendChild(p)
card.appendChild(btnGet)
card.appendChild(inputDiv)
inputDiv.appendChild(inputField) 
inputDiv.appendChild(btnPost)

