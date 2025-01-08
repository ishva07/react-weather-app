import React from "react";
import PropTypes from "prop-types";
import { FaMapMarkerAlt, FaWind, FaTint } from "react-icons/fa";

const CurrentWeather = ({ weather,cityName }) => {
  if (!weather || !weather.list || weather.list.length === 0) {
    return <div>No weather data available</div>;
  }

  const city = cityName;
  const date = new Date(weather.list[0].dt * 1000).toLocaleDateString();
  const temp = (weather.list[0].main.temp - 273.15).toFixed(2);
  const description = weather.list[0].weather[0].description;
  const windSpeed = weather.list[0].wind.speed;
  const humidity = weather.list[0].main.humidity;

  return (
    <div id="current-weather" className="bg-blue-500 rounded-xl flex flex-col pb-4 items-center gap-3">
      <div className="w-full ps-4 flex justify-between py-2 relative">
        <div className="flex gap-2 items-center">
          <FaMapMarkerAlt />
          <p className="text-xl">{city}</p>
        </div>
        <div>
          <img
            src="https://i.pinimg.com/originals/db/d9/0d/dbd90d367167db3967af692343915f5d.png"
            alt="City Icon"
            height={90}
            width={90}
            className="pt-2 rounded-full absolute right-[-29px] top-[-32px]"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 justify-center items-center">
        <img
          src={`https://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`}
          width={80}
          height={90}
          alt="Weather Icon"
        />
        <p className="font-thin text-sm font-sans">
          Today, {date}
        </p>
        <p className="text-5xl font-mono font-semibold">{temp}°C</p>
        <p className="text-lg font-medium">{description}</p>
      </div>

      <div className="min-w-44 pt-5 pb-2">
        <WeatherDetail icon={<FaWind />} label="Winds" value={`${windSpeed} m/s`} />
        <WeatherDetail icon={<FaTint />} label="Humidity" value={`${humidity}%`} />
      </div>
    </div>
  );
};

const WeatherDetail = ({ icon, label, value }) => (
  <div className="flex justify-around">
    <p className="flex items-center">
      {icon} &nbsp; {label}
    </p>
    <p>|</p>
    <p>{value}</p>
  </div>
);

WeatherDetail.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

CurrentWeather.propTypes = {
  weather: PropTypes.shape({
    city: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    list: PropTypes.arrayOf(
      PropTypes.shape({
        dt: PropTypes.number.isRequired,
        main: PropTypes.shape({
          temp: PropTypes.number.isRequired,
          humidity: PropTypes.number.isRequired,
        }).isRequired,
        weather: PropTypes.arrayOf(
          PropTypes.shape({
            description: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
          }).isRequired
        ),
        wind: PropTypes.shape({
          speed: PropTypes.number.isRequired,
        }).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default CurrentWeather;
