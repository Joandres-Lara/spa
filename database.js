var dbInstance = openDatabase('database-test', '1.0', 'Client database', 2 * 1024 * 1024 )
var lastContainerRemoved
window.MAIN = document.getElementById('main')

dbInstance.transaction(function createTable(transaction){
 transaction.executeSql('CREATE TABLE IF NOT EXISTS images(url unique)')
})

function saveImage(url){
 // console.log(url)
 dbInstance.transaction(function addImageDatabase(transaction){
  // debugger
  transaction.executeSql('INSERT INTO images VALUES (?)', [url])
 })
}

function handleTransaction(cb){
 return function selectAllImages(transaction){
  transaction.executeSql('SELECT * FROM images', [], function _cb(trans, data){
   // debugger
   data = [].map.call(data.rows, function map(image){
    return image.url
   })
   return cb(data)
  })
 }
}

function getImagesSaved(cb){

 if( !!!cb ){
  return new Promise(function(resolve){
   dbInstance.transaction( handleTransaction(resolve) )
  })
 }

 if( !cb.call ){
  throw new Error( cb + 'no es una función')
 }

 dbInstance.transaction( handleTransaction(cb) )
}