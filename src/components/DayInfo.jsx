const DayInfo = ({
  weather,
  index,
  getIndex,
  setActive,
  isActive,
}) => {
  return (
    <>
      <div
        className={`w-full cursor-pointer 
    bg-white bg-opacity-15 backdrop-blur-md
    ${isActive ? "bg-teal-500 bg-opacity-80" : ""} 
    rounded-lg flex flex-col p-5`}
        onClick={() => {
          getIndex(index); // Call the parent function with the data index
          setActive(index); // Update the active state to the current card
        }}
      >
        {/* Date Time Info */}

        <div className="flex gap-2 items-center">
          <i class="fa-solid fa-calendar-days"></i>
          <p>
            {new Date(weather.list[index].dt * 1000)
              .toLocaleString()
              .split("/")[0] +
              "-" +
              [1] +
              "-2025"}
          </p>
        </div>

        <div className="flex flex-col items-center">
          <img
            src={`https://openweathermap.org/img/wn/${weather.list[index].weather[0].icon}.png`}
            alt="Weather Icon"
            width={70}
          />
          <div className="flex flex-col">
            <p className="text-xl font-mono">
              {weather.list[index].weather[0].main}{" "}
            </p>
          </div>
        </div>
        {/* weather Info */}
        <div className="flex justify-between text-center gap-5">
          <div className="flex flex-col">
            <div className="flex items-center">
              <i class="fa-solid fa-temperature-high"></i>&nbsp;
              <p className="font-mono text-center">
                {(weather.list[index].main.temp - 215.73).toFixed(2)}°
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DayInfo;
