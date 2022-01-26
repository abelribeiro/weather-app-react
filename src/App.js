import React, { Fragment, useState, useEffect} from 'react';
import axios from 'axios';



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
        units: 'metric'
      }
    });
    setWeather(res.data);
    console.log(res.data);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])


  if (!location) {
    return (
      <Fragment>
        Você precisa habilitar a localizaçãono browser.
      </Fragment>
    )
  } else if (!weather){
    return (
      <Fragment>
        Carregando...
      </Fragment>
    )
  }
  else{
    return (
      <Fragment>
        <h1>Clima em { weather.name} - ({ weather['weather'][0]['description'] })</h1>
        <ul>
          <li>Temperatura Atual: { weather['main']['temp'] }</li>
          <li>Temperatura Máxima: { weather['main']['temp_max'] }</li>
          <li>Temperatura Mínima: { weather['main']['temp_min'] }</li>
          <li>Pressão { weather['main']['pressure'] } hda</li>
          <li>Umidade { weather['main']['humidity'] }</li>
        </ul>
      </Fragment>
    );
  }
}

export default App;
