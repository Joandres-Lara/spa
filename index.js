// Obtiene imágenes aleatorias y las muestra en un grid
// De 3 x 3
getAndMountRandomImage('small', null, 'div')

// Obtiene las imágenes guardadas
// en la base de datos
getImagesSaved(function cb(transaction, data){
 data = [].map.call(data.rows, function(image){
  return image.url
 })
 // console.log(data)
})