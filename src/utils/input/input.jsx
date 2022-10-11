import React from 'react'
import './input.scss'

function Input(props) {
  return (
    <input 
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      value={props.value}
      onChange={event => props.setValue(event)}
      />
  )
}

export default Input
