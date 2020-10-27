import React, { useState, useEffect } from "react";
import "./App.css";
import axios from 'axios';
import { BASE_URL, API_KEY } from './constants';
import nasaLogo from './nasa-logo.png';
import ReactPlayer from "react-player"

import StyledPinput from './pInput'



function App() {
  const moment = require('moment')
  const momentDate = moment().format('YYYY-MM-DD')

  const [potd, setPotd] = useState(1)
  const [date, setDate] = useState('')

  const inputNewDate = event => {
    setDate(event.target.value)

  }

  useEffect(() => {
    axios.get(`${BASE_URL}?api_key=${API_KEY}&date=${date}`)
      .then(res => {
        setPotd(res.data)
        setDate(res.data.date)
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [date])


  return (

    <div className="App">
      <img src={nasaLogo} alt='nasa-logo' id='nasaLogo' />
      <div className='topContent'>
        <h1>{potd.title}</h1>
        <StyledPinput>Date:<input type='date' value={date} onChange={inputNewDate} style={inputStyle} /></StyledPinput>
        <h2>{potd.date}</h2>
      </div>
      <div className='contentDiv'>
        {potd.media_type === 'video' ? (
          <ReactPlayer width="45%" height="auto" controls='autoPlay' url={potd.url} alt={potd.title} />
        ) : (
            <img id='images' src={potd.url} alt={potd.title} />
          )}
        <p className='about'>{potd.explanation} </p>
      </div>
    </div>
  );
}

export default App;

const inputStyle = {
  background: '#0b3d91',
  color: 'white'
}
