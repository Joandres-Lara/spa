//
// Agregamos una tabla
//
var existTable = false
function addTable(root){
 // Sólo una tabla
 if( existTable ) return
 existTable = true
 root = root || document.getElementById('data')
 var table = document.createElement('table')
 table.setAttribute('class', 'table')
 root.appendChild( table )
}