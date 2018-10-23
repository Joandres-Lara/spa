// Before
function myFunction(arg1){
 return arg1
}
// After
var arrowFunction = (arg1) => arg1

// Before
function factorial(num){
 if( num == 0 ) return 1
 if( num < -1 ) return 0
 return num * factorial(--num)
}
// After
var factorial = (num) => {
 if( num == 0 ) return 1
 if( num < -1 ) return 0
 return num * factorial(--num)
}

// Before
function changeColor(element){
 element.onclick = function(e){
  element.style.backgroundColor = 'red'
 }
}
// After
var changeColor = (element) => element.onclick = (e) => element.style.backgroundColor = 'red'