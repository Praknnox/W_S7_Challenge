import React from 'react'
import Home from './Home'
import Form from './Form'

function App() {
  return (
    <div id="app">
      <nav>
        {/* NavLinks here */}
        <link to='/'>Home</link>
        <link to='order'>Order</link>
      </nav>
      {/* Route and Routes here */}
      <Home />
      <Form />
    </div>
  )
}

export default App
