var element = document.getElementById('element')

// Genera un color aleatorio
function randomColor(event){
 // Evento, que genera el DOM
 event.preventDefault()
 event.stopPropagation()
 var target = event.target
 var red = Math.floor( Math.random() * 255 )
 var green = Math.floor( Math.random() * 255 )
 var blue = Math.floor( Math.random() * 255 )
 target.style.backgroundColor = 'rgb(' + red + ', ' + green + ', ' + blue + ')'
}

// Manejador del evento
element.onclick = randomColor
element.onmouseover = randomColor