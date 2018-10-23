var _false = false
var _true = true
var _rightOperator = 'Vaya...'
var _undefined = undefined
var obj = new Object()

true && _false // False
_true || false // true

_true && _rightOperator // Vaya...
_undefined || _rightOperator // Vaya...
_true || _rightOperator // true
_false && obj // false
_true && _rightOperator && obj // Object {}
_false || _rightOperator || obj // Vaya...

[], '', null, undefined // false
[] == 0 // true
'' == 0 //true
[] == '' // true
{} == 0 // Syntax Error