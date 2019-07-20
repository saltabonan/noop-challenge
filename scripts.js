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
getBtn.innerText = 'Get: me going!'
postBtn.setAttribute('id', 'postBtn')
postBtn.innerText = 'Post: Get me going!'

myInput.setAttribute('class', 'input')
myInput.setAttribute('id', 'myInput')

let initialUrl = "https://api.noopschallenge.com"
let myUrl = ""
let firstTime = true
let myHeading = ""
let myBody = ""

//----------------
// KÖR IGÅNG ALLT
//----------------

// ---------------------------------
//Funktion för att hämta från API
//
function fetchingWithGET(myUrl) {
  console.log("+++ fetchingWithGET")
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
//Funktion för att skicka/posta till API och få tillbaka svar
//
function fetchingWithPOST(url = '', data = {}) {
  console.log("--- fetchingWithPOST")
  
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
// BUTTONS - funktion som kan ropas på från knapparna för att skicka svar eller hämta nästa fråga
// 
function removingChilds(){
  // var children = app.childNodes;
  // children.forEach(function(item){
  //   console.log(item);
  // })

  console.log("--- Removing!")
  // if(container.hasChildNodes()){
  //   container.removeChild(exampleDiv)
  // }
  app.removeChild(navbar)
  app.removeChild(container)
  app.removeChild(footer)
}

function removeElement(elementId) {
    // Removes an element from the document
    let element = document.getElementById(elementId)
    element.parentNode.removeChild(element)
}

function postAnswerBtn() {
  fetchingWithPOST(myUrl, {answer: document.getElementById("myInput").value})
  //removingChilds()
}
function getNextQuestionBtn() {
  //removingChilds()
  fetchingWithGET(myUrl)
}

// ---------------------------------
// Funktion för att köra igång allt
//
function myInit(){
  fetchingWithGET(myUrl)
}

// ---------------------------------
// 

function showNextQuestion(){
  //fetchingWithGET(myUrl, "Från showNextQuestion och genom fetchingWithGET...")
  postBtn.innerText = 'Post: Send my awesome answer!'
  postBtn.addEventListener("click", postAnswerBtn)
  
  container.insertBefore(myInput, getBtn)
}

function setTexts(response){
  //console.log("+ setTexts: "+ JSON.stringify(response))

//----------
  // NY FRÅGA

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
        console.log(key + " -> " + response[key])
        /*
        let h2 = document.createElement('h2')
        let p = document.createElement('p')
        myHeading = shiftadHeading
        myBody =  response.message.substring(lengthOfHeading + 1, response.message.length)
        h1.textContent = myHeading
        //p.textContent = myBody
        h2.textContent = key
        p.textContent = response[key]
        
        container.appendChild(h2)
        container.appendChild(p)*/
      }
    }

    if(!firstTime){
      postBtn.innerText = 'Post: Send my awesome answer!'
      postBtn.addEventListener("click", postAnswerBtn)
      container.insertBefore(myInput, getBtn)
    }
  
  
    getBtn.addEventListener("click", getNextQuestionBtn)

    let extraDiv = document.createElement("div")
    extraDiv.setAttribute('id', 'extraDiv')

    if(response.exampleResponse){
      console.log("Ett exempel! ")
      // if(document.getElementById("exampleDiv")){
      //   console.log("tar bort exampleDiv...")
      //   container.removeChild(exampleDiv)
      // }
      
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
      //let myNumbers = JSON.stringify(response.numbers)
      let myNumbers = response.numbers
      console.log("+ myNumbers är : " + myNumbers)
      
      let myNumbersLength = myNumbers.length
      
      for (index = 0; index < myNumbersLength; index++) { 
        if(index == myNumbersLength-1){
        //  console.log("Sista numret: " + myNumbers[index])
          numbersNodeP.textContent += myNumbers[index]
        } else {
        //  console.log("Mitt nummer: " + myNumbers[index])
          numbersNodeP.textContent += myNumbers[index] + ", "
        }
      }
      
      
      
      numbersDiv.appendChild(numbersNodeH2)
      numbersDiv.appendChild(numbersNodeP)
      extraDiv.appendChild(numbersDiv)
    } 

    if(!firstTime){
      container.appendChild(extraDiv)
      container.removeChild(getBtn)
      container.appendChild(postBtn)
      container.insertBefore(myInput, postBtn)
      document.getElementById("myInput").value = ''
    }

  //-------------------------
  // SVAR: RÄTT!
  
  } else if(response.result){
    console.log("response.result : " + response.result)
    
    //removeElement(document.getElementById("extraDiv"))
    
    let myResult = response.result.charAt(0).toUpperCase() + response.result.slice(1)
    let myMessage = response.message
    
    if(response.result == "correct"){
      console.log("Mitt svar var rätt")
      
      myHeading = myResult
      myBody = myMessage
      h1.textContent = myHeading
      container.removeChild(h2)
      p.innerText = myBody

      container.removeChild(extraDiv)
      container.removeChild(myInput)
      container.removeChild(postBtn)
      container.appendChild(getBtn)
      getBtn.innerText = 'Get: YES'
      getBtn.addEventListener("click", getNextQuestionBtn)

  //-------------------------
  // SVAR: FEL...

    } else {
      console.log("Åh, nej....")

      h1.innerText = myResult
      h2.innerText = "Lets try again, shall we?\n" + myHeading
      p.innerText = myBody

      container.appendChild(postBtn)
      
      container.insertBefore(myInput, postBtn)
      postBtn.innerText = 'Post: Hit me!'
      postBtn.addEventListener("click", postAnswerBtn)
    }
  }

//------------------------------------------------
// SÄTT URL så att den blir rätt till nästa fråga
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

setUrl("/fizzbot")
myInit()
