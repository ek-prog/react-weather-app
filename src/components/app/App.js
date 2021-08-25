import React, {Component} from "react";
import './App.css';

import Weather from "../weather";
import 'weather-icons/css/weather-icons.css';
import SearchPanel from "../search-panel";

const API_key = "4a6bf012e53cb2f83d7284cb89b2d33a";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state ={
      city: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_min: undefined,
      temp_max: undefined,
      description: "",
      error: false,


    };


    this.icons = {
      Thunderstorm: 'wi-thunderstorm ',
      Drizzle: 'wi-sleet ',
      Rain: 'wi-storm-showers ',
      Snow: 'wi-snow ',
      Atmosphere: 'wi-fog ',
      Clear: 'wi-day-sunny ',
      Clouds: 'wi-day-fog '

    };
  }
  calCelsius(temp){
    return Math.floor(temp - 273.15);
  }
  getWeatherIcon(icons, id){
    switch (true){
      case id >= 200 && id <=232:
        this.setState({icon: this.icons.Thunderstorm});
        document.body.classList.add('thunderstorm');
        break;
      case id >= 300 && id <=321:
        this.setState({icon: this.icons.Drizzle});
        document.body.classList.add('drizzle');
        break;
      case id >= 500 && id <=531:
        this.setState({icon: this.icons.Rain});
        document.body.classList.add('rain');
        break;
      case id >= 600 && id <=622:
        this.setState({icon: this.icons.Snow});
        document.body.classList.add('snow');
        break;
      case id >= 701 && id <=781:
        this.setState({icon: this.icons.Atmosphere});
        document.body.classList.add('atmosphere');
        break;
      case id === 800 :
        this.setState({icon: this.icons.Clear});
        document.body.classList.add('clear');
        break;
      case id >= 801 && id <=804:
        this.setState({icon: this.icons.Clouds});
        document.body.classList.add('clouds');
        break;
      default:
        this.setState({icon: this.icons.Clouds});
        document.body.classList.add('clouds');
    }

  }

  getWeather = async (e) => {

    e.preventDefault();

    const city = e.target.elements.city.value;
    console.log(city);

    if (city) {
      const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`);

      const response = await api_call.json();

      console.log(response);

      this.setState({
        city: `${response.name}`,
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description
      });
      this.getWeatherIcon(this.icon, response.weather[0].id);
    } else {
      this.setState({error: true});
    }
  };


  render() {
    const {city, celsius, temp_max, temp_min, description, icon} = this.state;
    return (
        <div className="App">
          <SearchPanel handleSubmit={this.getWeather} error={this.state.error}/>
          <Weather
              city={city}
              temp_celsius={celsius}
              temp_max={temp_max}
              temp_min={temp_min}
              description={description}
              icon={icon}
          />
        </div>
    );
  }
}


