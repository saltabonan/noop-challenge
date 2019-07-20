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
  //console.log("+++ fetchingWithGET")
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
  ///console.log("--- fetchingWithPOST")
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

function myInit(){

  if(firstTime == false){
    app.removeChild(navbar)
    app.removeChild(container)
    app.removeChild(footer)

    firstTime = true
  }
  fetchingWithGET(myUrl)
}

// ---------------------------------
// 

function showNextQuestion(){
  postBtn.innerText = 'Send my awesome answer!'
  postBtn.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault()
      alert('Enter!')
      postAnswerBtn()
    }
  })
  postBtn.addEventListener("click", postAnswerBtn)
  
  container.insertBefore(myInput, getBtn)
}

function setTexts(response){
  //-----------------
  // NEW QUESTION

  if(!response.result){
    let myMessage = response.message
    let res = response.message.split("\n")
    let shiftadHeading = res.shift()
    let lengthOfHeading = shiftadHeading.length

    container.appendChild(h1)
    myHeading = shiftadHeading
    myBody =  response.message.substring(lengthOfHeading + 1, response.message.length)
    
    if(firstTime){
      h1.textContent = "Welcome stranger!" 
      h2.textContent = myHeading
      p.textContent = myBody
    } else if(!response.result) {
      h1.textContent = "New question" 
      h2.textContent = myHeading
      p.textContent = myBody
    } else if(response.result){
      h1.textContent = "Answer"
    }

    container.appendChild(h1)
    container.appendChild(h2)
    container.appendChild(p)
    container.appendChild(getBtn)
    
    app.appendChild(navbar)
    app.appendChild(container)
    app.appendChild(footer)

    
    for (let key in response) {
      if (response.hasOwnProperty(key)) {
        //console.log(key + " -> " + response[key])
      }
    }

    if(!firstTime){
      postBtn.innerText = 'Send my awesome answer!'
      postBtn.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
         event.preventDefault()
         alert('Enter!')
         postAnswerBtn()
        }
      })
      postBtn.addEventListener("click", postAnswerBtn)
      
      container.insertBefore(myInput, getBtn)
    }
  
    getBtn.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
        event.preventDefault()
        alert('Enter!')
        getNextQuestionBtn()
      }
    })
    getBtn.addEventListener("click", getNextQuestionBtn)

    let extraDiv = document.createElement("div")
    extraDiv.setAttribute('id', 'extraDiv')

    if(response.exampleResponse){
      let exampleDiv = document.createElement("div")
      let exampleNodeH2 = document.createElement("h2")
      let exampleNodeP = document.createElement("p")
      exampleDiv.setAttribute('id', 'exampleDiv')

      exampleNodeH2.textContent = "Example:"
      exampleNodeP.textContent = JSON.stringify(response.exampleResponse.answer)
      
      exampleDiv.appendChild(exampleNodeH2)
      exampleDiv.appendChild(exampleNodeP)
      extraDiv.appendChild(exampleDiv)
    }

    if(response.rules){
      
      let rulesDiv = document.createElement("div")
      let rulesNodeH2 = document.createElement("h2")
      let rulesNodeP = document.createElement("p")
      rulesDiv.setAttribute('id', 'rulesDiv')

      rulesNodeH2.textContent = "Rules:"
      rulesNodeP.textContent = JSON.stringify(response.rules)
      
      rulesDiv.appendChild(rulesNodeH2)
      rulesDiv.appendChild(rulesNodeP)
      extraDiv.appendChild(rulesDiv)
    } 

    if(response.numbers){
      
      let numbersDiv = document.createElement("div")
      let numbersNodeH2 = document.createElement("h2")
      let numbersNodeP = document.createElement("p")
      numbersDiv.setAttribute('id', 'numbersDiv')

      numbersNodeH2.textContent = "Numbers:"

      // ---------------------------------------------------------------
      // calculate which rules apply and how the numbers will be added

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
        
        // ----
        // Adding the numbers in a readable matter on the site
        if(index == myNumbersLength-1){
          numbersNodeP.textContent += myNumbers[index]
        } else {
          numbersNodeP.textContent += myNumbers[index] + ", "
        }
        // ----

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
        console.log("")
      }
      // trim the whitespace at the end of the string
      let newStr = stringToPlaceInInputfield.replace(/(^\s+|\s+$)/g,'')
      document.getElementById("myInput").value = newStr

      // --------
      
      numbersDiv.appendChild(numbersNodeH2)
      numbersDiv.appendChild(numbersNodeP)
      extraDiv.appendChild(numbersDiv)
    } 

    if(!firstTime){
      container.appendChild(extraDiv)
      container.removeChild(getBtn)
      container.appendChild(postBtn)
      container.insertBefore(myInput, postBtn)
    }

  //-------------------------
  // Answer: Right!
  
  } else if(response.result){
    let myResult = response.result.charAt(0).toUpperCase() + response.result.slice(1)
    let myMessage = response.message
    
    if(response.result == "correct"){
      myHeading = myResult
      myBody = myMessage
      h1.textContent = myHeading
      container.removeChild(h2)
      p.innerText = myBody

      container.removeChild(extraDiv)
      container.removeChild(myInput)
      container.removeChild(postBtn)
      container.appendChild(getBtn)
      getBtn.innerText = 'YES'
      getBtn.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
          event.preventDefault()
          alert('Enter!')
          getNextQuestionBtn()
        }
      })
      getBtn.addEventListener("click", getNextQuestionBtn)
      

  //--------------------------------------
  // Answer: Congrats! You are all done!

      } else if (response.result == "interview complete") {
        
        h1.innerText = "CONGRATULATIONS!\n"
        h2.innerText = myResult
        p.innerText = "You are a noop!"
        container.removeChild(extraDiv)
        container.removeChild(myInput)
        container.removeChild(postBtn)
        
        container.appendChild(getBtn)

        setUrl("/fizzbot")
        getBtn.innerText = 'Start all over again'
        getBtn.addEventListener("keyup", function(event) {
          if (event.keyCode === 13) {
            event.preventDefault()
            alert('Enter!')
            myInit()
          }
        })
        getBtn.addEventListener("click", myInit)

  //-------------------------
  // Answer: Wrong...

    } else {
      h1.innerText = myResult
      h2.innerText = "Lets try again, shall we?\n" + myHeading
      p.innerText = myBody

      container.appendChild(postBtn)
      
      container.insertBefore(myInput, postBtn)
      postBtn.innerText = 'Hit me!'
      postBtn.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
          event.preventDefault()
          alert('Enter!')
          postAnswerBtn()
        }
      })
      postBtn.addEventListener("click", postAnswerBtn)
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

function setUrl(url){
  if(url){
    myUrl = initialUrl+url
    return myUrl
  }
}

//--------------------------
// Starting up everything:
//--------------------------
setUrl("/fizzbot")
myInit()

//--------------------------
//--------------------------
