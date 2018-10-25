var elementsDeleted = {}
var elementsSaved = {}
var parents = {}
var i = 0

function saveContainer(container, key){
 key = key || i++
 elementsSaved[key] = container
 container.dataContainerSaved = key
}

function getSaveContainer(key){
 return elementsSaved[key]
}

function clearMainContainer(){
 while(window.MAIN.firstChild){
  var probableElementSave = window.MAIN.firstChild
  if( probableElementSave.dataContainerSaved ){
   var key = probableElementSave.dataContainerSaved
   if( key in elementsSaved ) elementsSaved[key] = window.MAIN.firstChild
  }

  window.MAIN.removeChild( window.MAIN.firstChild )
 }
}

suscribe(function(){
 console.log({ elementsSaved, elementsDeleted, parents })
})