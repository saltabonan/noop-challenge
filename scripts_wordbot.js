
console.log("Welcome! :D")

//-----------
// VARIABLES
//-----------
const app = document.getElementById('root')

const navbar = document.createElement('header')

const ul = document.createElement('ul')
const li1 = document.createElement('li')
const li2 = document.createElement('li')
const link1 = document.createElement('a')
const link2 = document.createElement('a')

const container = document.createElement('div')
const h1 = document.createElement('h1')
const h2 = document.createElement('h2')
const p = document.createElement('p')

let myDiv = document.createElement('div')
let emptyDiv = document.createElement('div')


const getBtn = document.createElement('BUTTON')

const footer = document.createElement('div')

let initialUrl = "https://api.noopschallenge.com"
let myUrl = ""

const mySetOfWords = [
"adjectives",
"adverbs",
"animals",
"common",
"compound",
"cats",
"dinosaurs",
"dogs",
"encouragement",
"fabrics",
"flowers",
"fruits",
"gemstones",
"genres",
"horses",
"instruments",
"knots",
"menu",
"moods",
"metals",
"nouns",
"objects",
"occupations",
"prepositions",
"rhymeless",
"sports",
"vegetables",
"verbs",
"verbs_past",
"weather",
"wrestlers"
]
let rand
let Placeholdervalue
let urlSet
let amountOfWords

function setMySet(){
  rand = Math.floor(Math.random() * mySetOfWords.length)
  Placeholdervalue = mySetOfWords[rand]
  urlSet = Placeholdervalue
  console.log("My set is: " + urlSet)
  amountOfWords = 10
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

setMySet()
setUrl("/wordbot?count=" + amountOfWords + "&set="+ urlSet)

// ---------------------------------
// Fetching from API
//
function fetchingWithGET(myUrl) {
  fetch(myUrl)
  .then(function(response) {
    return response.json()
    loadingFunc()
  })
  .then(function(myJson) {  
    //console.log("Getting: " + JSON.stringify(myJson))
    //showResponseFromAnswer(myJson, myJson.nextQuestion)
    setTextToPage(myJson)
  })
}
// -----------------------------------------------------------

//-----------------------
// Navigation bar
function navigationBar(){
  //console.log('Navigation bar : 1')
  ul.setAttribute('class', 'ul')
  link1.innerText = "FizzBuzz"
  link1.href = 'index.html'
  link2.innerText = "About Fizzes"
  link2.href = 'index.html'

  li1.appendChild(link1)
  li2.appendChild(link2)
  ul.appendChild(li2)
  ul.appendChild(li1)
  navbar.appendChild(ul)
}

function setTextToPage(response){
  //console.log('setTextToPage : 3')
  myDiv.setAttribute('class', 'margin-bottom')
  myDiv.setAttribute('id', 'extraDiv')
  
  for (let key in response) {
    if (response.hasOwnProperty(key)) {
      console.log(key + " -> " + response[key])
      let myHeading = setUppercase(key)
      let mySecondHeading = setUppercase(urlSet)
      let myBody = response[key]//JSON.stringify(response[key])
      
      h1.textContent = myHeading
      h2.innerText = mySecondHeading
      //p.textContent = myBody

      for (index = 0; index < myBody.length; index++) { 
        let p = document.createElement('div')
        p.innerText = myBody[index]
        myDiv.appendChild(p)
      }
    }
  }
  container.appendChild(myDiv)
  addButton()
  getBtn.addEventListener("click", removingStuff)
  container.appendChild(emptyDiv)
}
function addTextBtn(btnText = 'Ta bort lite grejer!'){
  getBtn.innerText = btnText
}

function addButton(btnText){
  //console.log("btnText: " + btnText)
  //console.log('Add button: 4')
  getBtn.setAttribute('id', 'getBtn')
  getBtn.setAttribute('class', 'greenBtn')
  
  addTextBtn(btnText)
  container.appendChild(getBtn)
}

function myFooter(){
  //console.log('Add footer: 5')
  footer.setAttribute('id', 'footer')

}

navigationBar()
myFooter()

function settingHeadings(){
  //console.log('settingHeadings')
  container.appendChild(h1)
  container.appendChild(h2)
  container.appendChild(myDiv)
  container.appendChild(emptyDiv)

  container.insertBefore(getBtn, emptyDiv)

}

function setEventRemoveStuff(){
  //console.log('setEventRemoveStuff')
  getBtn.removeEventListener("click", settingHeadings)
  getBtn.addEventListener("click", removingStuff)
  getBtn.setAttribute('events', "removing")
}



function deleteChild(element) { 
  let first = element.firstElementChild
  while (first) { 
    first.remove()
    first = element.firstElementChild
    //console.log("Removing!")
  } 
} 

function removingStuff(){
  // -------------------
  // Attributes! 
  getBtn.removeEventListener("click", removingStuff)
  getBtn.addEventListener("click", setEventRemoveStuff)
  getBtn.setAttribute('events', "adding")
 
  // var x = document.getElementById("getBtn");
  // var txt = "";
  // var i;
  // for (i = 0; i < x.attributes.length; i++) {
  //   txt = x.attributes[i].name + " = " + x.attributes[i].value //+ "<br>"
  //   console.log(txt)
  // }
  // -------------------

  //Removing stuff
  if(container.hasChildNodes()){
    deleteChild(container)
    addButton("Lägg till lite grejer")
    getBtn.addEventListener("click", settingStuff)
  }
  
}

function settingStuff(){
  container.setAttribute('class', 'section')
  container.setAttribute('id', 'container')
  
  //Appending stuff
  settingHeadings()

  addTextBtn("Ta bort allt igen!")
  app.appendChild(navbar)
  app.appendChild(container)
  app.appendChild(footer)

}

settingStuff()


// -------------------
// Fetching words!

fetchingWithGET(myUrl)

//
// -------------------

