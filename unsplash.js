// API_KEY
window.API_KEY_UNSPLASH = '9f437e9a2441442665cd4e650cd7a55fdd2c6d1ad6ad28474ed558a4ad3ffc13'
// Api URL
window.API_URL_UNSPLASH = 'https://api.unsplash.com'
// URL GET_RANDOM_IMAGES
var GET_RANDOM_IMAGE = API_URL_UNSPLASH + '/photos/random?client_id=' + API_KEY_UNSPLASH
//
// Main de la aplicación
window.MAIN = document.getElementById('main')

// Serealiza la imagen de acuerdo a un tipo
// en respuesta a la petición de la API UNSPLASH
// puede recibir como argumentos un array, de datos
// en respuesta, o un único objeto
function serealizeImage(data, type){
 if( Array.isArray(data) ) return data.map(function(dataImage){ 
  return serealizeImage(dataImage, type) 
 })
 type = type || 'raw'
 return data.urls[type]
}
// Obtiene una imagen
// random de la API UNSPLASH
// recibe como parámetro el tipo
// ya que la respuesta del servidor, puede
// obtenerse en raw, small, regular, thumb, full
function getRandomImage(type, count){
 var $GET_RANDOM_IMAGE = GET_RANDOM_IMAGE 
 if( typeof count === 'number' ) $GET_RANDOM_IMAGE = GET_RANDOM_IMAGE + '&count=' + count
  // debugger
 return new Promise(function(resolve, reject){
  fetch($GET_RANDOM_IMAGE)
   .then(function(response){ return response.json() })
    .then(function(dataUnsplash){ return resolve( serealizeImage(dataUnsplash, type) ) })
     .catch(function(error){
      console.log(error)
      // Archivo local
      resolve( serealizeImage(defaultData) )
     })
 })
}

// Crea la vista para la imagen
function createImage(src, tag){
 tag = tag || 'img'
 var img = document.createElement(tag)
 if(tag === 'img'){
  img.setAttribute('src', src)
  img.setAttribute('class', 'img-unsplash')
 }else{
  img.style.backgroundImage = 'url(' + src + ')'
  img.setAttribute('class', 'bg-unsplash')
 }
 return img
}

function createImageWithGrid(src, tag){
 var img = createImage(src, tag)
 var containerImg = document.createElement('div')
 containerImg.setAttribute('class', 'container-img')
 containerImg.appendChild(img)
 return containerImg
}

// Crea la vista para guardar las imágenes
function createViewRandomImage(src, tag){
 var img = createImageWithGrid(src, tag)

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
 img.appendChild(panelShadow)
 return img
 // console.log({ control, statusApplication })
}

function mountRandomImage(container, dataOrSrc, tag){
 var wrapperImages = getSaveContainer('random-images')
 // debugger
 if( !wrapperImages ){
  wrapperImages = document.createElement('div')

  if( Array.isArray(dataOrSrc) ){
   dataOrSrc.map(function(src){
    wrapperImages.appendChild( createViewRandomImage(src, tag) )
   })
  }else{
   wrapperImages.appendChild( createViewRandomImage(dataOrSrc, tag) ) 
  }

  saveContainer(wrapperImages, 'random-images')
 }

 return container.appendChild( wrapperImages )
}

function getAndMountRandomImages(container, type, count, tag){
 count = count !== undefined && typeof count == 'number' && count <= 30 ? count : 10
 return getRandomImage(type, count).then(function(data){
  return mountRandomImage(container, data, tag)
 })
}

function getAndMountSavedImages(container, tag){
 var wrapperImagesSaved = getSaveContainer('save-images')
 if( !wrapperImagesSaved ){
  wrapperImagesSaved = document.createElement('div')
  return getImagesSaved().then(function(data){
   data.map(function(src){
    return wrapperImagesSaved.appendChild( createImageWithGrid(src, tag) )
   })
   saveContainer( wrapperImagesSaved )
   container.appendChild( wrapperImagesSaved )
  })
 }else{
  container.appendChild( wrapperImagesSaved )
 }
}

// Se suscribe a los cambios de 
// ficticios de URL de la aplicación
suscribe(function(path){
 clearMainContainer()
 // console.log(path)
 switch(path){
  case '/save-images':
   return getAndMountSavedImages(window.MAIN, 'div')
  case '/random-images':
  default: return getAndMountRandomImages(window.MAIN, 'small', null, 'div')
 }
})