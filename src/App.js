import React, { useState, useEffect } from "react";
import "./App.css";
import axios from 'axios';
import { BASE_URL, API_KEY } from './constants';
import nasaLogo from './nasa-logo.png';

import StyledHOne from './h1'
import StyledDiv from './div'
import StyledSection from './container'
import StyledP from './p'
import StyledImg from './img'
import StyledHTwo from './h2'
import StyledPinput from './pInput'
import { withTheme } from "styled-components";


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
    console.log(res.data.date)
  })
  .catch(err => {
    console.log(err)
  })
}, [date])


  return (

    <StyledSection className="App">
      <img src={nasaLogo} alt='nasa-logo'/>
      <StyledHOne>{potd.title}</StyledHOne>
      <StyledHTwo>{potd.date}</StyledHTwo>
      <StyledPinput>Date:<input type='date' value={date} onChange={inputNewDate} style={inputStyle}/></StyledPinput>
      <StyledDiv>
        <StyledImg src={potd.url} alt={potd.title} />
        <StyledP>{potd.explanation} </StyledP>
      </StyledDiv>
    </StyledSection>
  );
}

export default App;

const inputStyle = {
  background:'#0b3d91',
  color: 'white'
}
