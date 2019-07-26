// Get the <ul> element with id="myList"
var list = document.getElementById("myList");

// If the <ul> element has any child nodes, remove its first child node
if (list.hasChildNodes()) {
  list.removeChild(list.childNodes[0]);
}

    function deleteChild() { 
        var e = document.querySelector("ul"); 
        var first = e.firstElementChild; 
        while (first) { 
            first.remove(); 
            first = e.firstElementChild; 
        } 
    } 
    var btn = document.getElementById( 
      "btn").onclick = function() { 
        deleteChild(); 
    } 




    // -------------------
  // Attributes! 
  
  if(getBtn.attributes.events.value == "removing"){
    //console.log("getBtn.attributes.events.value: " + getBtn.attributes.events.value)
    getBtn.removeEventListener("click", removingStuff)
    //console.log("tar bort event listener")
    getBtn.addEventListener("click", settingHeadings)
    //console.log("sätter ny event listener")
    getBtn.setAttribute('events', "adding")
    //console.log("getBtn.attributes.events.value: " + getBtn.attributes.events.value)
    //console.log("")
  }
  
  console.log("+ Finns attributet events? : " + getBtn.hasAttribute("events"))
  console.log("+ getBtn.attributes[2]: " + getBtn.attributes[2].value)
  console.log("+ attributes: " + getBtn.attributes.events.value)
  
  var x = document.getElementById("getBtn");
  var txt = "";
  var i;
  for (i = 0; i < x.attributes.length; i++) {
    txt = x.attributes[i].name + " = " + x.attributes[i].value //+ "<br>"
    console.log(txt)
  }
  //document.getElementById("demo").innerHTML = txt;
  // -------------------

  //Removing stuff
  if(container.hasChildNodes()){
    console.log("- container.hasChildNodes()!")
    // container.removeChild(h1)
    // container.removeChild(h2)
    // container.removeChild(myDiv)

    deleteChild(container)
    addButton("Lägg till grejer!")
    //getBtn.addEventListener("click", settingStuff)
    //getBtn.setAttribute('events', "adding")
  }
  var list = document.getElementById("container")//.hasChildNodes()
  //console.log("Det finns barn! : " + list.childNodes[0])





  function setBtnEventlistener(){
  if(getBtn.attributes.events.value == "adding"){
    //console.log("getBtn.attributes.events.value: " + getBtn.attributes.events.value)
    getBtn.removeEventListener("click", settingHeadings)
    //console.log("tar bort event listener")
    getBtn.addEventListener("click", removingStuff)
    //console.log("sätter ny event listener")
    getBtn.setAttribute('events', "removing")
    //console.log("getBtn.attributes.events.value: " + getBtn.attributes.events.value)
    //console.log("")
  } else if(getBtn.attributes.events.value == "removing"){
    //console.log("getBtn.attributes.events.value: " + getBtn.attributes.events.value)
    getBtn.removeEventListener("click", removingStuff)
    //console.log("tar bort event listener")
    getBtn.addEventListener("click", settingHeadings)
    //console.log("sätter ny event listener")
    getBtn.setAttribute('events', "adding")
    //console.log("getBtn.attributes.events.value: " + getBtn.attributes.events.value)
    //console.log("")
  }