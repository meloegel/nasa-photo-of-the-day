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
  const [date, setDate] = useState(momentDate)

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

      <div className='topContent'>
        <div className='titleDate'>
          <h1><span className='toolTip'>Title:</span>{potd.title}</h1>
        </div>
        <div className='titleDate'>
          <img src={nasaLogo} alt='nasa-logo' id='nasaLogo' />
          <StyledPinput>Date:<input type='date' value={date} onChange={inputNewDate} style={inputStyle} /></StyledPinput>
        </div>
        <div className='titleDate'>
          <h2>{potd.date}<br></br><span id='dateFormat'>*YYYY-MM-DD*</span></h2>
        </div>
      </div>
      <div className='contentDiv'>
        <div className='bottomContent'>
          {potd.media_type === 'video' ? (
            <ReactPlayer width="100%" height="auto" controls='autoPlay' url={potd.url} alt={potd.title} />
          ) : (
              <img id='images' src={potd.url} alt={potd.title} />
            )}
        </div>
        <div className='bottomContent'>
          <p className='about'>{potd.explanation} </p>
        </div>
      </div>
    </div>
  );
}

export default App;

const inputStyle = {
  background: '#0b3d91',
  color: 'white'
}
