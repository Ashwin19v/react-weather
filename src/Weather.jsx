import { useEffect, useState } from "react";
import search from "./assets/search.png";
import rain from './assets/cloud-moon-rain-solid.png';
import humidityIcon from './assets/cloud-showers-heavy-solid.png';
import windIcon from './assets/wind-solid.png';
import sun from './assets/sun-solid.png';
import snow from './assets/snowflake-solid.png';
import drizzle from './assets/droplet-solid.png';
import cloudy from './assets/cloud-sun-solid.png';

const WeatherDetails = ({ icon, temp, city, country, lat, long, humidity, wind }) => {
    return (
        <>
            <div className="image">
                <img src={icon} alt="Weather icon" />
            </div>
            <div className="temp">{temp}°C</div>
            <div className="location">{city}</div>
            <div className="country">{country}</div>
            <div className="cord">
                <div>
                    <span className="latitude">Latitude: </span>
                    <span>{lat}</span>
                </div>
                <div>
                    <span className="longitude">Longitude: </span>
                    <span>{long}</span>
                </div>
            </div>
            <div className="datacontainer">
                <div className="element">
                    <img src={humidityIcon} className="icon" alt="Humidity icon" />
                    <div className="data">
                        <div className="humidityper">{humidity}%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={windIcon} className="icon" alt="Wind icon" />
                    <div className="data">
                        <div className="windper">{wind} km/h</div>
                        <div className="text">Wind-speed</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export const Weather = () => {
    const API = "1231fc7b38395d814f6f2dac344892fd";
    const [text, setText] = useState("chennai");
    const [icon, setIcon] = useState(sun);
    const [temp, setTemp] = useState(0);
    const [city, setCity] = useState("Chennai");
    const [country, setCountry] = useState("IN");
    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [wind, setWind] = useState(0);
    const [load, setLoad] = useState(false);
    const [found, setNotfound] = useState(false);
    const iconMap={
        "01d": sun,
"01n": sun,
"02d": cloudy,
"02n": cloudy,
"03d": drizzle,
"03n": drizzle,
"04d": drizzle,
"04n": drizzle,
"09d": rain,
"09n": rain,
"10d": rain,
"10n": rain,
"13d": snow,
"13n": snow,
    }
    const searchFunction = async () => {
        setLoad(true);
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${API}&units=Metric`;

        try {
            let res = await fetch(url);
            let data = await res.json();
            if (data.cod === "404") {
                setNotfound(true);
                setLoad(false);
                return;
            }
            setHumidity(data.main.humidity);
            setWind(data.wind.speed);
            setCity(data.name);
            setTemp(Math.floor(data.main.temp));
            setCountry(data.sys.country);
            setLat(data.coord.lat);
            setLong(data.coord.lon);
            const weatherIcon= data.weather[0].icon;
            setIcon(iconMap[weatherIcon] || sun);
            setNotfound(false);
        } catch (error) {
            console.log(error);
        } finally {
            setLoad(false);
        }
    };

    const handle = (e) => {
        setText(e.target.value);
    };
    const handleKey = (e) => {
        if (e.key === "Enter") {
            searchFunction();
        }
    };
    useEffect(function(){
        searchFunction();
    },[]);

    return (
        <>
            <div className="container">
                <div className="input">
                    <input
                        type="text"
                        value={text}
                        className="searchcity"
                        onChange={handle}
                        placeholder="Search city"
                        onKeyDown={handleKey}
                    />
                    <div className="searchicon" onClick={searchFunction}>
                        <img src={search} className="searchimg" alt="Search icon" />
                    </div>
                </div>
                <WeatherDetails
                    icon={icon}
                    temp={temp}
                    city={city}
                    country={country}
                    lat={lat}
                    long={long}
                    humidity={humidity}
                    wind={wind}
                />
                <p className="copy">Designed by <a href="#">Ashwin</a></p>
            </div>
        </>
    );
};
