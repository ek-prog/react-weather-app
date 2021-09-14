import React, {useState, useEffect} from "react";
import './App.css';

import Weather from "../weather";
import 'weather-icons/css/weather-icons.css';
import SearchPanel from "../search-panel";
import FindMe from "../find-me";

const API_KEY = process.env.REACT_APP_API_KEY;


const App = () =>{
  const [city, setCity] = useState(undefined);
  const [icon, setIcon] = useState(undefined);
  const [celsius, setCelsius] = useState(undefined);
  const [temp_min, setTemp_min] = useState(undefined);
  const [temp_max, setTemp_max] = useState(undefined);
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);


  // const location = FindMe();

    const icons = {
      Thunderstorm: 'wi-thunderstorm ',
      Drizzle: 'wi-sleet ',
      Rain: 'wi-storm-showers ',
      Snow: 'wi-snow ',
      Atmosphere: 'wi-fog ',
      Clear: 'wi-day-sunny ',
      Clouds: 'wi-day-fog '

    };

  const calCelsius = (temp) =>{
    return Math.floor(temp - 273.15);
  }
const getWeatherIcon = (icons, id) =>{
    switch (true){
      case id >= 200 && id <=232:
        setIcon(icons.Thunderstorm);
        document.body.classList.add('thunderstorm');
        break;
      case id >= 300 && id <=321:
        setIcon(icons.Drizzle);
        document.body.classList.add('drizzle');
        break;
      case id >= 500 && id <=531:
        setIcon(icons.Rain);
        document.body.classList.add('rain');
        break;
      case id >= 600 && id <=622:
        setIcon(icons.Snow);
        document.body.classList.add('snow');
        break;
      case id >= 701 && id <=781:
        setIcon(icons.Atmosphere);
        document.body.classList.add('atmosphere');
        break;
      case id === 800 :
        setIcon(icons.Clear);
        document.body.classList.add('clear');
        break;
      case id >= 801 && id <=804:
        setIcon(icons.Clouds);
        document.body.classList.add('clouds');
        break;
      default:
        setIcon(icons.Clouds);
        document.body.classList.add('clouds');
    }

  }

  const getWeather = async (e) => {

    e.preventDefault();

    const city = e.target.elements.city.value;
    console.log(city);

    if (city) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=ru`)
          .then(res => res.json())
          .then(response => {
                setCity(response.name);
                setCelsius(calCelsius(response.main.temp));
                setTemp_min(calCelsius(response.main.temp_min));
                setTemp_max(calCelsius(response.main.temp_max));
                setDescription(response.weather[0].description);
              getWeatherIcon(icons, response.weather[0].id);

              },
          )
    } else {
      setError( true);
    }
  };

  useEffect(()=>{
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=Irkutsk&appid=${API_KEY}&lang=ru`)
      .then(res => res.json())
      .then(response => {
            setCity(response.name);
            setCelsius(calCelsius(response.main.temp));
            setTemp_min(calCelsius(response.main.temp_min));
            setTemp_max(calCelsius(response.main.temp_max));
            setDescription(response.weather[0].description);
            getWeatherIcon(icons, response.weather[0].id);

          },
      );

  }, []);


    return (
        <div className="App">
          <SearchPanel handleSubmit={getWeather} error={error}/>
          <Weather
              city={city}
              temp_celsius={celsius}
              temp_max={temp_max}
              temp_min={temp_min}
              description={description}
              icon={icon}
          />

            {/*<p>Props: {props.cityName}</p>*/}
            <FindMe />
            <div>
                {/*{location ? JSON.stringify(location) : "Location data not available yet."}*/}
            </div>
        </div>
    )
}


export default App;