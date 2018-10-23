$(document).ready(function load(){

 alert('Documento listo!!!')

})

$('#MyElement').addClass('active')

$('#Other-Element').animate({
 height: '200px'
}, 5000)

$.each([1, 2, 3, 4, 5, 6], function _each(num, index){
 console.log('Número: ' + num + ', Índice: ' + index)
})