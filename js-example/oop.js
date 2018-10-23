//
// Funciones constructoras
function Person(name, age){
 // Propiedades
 this.name = name
 this.age = age
}
// Métodos
Person.prototype.speak = function speak(){
 console.log('Hola mi nombre es: ' + this.name)
}
// Instancia de mi clase
var p1 = new Person('Luis', 16)
// Herencia
function Client(name, age){
 this.debt = 0
 this.money = 10000
 this.name = name
 this.age = age
}
// Este paso es muy poco intuitivo
Client.prototype = new Person()
// Nueva instancia del objeto, con
// los métodos del objeto que hereda
var pablo = new Client('Pablo', 25)
pablo.speak()