import React, { useState } from 'react';
import './App.css';
import MyComponent from './components/MyComponent';

function App() {
  const [stateName, setStateName] = useState("")
  const [hungry, setHungry] = useState(false)

  const handleInputChange = event => {
    // const {name, value} = event.target;
    // setStateName({ ...stateName, [name]: value})
    setStateName(event.target.value)
  }

  const handleCheck = e => {
    setHungry(!hungry)
  }

  return (
    <div className="App">
      <h2>hello</h2>
      <input type="checkbox" onClick={handleCheck} />
      <input placeholder="type here" name="key" onChange={handleInputChange}/>
      <MyComponent fullName={stateName} hungry={true} />
    </div>
  );
}

export default App;
