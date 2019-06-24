const app = document.getElementById('root')

const navbar = document.createElement('div')
navbar.setAttribute('class', 'navbar')
navbar.style.backgroundColor = '#212F3C'
navbar.textContent = "Fizzy bot engaged"
      
app.appendChild(navbar)


const container = document.createElement('div')
container.setAttribute('class', 'container')
container.style.backgroundColor = '#784212'
      
app.appendChild(container)

const card = document.createElement('div')
card.setAttribute('class', 'card')
 
const h1 = document.createElement('h1')
h1.style.backgroundColor = '#FAD7A0'
h1.style.color = "black"
 
const p = document.createElement('p')

var btn = document.createElement("BUTTON")
btn.innerHTML = "Click me!" 
btn.setAttribute('class', 'button')

fetch('https://api.noopschallenge.com/fizzbot')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    //console.log(JSON.stringify(myJson));
	h1.textContent = "Hej kompis!"
	p.textContent = myJson.message
	//btn.onclick="myFunction()
     
  });
  
  container.appendChild(card)
  card.appendChild(h1)
  card.appendChild(p)
  card.appendChild(btn)
  
  btn.addEventListener("click", myFunction);

function myFunction() {
  //alert ("Hello World!");
  //document.getElementById('p').textContent = Testar att sätta ny text här."
  document.querySelector('#p').textContent = Testar att sätta ny text här."
}