window.API_KEY_UNSPLASH = '9f437e9a2441442665cd4e650cd7a55fdd2c6d1ad6ad28474ed558a4ad3ffc13'
window.API_URL_UNSPLASH = 'https://api.unsplash.com'

var GET_RANDOM_IMAGE = API_URL_UNSPLASH + '/photos/random?client_id=' + API_KEY_UNSPLASH
var containerData = window.CONTAINER_DATA = document.getElementById('container-images-random')
var statusApplication

function removeElement(element){
 var parent = element.parentElement
 if( parent ) parent.removeChild(element)
}

function removeImages(){
 while( containerData.firstChild ){
  containerData.removeChild( containerData.firstChild )
 }
}

function mountImage(src, tag, control){

 if( Array.isArray(src) ) return src.map(function(s, i){
  if( i === src.length ) statusApplication = 'ready'
  return mountImage(s, tag, i !== ( src.length - 1 ) ) 
 })

 tag = tag || 'img'
 var img = document.createElement(tag)
 if( tag === 'img' ){
  img.setAttribute('class', 'img-unsplash')
  img.setAttribute('src', src)
 }else{
  img.style.backgroundImage = 'url(' + src + ')'
  img.setAttribute('class', 'bg-unsplash')
 }

 var containerImg = document.createElement('div')
 containerImg.setAttribute('class', 'container-img')
 containerImg.appendChild(img)

 var panelShadow = document.createElement('div')
 panelShadow.setAttribute('class', 'panel-shadow')
 // Button Save
 var buttonSave = document.createElement('button')
 buttonSave.setAttribute('class', 'button button-save')
 buttonSave.appendChild( document.createTextNode('Guardar') )
 buttonSave.onclick = function onClick(){
  saveImage(src)
 }
 // Button Show
 var buttonShow = document.createElement('a')
 buttonShow.setAttribute('class', 'button button-show')
 buttonShow.setAttribute('target', 'blank')
 buttonShow.setAttribute('href', src)
 buttonShow.appendChild( document.createTextNode('Ver en grande') )

 panelShadow.appendChild(buttonShow)
 panelShadow.appendChild(buttonSave)
 containerImg.appendChild(panelShadow)
 containerData.appendChild(containerImg)
 if( !!!control ) statusApplication = 'ready'
 // console.log({ control, statusApplication })
 return img
}

function serealizeImage(data, type){
 if( Array.isArray(data) ) return data.map(function(dataImage){ 
  return serealizeImage(dataImage, type) 
 })
 type = type || 'raw'
 return data.urls[type]
}

function getRandomImage(type, count){
 var $GET_RANDOM_IMAGE = GET_RANDOM_IMAGE 
 if( typeof count === 'number' ) $GET_RANDOM_IMAGE = GET_RANDOM_IMAGE + '&count=' + count
  // debugger
 return fetch($GET_RANDOM_IMAGE)
  .then(function(response){ return response.json() })
   .then(function(dataUnsplash){ return serealizeImage(dataUnsplash, type) })
    .catch(function(error){ throw error })
}

function getAndMountRandomImage(type, count, tag){
 count = count != undefined && typeof count == 'number' ? count : 10
 removeImages()
 statusApplication = 'loading'
 var loadingElement = document.createElement('span')
 loadingElement.setAttribute('class', 'loading')
 loadingElement.appendChild( document.createTextNode('Cargando...') )
 // containerData.appendChild( loadingElement )
 var st = setTimeout(function(){
  if( statusApplication === 'ready' ){
   // removeElement( loadingElement )
   console.log('Application it\'s ready')
   // clearTimeout(st)
  }
 }, 10)

 getRandomImage(type, count)
  .then(function(data){ return mountImage(data, tag) })
}