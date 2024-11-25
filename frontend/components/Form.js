import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import axios from 'axios'

// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
}

// 👇 Here you will create your schema.
const peakSchema=yup.object().shape({
  fullName:yup.string().trim().required().min(3,validationErrors.fullNameTooShort)
  .max(20,validationErrors.fullNameTooLong),
  size:yup.string().required().trim().oneOf([
    'S','M','L'
  ],validationErrors.sizeIncorrect)
})

// 👇 This array could help you construct your checkboxes using .map in the JSX.
const toppings = [
  { topping_id: '1', text: 'Pepperoni' },
  { topping_id: '2', text: 'Green Peppers' },
  { topping_id: '3', text: 'Pineapple' },
  { topping_id: '4', text: 'Mushrooms' },
  { topping_id: '5', text: 'Ham' },
]

const initVal=()=>({
  fullName:'',
  size:'',
  toppings:[]
})
const initErr=()=>({
  fullName:'',
  size:'',
  toppings:[]
})

export default function Form() {
  const [enabler,isItEnabled]=useState(null)
  const [formVal,setFormV]=useState(initVal())
  const [forError,setErrorm]=useState(initErr())
  const [succeed,hasSucceed]=useState()
  const [failed,hasFailed]=useState()
  
  useEffect(()=>{
    peakSchema.isValid(formVal).then(valid => isItEnabled(valid))
  },[formVal])
  
  const submitten=evt=>{
    evt.preventDefault()
    axios.post('http://localhost:9009/api/order',formVal).then(res=>{
      setFormV(initVal())
      hasSucceed(res.data.message)
      hasFailed()
    }).catch(err=>{
      hasFailed(err.response.data.message)
      hasSucceed()
    })
  }

  const letsMorphin=evt=>{
    let {value,name}=evt.target
    setFormV({...formVal,[name]:value})
    yup.reach(peakSchema,name).validate(value)
    .then(()=>setErrorm(prevError => ({...prevError,[name]:''})))
    .catch((err)=>setErrorm(prevErr => ({...prevErr,[name]:err.errors[0]})))
  }
  const toppHandler=evt=>{
    let {name,checked}=evt.target
    if(checked){
      setFormV({...formVal,toppings:[...formVal.toppings,name]})
    }else{
      setFormV({...formVal,toppings:formVal.toppings.filter(t=>t!=name)})
    }
  }
  return (
    <form onSubmit={submitten}>
      <h2>Order Your Pizza</h2>
      {succeed && <div className='success'>{succeed}</div>}
      {failed && <div className='failure'>Something went wrong</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input placeholder="Type full name" id="fullName" type="text" name='fullName' value={formVal.fullName} onChange={letsMorphin}/>
        </div>
        {forError.fullName && <div className='error'>{forError.fullName}</div>}
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select id="size" name='size' value={formVal.size} onChange={letsMorphin}>
            <option value="">----Choose Size----</option>
            {/* Fill out the missing options */}
            <option value='S'>Small</option>
            <option value='M'>Medium</option>
            <option value='L'>Large</option>
          </select>
        </div>
        {forError.size && <div className='error'>{forError.size}</div>}
      </div>

      <div className="input-group">
        {/* 👇 Maybe you could generate the checkboxes dynamically */
        toppings.map((toppo)=>(
          <label key={toppo.topping_id}>
            <input
            name={toppo.topping_id}
            type='checkbox'
            value={formVal.toppings}
            onChange={toppHandler}
            checked={!!formVal.toppings.find(t=>t==toppo.topping_id)}
            />
            {toppo.text}<br />
          </label>
        ))}
        {/*<label key="1">
          <input
            name="Pepperoni"
            type="checkbox"
          />
          Pepperoni<br />
        </label>*/}
      </div>
      {/* 👇 Make sure the submit stays disabled until the form validates! */}
      <input type="submit" disabled={!enabler}/>
    </form>
  )
}
