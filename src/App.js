import React, { useState, useEffect } from "react";
import "./App.css";
import axios from 'axios';
import { BASE_URL, API_KEY } from './constants';
import nasaLogo from './nasa-logo.png';
import ReactPlayer from "react-player"
import Popup from 'reactjs-popup'


function App() {
  const moment = require('moment')
  const momentDate = moment().format('YYYY-MM-DD')

  const [potd, setPotd] = useState(1)
  const [date, setDate] = useState(momentDate)
  const [isOpen, setIsOpen] = useState(false)

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

  const setHD = () => {
    setIsOpen(!isOpen)
  }

  return (

    <div className="App">
      <Popup trigger={<button className="button"> About </button>} modal>
        {close => (
          <div className="aboutModal">
            <a className="close" onClick={close}>&times;</a>
            <div className="aboutTitle"> About Nasa Photo of The Day </div>
            <div className="aboutPopupDiv">
              <p className='aboutPopupContent'>Nasa Photo of the day was created unsing the Nasa public daily photo api. Each day Nasa will have a different photo or video to display. On this page you can navigate thought photos of the past utilizing the date selection. You can also view the photos in HD by clicking on them, click again to close.</p>
            </div>
            <div className="buttonPopup">
              <button className="buttonClose" onClick={() => { close(); }}>Close</button>
            </div>
          </div>
        )}
      </Popup>
      <div className='topContent'>
        <div className='titleDate'>
          <h1><span className='toolTip'>Title:</span>{potd.title}</h1>
        </div>
        <div className='titleDate'>
          <img src={nasaLogo} alt='nasa-logo' id='nasaLogo' />
        </div>
        <div className='titleDate'>
          <div id='dateInput'>Date:<input type='date' value={date} onChange={inputNewDate} style={inputStyle} /><span id='dateFormat'><br></br>*MM-DD-YYYY*</span></div>
        </div>
      </div>
      <div className='contentDiv'>
        <div className='bottomContent'>
          {potd.media_type === 'video' ? (
            <ReactPlayer id='vid' playing='true' url={potd.url} alt={potd.title} />
          ) : (
              <img id='images' onClick={setHD} src={potd.url} alt={potd.title} />
            )}
        </div>
        <div className='bottomContent'>
          <p className='about'>{potd.explanation} </p>
        </div>
        <Popup open={isOpen} modal>
          {close => (
            <div className="modal">
              <div className="hdPopupDiv">
                <img id='hdImage' onClick={() => { close(); setHD(); }} src={potd.hdurl} alt={potd.title} />
              </div>
            </div>
          )}
        </Popup>
      </div>
    </div>
  );
}

export default App;

const inputStyle = {
  background: '#0b3d91',
  color: 'white'
}
