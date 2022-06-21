import React,{useState} from 'react'
import './style.css'

/* another way to export*/

export function Card(props){
  return(    
    <div className='card'>      
      <strong>{props.name}</strong>
      <small>{props.time}</small>
    </div>
  )
}

/* export default Card */