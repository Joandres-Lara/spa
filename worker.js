//
// Soluciones en Reorganización Administrativa, S.A. de C.V.
// Joan Andrés Lara Mora
//
var worker = new Worker('w1.js')

worker.addEventListener('message', function message(e){
 console.log(e)
})

function sendWorker(){
 worker.postMessage('Hello world!!!')
}