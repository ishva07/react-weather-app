import { data } from "autoprefixer";
import React, { useState, useEffect } from "react";
import TimeForcast from "./components/TimeForcast";
import DayInfo from "./components/DayInfo";
import CurrentWeather from "./components/CurrentWeather";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [indexOfNext, setIndexOfNext] = useState(0);
  const [timer, setTimer] = useState(new Date().toLocaleString().split(",")[1]);
  const [active, setActive] = useState();
  const [city, setCity] = useState("Delhi");
  const [latitide, setLatitude] = useState(28.6517178);
  const [longitude, setLongitude] = useState(77.2219388);


  const getCityLocation = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=9d5e387cb4755e4512ef6788e2069e80`
    );
    if (!response.ok) throw new Error("Unable to fetch Data");
    const data = await response.json();
    return data;
  };

  const handleCordinates = async () => {
    try {
      const data = await getCityLocation();
      if (data) { 
        setLatitude(data[0].lat); 
        setLongitude(data[0].lon); 
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitide}&lon=${longitude}&id=524901&appid=9d5e387cb4755e4512ef6788e2069e80`
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("Weather API effect triggered due to latitude/longitude change");
    const assignData = async () => {
      const data = await fetchWeatherData();
      if (data) setWeather(data);
      console.log(weather);
    };
    assignData();
  }, [latitide,longitude]);


  useEffect(() => {
    console.log("Timer effect initialized");
    const handleTime = () => {
      setTimer(new Date().toLocaleTimeString());
    };
  
    const intervalId = setInterval(handleTime, 1000);
  
    return () => clearInterval(intervalId);
  }, []); // This should only update the timer and nothing else
  

  const handleIndex = (indexVal) => {
    setIndexOfNext(indexVal);
  };

  return (
    <>
      {weather ? (
        <>
          <div className="bg-blue-500 min-h-screen w-full flex flex-col gap-3 justify-center items-center ">
            <h1 className="text-center text-6xl text-white font-semibold">
              🌤️ Weather Forcast App
            </h1>
            <div className="flex  lg-flex-col flex-row gap-10 justify-between rounded-xl shadow-2xl bg-blue-800 text-white px-10 py-6 shadow-slate-600 max-w-7xl">
              <div
                id="left-side"
                className="flex-1 flex flex-col gap-5 w-full bg-blue-900 rounded-lg py-3 px-10"
              >
                {/* Greeting */}
                <div className="flex flex-col gap-1">
                  <h1 className="text-4xl  font-bold">{timer}</h1>
                  <p className="font-thin ps-2">{new Date().toDateString()}</p>
                </div>

                {/* Search For Location */}
                <div className="relative">
                  <span className="absolute inset-y-2 left-3 text-xl text-blue-500">
                    <i className="fas fa-map-marker-alt"></i>
                  </span>
                  <input
                    type="text"
                    placeholder="Enter your location"
                    onChange={(e) => setCity(e.target.value)}
                    className="text-blue-800 font-medium pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                  />
                  <span className="absolute inset-y-2 right-3 text-xl text-orange-500">
                    <button onClick={() => handleCordinates()}>
                      <i className="fas fa-search"></i>
                    </button>
                    {/* {console.log(latitide, longitude)} */}
                  </span>
                </div>

                {/* card of current weather */}
                <CurrentWeather weather={weather} cityName = {city} latitude={latitide} />

                <div className="flex flex-col gap-2 bg-orange-400 py-1 rounded-lg">
                  <div className="flex gap-2 justify-center">
                    <p className="monto font-lg">🌅 SunRise : </p>
                    <p className="font-thin">
                      {
                        new Date(weather.city.sunrise * 1000)
                          .toLocaleString()
                          .split(",")[1]
                      }
                    </p>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <p className="monto font-lg">🌇SunSet : </p>
                    <p className="font-thin">
                      {
                        new Date(weather.city.sunrise * 1000)
                          .toLocaleString()
                          .split(" ")[1] +" pm"
                      }
                    </p>
                  </div>
                </div>
              </div>
              {/* Right -side Sidebar */}
              <div
                id="right-side"
                className="flex-2 flex flex-col gap-4 relative"
              >
                {/*  next Interval */}
                <div className="h-[70px] w-[70px] bg-blue-400 rounded-full absolute right-2 top-[30px]"></div>
                <div className="h-[40px] w-[40px] bg-yellow-200 rounded-full absolute right-64 top-[60px]"></div>
                <div className="h-[40px] w-[40px] bg-orange-200 rounded-full absolute right-[-10px] top-[120px]"></div>
                <div className="h-[40px] w-[40px] bg-green-200 rounded-full absolute right-[560px] top-[120px]"></div>
                <div className="h-[60px] w-[60px] bg-purple-500 rounded-full absolute right-[360px] top-[190px]"></div>

                {/* Weather Forcast */}
                <h1 className="text-3xl font-semibold">
                  Weather Forcast of Next Four Days
                </h1>
                <div className="flex gap-3">
                  {[4, 9, 16, 24].map((i) => {
                    return (
                      <DayInfo
                        key={i} // Always use a unique key when mapping components
                        weather={weather}
                        index={i} // Pass the current index for the API data
                        getIndex={handleIndex}
                        setActive={setActive}
                        isActive={active === i} // Check if this card is active
                      />
                    );
                  })}
                </div>
                <h1 className="text-2xl font-medium mt-4">
                  Detailed Weather Forecast for Selected Date
                </h1>
                <div className="flex gap-4">
                  <TimeForcast weather={weather} indexVal={indexOfNext + 1} />
                  <TimeForcast weather={weather} indexVal={indexOfNext + 2} />
                  <TimeForcast weather={weather} indexVal={indexOfNext + 3} />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading..</p>
      )}
    </>
  );
};

export default App;

// git remote add origin https://github.com/ishva07/React-Weather-Project-.git
// https://github.com/ishva07/React-Weather-Project-
// https://github.com/ishva07/React-Weather-Project-