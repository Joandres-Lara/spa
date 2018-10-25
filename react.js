import React from 'react'

export default class MyComponent extends React.Component{
 static get defaultProps(){
  return {
   label: ''
  }
 }

 render(){
  return(
   <div>
    <h1>Hola Mundo</h1>
    { this.props.label }
   </div>
  )
 }
}