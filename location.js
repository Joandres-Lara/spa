var currentURL = null
var suscribers = []

function updateSuscribers(path){
 suscribers.forEach(function(suscriber){
  return suscriber(path)
 })
}

function $location(path, force){
 var lastCurrentURL = currentURL
 currentURL = path

 if( force ) return updateSuscribers(path)

 if( currentURL != lastCurrentURL){
  updateSuscribers(path)
 }
}

function suscribe(fn){
 if( !fn.call ){
  throw new Error(fn + ' no es una función.')
  return false
 }
 suscribers.push(fn)
}

// Fake URL
window.addEventListener('load', function(){
 updateSuscribers('/')
})