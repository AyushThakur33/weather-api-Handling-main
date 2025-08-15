import { useState, useEffect } from 'react'
import clouds from "./assets/images/clouds.png"
import clear from "./assets/images/clear.png"
import mist from "./assets/images/mist.png"
import snow from "./assets/images/snow.png"
import rain from "./assets/images/rain.png"
import humidity from "./assets/images/humidity.png"
import wind from "./assets/images/wind.png"
import './App.css'

function App() {
  const [imageUrl, setImageUrl] = useState()
  const [data, setData] = useState(null)
  const [city, setCity] = useState("delhi")

  const weatherImages = {
    clear: clear,
    clouds: clouds,
    mist: mist,
    snow: snow,
    rain: rain,
  }

  const fetchWeather = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bfcf57da5fea717cabb7afc19edd0dd9`)
      .then((res) => res.json())
      .then((res) => {
        setData(res) 
        updateImage(res.weather[0].main)
      })
      .catch((err) => console.error('Error fetching weather data:', err))
  }

  const updateImage = (weatherCondition) => {
    switch (weatherCondition.toLowerCase()) {
      case 'clear':
        setImageUrl(weatherImages.clear)
        break
      case 'clouds':
        setImageUrl(weatherImages.clouds)
        break
      case 'mist':
        setImageUrl(weatherImages.mist)
        break
      case 'snow':
        setImageUrl(weatherImages.snow)
        break
      case 'rain':
        setImageUrl(weatherImages.rain)
        break
      default:
        setImageUrl(weatherImages.clouds) // Fallback image
    }
  }

  useEffect(() => { fetchWeather() }, []) // Fetch weather on initial load

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-5xl mb-4 pt-7 pb-9">Weather App</h1>
      <div className="max-w-lg border flex items-center flex-col rounded overflow-hidden shadow-lg p-4 backdrop-blur-md bg-white bg-opacity-20">
        
        <div className="flex items-center mb-4 pl-4 pr-4 ">
          <input 
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className="border rounded-full p-2 pl-4 mr-2 flex-grow text-black text-bold text-2xl" // Increased padding and font size
            placeholder="Enter city"
          />
          <button 
            className="bg-blue-500 rounded-full text-white pl-4 pr-4 p-2 text-2xl"
            onClick={fetchWeather}
          >
            Search
          </button>
        </div>
        <img className="h-56 p-2" src={imageUrl} alt="Weather" />
        <h2 className='text-4xl p-2'>{data && data.main ? (data.main.temp - 273.15).toFixed(2) + ' °C' : 'N/A'}</h2>
        <h3 className='text-xl leading-5 p-2'>{data && data.name ? data.name + "," + data.sys.country : "Not Found"}</h3>
        <div className='card-footer w-full flex justify-between p-6'>
          <div className='footer-left flex '>
          <img src={humidity}  className="h-10" alt="humidity"></img>
            <div className='flex flex-col pl-1 '>
            <h5>{data && data.main ? data.main.humidity+"%" : "N/A"}</h5>
            <h4 className='text-sm'>Humidity</h4>
            </div>
          </div>
          <div className='footer-right flex '>
            <img src={wind}  className="h-10" alt="humidity"></img>
            <div className='flex flex-col pl-2'>
            <h5>{data && data.wind ? data.wind.speed+" km/h" : "N/A"}</h5>
            <h4 className='text-sm'>Wind Speed</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
