//-----------
// VARIABLES
//-----------
const app = document.getElementById('root')
const navbar = document.createElement('header')
const container = document.createElement('div')
const h1 = document.createElement('h1')
const h2 = document.createElement('h2')
const p = document.createElement('p')
const footer = document.createElement('div')
const myInput = document.createElement('input')
const getBtn = document.createElement('BUTTON')
const postBtn = document.createElement('BUTTON')

navbar.setAttribute('class', 'section')
container.setAttribute('class', 'section')
footer.setAttribute('id', 'footer')

getBtn.setAttribute('id', 'getBtn')
getBtn.innerText = 'Get me going!'
postBtn.setAttribute('id', 'postBtn')
postBtn.innerText = 'Post me going!'

myInput.setAttribute('class', 'input')
myInput.setAttribute('id', 'myInput')

let initialUrl = "https://api.noopschallenge.com"
let myUrl = ""
let firstTime = true
let myHeading = ""
let myBody = ""

// ---------------------------------
// Fetching from API
//
function fetchingWithGET(myUrl) {
  fetch(myUrl)
  .then(function(response) {
      return response.json()
  })
  .then(function(myJson) {  
    //console.log("Getting: " + JSON.stringify(myJson))
    //showResponseFromAnswer(myJson, myJson.nextQuestion)
    setTexts(myJson)
  })
}
// -----------------------------------------------------------
// Sending/posting to API
//
function fetchingWithPOST(url = '', data = {}) {
  return fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(data => setTexts(data))//showresponseFromPost(data.result, data.message, data.nextQuestion))//, console.log("Getting from post: " + JSON.stringify(data)))
  .catch(error => console.error('Error:', error))
}

// ---------------------------------
// My init function
// ---------------------------------

function myInit(){
  setUrl("/fizzbot")
  fetchingWithGET(myUrl)
  setEventlistenerGet()
  setEventlistenerPost()
}

// ------------------------------------------
// BUTTONS - functions for call from buttons
// 
function postAnswerBtn() {
  fetchingWithPOST(myUrl, {answer: document.getElementById("myInput").value})
}
function getNextQuestionBtn() {
  fetchingWithGET(myUrl)
}

// ---------------------------------
// EVENT listeners

function setEventlistenerGet(){
  if (firstTime != true){
    firstTime = true
    getBtn.removeEventListener("click", myInit)
  }
  getBtn.addEventListener("click", getNextQuestionBtn)
}

function setEventlistenerPost(){
  postBtn.addEventListener("click", postAnswerBtn)
}

function setEventlistALLOVERagain(){
  getBtn.removeEventListener("click", getNextQuestionBtn)
  getBtn.addEventListener("click", myInit)
}

function appendNewQuestion(response){
  // Splits message at first new line and sets the first as heading and the rest att body
  let myMessage = response.message
  let res = response.message.split("\n")
  let shiftadHeading = res.shift()
  let lengthOfHeading = shiftadHeading.length

  myHeading = shiftadHeading
  myBody =  response.message.substring(lengthOfHeading + 1, response.message.length)

  //Appending stuff
  container.appendChild(h1)
  container.appendChild(h2)
  container.appendChild(p)
  container.appendChild(getBtn)
  
  app.appendChild(navbar)
  app.appendChild(container)
  app.appendChild(footer)

  // --------------------------------
  // If new question and the message contains example of how to respond, then show:
  let extraDiv = document.createElement("div")
  extraDiv.setAttribute('id', 'extraDiv')
  let exampleDiv = document.createElement("div")
  
  for (let key in response) {
    //console.log(key + " -> " + response[key])

    if(response.hasOwnProperty(key) && key == "message"){
      
      if(firstTime){
        h1.textContent = "Welcome stranger!"
      } else {
        h1.textContent = "New question"
      }
      h2.textContent = myHeading
      p.textContent = myBody
    }
    if (response.hasOwnProperty(key) && key != "message") {
      let h2 = document.createElement('h2')
      let p = document.createElement('p')
      myHeading = shiftadHeading
      myBody =  response.message.substring(lengthOfHeading + 1, response.message.length)
      
      h2.textContent = setUppercase(key)
      
      if(key == "numbers"){
        let myNumbers = response.numbers
        // ----
        // Adding the numbers in a readable matter on the site
        for (index = 0; index < myNumbers.length; index++) { 
          if(index == myNumbers.length-1){
            p.textContent += myNumbers[index]
          } else {
            p.textContent += myNumbers[index] + ", "
          }
        } 
        // ----
      } else {
        p.textContent = JSON.stringify(response[key])
      }
      
      exampleDiv.appendChild(h2)
      exampleDiv.appendChild(p)
    }
    extraDiv.appendChild(exampleDiv)
  }
  // If new question and not first time:
  if(!firstTime){
    postBtn.innerText = 'Send my awesome answer!'
    container.appendChild(extraDiv)
    container.removeChild(getBtn)
    container.appendChild(postBtn)
    container.insertBefore(myInput, postBtn)
    if(response.exampleResponse){
      document.getElementById("myInput").value = "COBOL"
    } 
    if(response.numbers){
      document.getElementById("myInput").value = calculateNumbers(response)
    }
  }
}

//-----------------
// SETS TEXTS
//-----------------
function setTexts(response){
  //-----------------
  // NEW QUESTION
  // If no result, then it is a new question
  if(!response.result){
    h1.setAttribute('class', 'standard')
    appendNewQuestion(response)

  //-------------------------
  // RESULT!
  // Answer: Right!
  //
  } else if(response.result){
    // Sets result with Uppercase
    let myResult = setUppercase(response.result) 
    let myMessage = response.message
    
    if(response.result == "correct"){
      myHeading = myResult
      myBody = myMessage
      h1.setAttribute('class', 'correct')
      h1.textContent = myHeading
      container.removeChild(h2)
      p.innerText = myBody

      container.removeChild(extraDiv)
      container.removeChild(myInput)
      container.removeChild(postBtn)
      container.appendChild(getBtn)
      getBtn.innerText = 'YES, I want the next question!'

  //--------------------------------------
  // Answer: CONGRATS! You are all done!
  //
  } else if (response.result == "interview complete") {
    // Sets result with Uppercase
    let myResult = setUppercase(response.result)
    h1.setAttribute('class', 'complete')
    h1.innerText = myResult
    h2.innerText = "Grade: " + response.grade
    p.innerText = response.message
    container.removeChild(extraDiv)
    container.removeChild(myInput)
    container.removeChild(postBtn)
    
    container.appendChild(getBtn)

    setUrl("/fizzbot")
    getBtn.innerText = 'Start me all over again'
    setEventlistALLOVERagain()

  //-------------------------
  // Answer: Wrong...
  //
  } else {
    h1.setAttribute('class', 'wrong')
    h1.innerText = myResult
    h2.innerText = "Lets try again, shall we?\n" + myHeading
    p.innerText = myBody

    container.appendChild(postBtn)
    
    container.insertBefore(myInput, postBtn)
    postBtn.innerText = 'Hit me!'
  }
}

//------------------------------------------------
// Set URL to make it right for the next question
//
  if(response.nextQuestion){
    setUrl(response.nextQuestion)
  }

  firstTime = false
}

function calculateNumbers(response){
  let myRules = response.rules
  let myRulesLength = myRules.length
  let myNumbers = response.numbers
  let myNumbersLength = myNumbers.length
  let temp
  let stringToPlaceInInputfield = ""
  
  // Loop for all numbers and check if the rules apply
  for (index = 0; index < myNumbersLength; index++) { 
    let checkNumber
    temp = myNumbers[index]
    let myRule
    let lastRule

    // Loop through rules
    for (i = 0; i < myRulesLength; i++) { 
      myRule = myRules[i].response
      checkNumber = (myNumbers[index]/myRules[i].number)
      // ----
      // Calculate the fizzbuzz-matter
      if (checkNumber == Math.floor(checkNumber)) {
        // divisible with itself            
        if(lastRule){
          temp += myRule
        } else {
          temp = myRule
        }
        lastRule = myRule
      }
    }
    stringToPlaceInInputfield += temp + " "
  }
  // trim the whitespace at the end of the string
  let newStr = stringToPlaceInInputfield.replace(/(^\s+|\s+$)/g,'')
  return newStr

}

function setUppercase(result){
  let myUpper = result.charAt(0).toUpperCase() + result.slice(1)
  return myUpper
}

function setUrl(url){
  if(url){
    myUrl = initialUrl+url
    return myUrl
  }
}

//--------------------------
// Starting up everything:
//--------------------------

myInit()

//--------------------------
//--------------------------
