var dbInstance = openDatabase('database-test', '1.0', 'Client database', 2 * 1024 * 1024 )

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

function getImagesSaved(cb){
 // return new Promise(function(resolve, reject){
 //  dbInstance.transaction(function selectAllImages(transaction){
 //   transaction.executeSql('SELECT * FROM images', [], resolve)
 //  })
 // })
 dbInstance.transaction(function selectAllImages(transaction){
  transaction.executeSql('SELECT * FROM images', [], cb)
 })
}