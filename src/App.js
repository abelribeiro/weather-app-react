import React, { Fragment, useState, useEffect} from 'react';
import axios from 'axios';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardTitle, CardBody } from 'reactstrap';
import './css/open-weather-icons.css';
import './css/weather-icons.min.css';







function App() {
  const [location, setLocation] = useState();
  const [weather, setWeather] = useState();
  

  

  let getWeather = async (lat, long) => {
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: '69470c3f2d0353e86eaa14e4f4730313',
        lang: 'pt',
        units: 'metric',
      }
    });
    setWeather(res.data)
    console.log(res.data);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])

  


  const timeStampToCompleteDate = (timestamp) => {
    const options = { weekday: 'long', month: 'short', day: 'numeric' }
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('pt-BR', options)
  }

  const timeStampToHours = (timestamp) => {
    const options = {hour: '2-digit', minute: '2-digit'};
    const date = new Date(timestamp * 1000);
    return  date.toLocaleTimeString('pt-BR', options);
  }

  if (!location) {
    return (
      <Fragment>
        <div className="container container-sm d-flex flex-column vh-100 justify-content-center align-items-center">
          <div className="row">
          <div>
                Você precisa habilitar a localização no browser.
            </div>
          </div>
        </div>
      </Fragment>
    )
  } else if (!weather){
    return (
      <Fragment>
        <div className="container container-sm d-flex flex-column vh-100 justify-content-center align-items-center">
          Carregando...
        </div>
        
      </Fragment>
    )
  }
  else{
    return (
      <>
        <div className="container container-sm d-flex flex-column vh-100 justify-content-center pt-5">
          <div className="user-city">
            <div className="container">
              <div className="row d-flex justify-content-between">
                <h3 className='title col'>
                { weather.name}
                </h3>
                <small className="col weather-date">{timeStampToCompleteDate(weather.dt)}</small>
                <div className="w-100"></div>
              </div>
            </div>
          </div>
          <header>
            <div className="mb-3 mt-3 d-flex flex-column">
              <i className={`owi owi-${weather.weather[0].icon} owi-5x`}></i>
              <h3>{weather['weather'][0]['description']}</h3>
              <span className="weather-temp">{Math.round( weather['main']['temp'] )}º</span>
              <div>
              <small>Sensação Térmica: {Math.round( weather['main']['feels_like'] )}º</small>
              </div>
              
            </div>
            <ul className="row weather-details">
            <li className="col d-flex flex-column align-items-center justify-content-center">
                <i className="wi wi-thermometer"></i>
                <small>{ Math.round(weather['main']['temp_max'] )}º | { Math.round(weather['main']['temp_min'] )}º</small>
                <small>Temperatura</small>
            </li>
            <li className="col d-flex flex-column align-items-center justify-content-center">
              <i className="wi wi-barometer"></i>
              <small>{ weather['main']['pressure'] } hda</small>
              <small>Pressão</small>
            </li>
            <li className="w-100"></li>
            <li className="col d-flex flex-column align-items-center justify-content-center">
              <i className="wi wi-humidity"></i>
              <small>{ weather['main']['humidity'] }%</small>
              <small>Umidade</small>
            </li>
            <li className="col d-flex flex-column align-items-center justify-content-center">
            <i className="wi wi-windy"></i>
              <small>{ weather['wind']['speed'] } km/h</small>
              <small>Vento</small>
            </li>
          </ul>
          </header>
          <footer>
            <div className="container">
              <div className="row">
                <div className="col d-flex flex-column align-items-center justify-content-center">
                  <i className="wi wi-sunrise"></i>
                  <small>{timeStampToHours(weather['sys']['sunrise'] )}</small>
                  <small>Nascer do Sol</small>
                </div>
                <div className="col d-flex flex-column align-items-center justify-content-center">
                  <i className="wi wi-sunset"></i>
                  <small>{timeStampToHours(weather['sys']['sunset'] )}</small>
                  <small>Pôr do Sol</small>
                </div>
                
              </div>
            </div>
          </footer>
        </div> 
        
      </>
    );
  }
}

export default App;
