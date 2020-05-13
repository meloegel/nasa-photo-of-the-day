import React, { useState, useEffect } from "react";
import "./App.css";
import axios from 'axios';
import { BASE_URL, API_KEY } from './constants';

function App() {
const [potd, setPotd] = useState(1)


useEffect(() => {
  axios.get(`${BASE_URL}?api_key=${API_KEY}`)
  .then(res => {
    setPotd(res.data)
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })
}, [])


  return (
    <div className="App">
      <h1>{potd.title}</h1>
      <img src={potd.url} alt={potd.title}/>
      <p>{potd.date}</p>
      <p>{potd.explanation} </p>
    </div>
  );
}

export default App;
