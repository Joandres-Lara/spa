//
// Funciones
function myFunction(arg1){
 return 'arg1 vale: ' + arg1;
}

// Llamada de funciones
function factorial(num){
 if( num == 0 ) return 1
 if( num < -1 ) return 0
 return num * factorial(--num)
}

// Variables como funciones
var varFunction = function _varFunction(){
 return true
}

// Funciones anónimas
var varFunctionAnonymus = function(){
 return !!!true
}