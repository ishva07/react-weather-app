import React from "react";

const TimeForcast = ({ weather, indexVal }) => {
  return (
    <div className="bg-pink-600 rounded-lg flex flex-col p-5">
      {/* Date Time Info */}

      {/* <div className="flex gap-2 items-center">
        <i class="fa-solid fa-calendar-days"></i>
        <p>
          {new Date(weather.list[1].dt * 1000).toLocaleString().split("/")[0] +
            "-" +
            [1] +
            "-2025"}
        </p>
      </div> */}
      <div className="text-center flex gap-1 justify-center items-center">
                    <i class="fa-solid fa-clock"></i>
                    <p>
                      {
                        new Date(weather.list[indexVal].dt * 1000)
                          .toLocaleString()
                          .split(",")[1]
                      }
                    </p>
                  </div>

      <div className="flex  justify-center items-center">
        <img
          src={`https://openweathermap.org/img/wn/${weather.list[indexVal].weather[0].icon}.png`}
          alt="Weather Icon"
          width={100}
        />
        <div className="flex flex-col">
          <p className="text-xl font-mono">
            {" "}
            {weather.list[indexVal].weather[0].main}{" "}
          </p>
          <p className="text-sm font-mono">
            {" "}
            {weather.list[indexVal].weather[0].description}{" "}
          </p>
        </div>
      </div>
      {/* weather Info */}
      <div className="flex justify-between gap-5">
        <div className="flex flex-col">
          <div className="flex items-center">
            <i class="fa-solid fa-temperature-high"></i>&nbsp;
            <p className="font-serif me-2 font-medium">Temp :</p>
            <p className="font-thin">
              {(weather.list[0].main.temp - 215.73).toFixed(2)}°C
            </p>
          </div>
          <div className="flex items-center">
            <i class="fa-solid fa-droplet"></i>&nbsp;
            <p className="font-serif me-2">Humidity :</p>
            <p className="font-thin"> {weather.list[indexVal].main.humidity} %</p>
          </div>
          <div className="flex items-center">
            <i class="fa-solid fa-wind"></i>&nbsp;
            <p className="font-serif me-2">Wind :</p>
            <p className="font-thin"> {weather.list[indexVal].wind.speed} hpc</p>
          </div>
          <div className="flex items-center">
            <i class="fa-solid fa-cloud"></i>&nbsp;
            <p className="font-serif me-2">Cloudy :</p>
            <p className="font-thin"> {weather.list[indexVal].clouds.all} %</p>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default TimeForcast;
