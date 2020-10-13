import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_WEATHER_API_KEY;

const Weather = ({ capital }) => {
	const [weather, setWeather] = useState('')
	const {temperature, weather_icons, wind_speed, wind_dir} = weather
	
    useEffect(() => {
      axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`).then((response) => {
        setWeather(response.data.current);
      });
    }, [capital]);
  
  return (
    <div>
      <div> <strong>temperature</strong> { temperature } Celsius</div>
	  <img src={weather_icons} alt='weather'/>
	  <div><strong>wind</strong> { wind_speed } km/h, direction { wind_dir }  </div>
    </div>
  )
}

export default Weather