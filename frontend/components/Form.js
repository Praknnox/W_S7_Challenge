import React, { useEffect, useState } from 'react'
import * as yup from 'yup'

// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
}

// 👇 Here you will create your schema.
const peakSchema=yup.object().shape({
  fullName:yup.string().trim().min(3,validationErrors.fullNameTooShort)
  .max(20,validationErrors.fullNameTooLong),
  pieSize:yup.string().trim().oneOf([
    'small','medium','large'
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

export default function Form() {
  const [enabler,isItEnabled]=useState(false)
  return (
    <form>
      <h2>Order Your Pizza</h2>
      {true && <div className='success'>Thank you for your order!</div>}
      {true && <div className='failure'>Something went wrong</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input placeholder="Type full name" id="fullName" type="text" />
        </div>
        {true && <div className='error'>Bad value</div>}
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select id="size">
            <option value="">----Choose Size----</option>
            {/* Fill out the missing options */}
            <option value='small'>Small</option>
            <option value='medium'>Medium</option>
            <option value='large'>Large</option>
          </select>
        </div>
        {true && <div className='error'>Bad value</div>}
      </div>

      <div className="input-group">
        {/* 👇 Maybe you could generate the checkboxes dynamically */
        toppings.map((toppo)=>(
          <label key={toppo.topping_id}>
            <input
            name={toppo.text}
            type='checkbox'/>
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
      <input type="submit" disabled={!isItEnabled}/>
    </form>
  )
}
