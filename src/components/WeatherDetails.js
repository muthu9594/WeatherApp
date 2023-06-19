import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";

import Weather from "./WeatherDetail";

const WeatherApp = () => {
  const [weatherArray, setWeatherArray] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  //getting input value for search
  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  //calling api function for automatic referesh for 5min and for search value
  const getData = useCallback(
    (city) => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          searchValue || city
        }&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      )
        .then((response) => response.json())
        .then((data) => {
          const weatherData = {
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            wind: data.wind.speed,
            image: data.weather[0].icon,
            name: data.name,
            time: moment().format("h:mm:ss A"),
            id: data.id,
            description: data.weather[0].description,
            temperature: data.main.temp,
          };

          //sending the fetched data to updateWeatherArray
          updateWeatherArray(weatherData);
        })
        .catch((error) => {
          setError(true);
          setIsLoading(false);
          console.log("An error occurred:", error);
        });
    },
    [searchValue]
  );

  //function to check whether the data is present or not if already present then find the id and update the data else add the new data
  const updateWeatherArray = (newData) => {
    setWeatherArray((prevArray) => {
      const index = prevArray.findIndex((item) => item.id === newData.id);

      if (index !== -1) {
        const updatedArray = [...prevArray];
        updatedArray[index] = newData;
        return updatedArray;
      } else {
        setIsLoading(false);
        return [...prevArray, newData];
      }
    });
  };

  //calling the api by Search button
  const handleClick = () => {
    setIsLoading(true);
    getData();
    setSearchValue("");
  };

  //deleting the card by id
  const deleteObjectById = (id) => {
    setWeatherArray((prevArray) => prevArray.filter((obj) => obj.id !== id));
  };

  //calling the function after every five minutes
  useEffect(() => {
    if (weatherArray.length > 0) {
      const interval = setInterval(() => {
        weatherArray.map((cities) => {
          console.log("prevData", cities.name);
          return getData(cities.name);
        });

        console.log("Called  getData after 5 min ");
      }, 300000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [weatherArray, getData]);

  //refereshing on button click
  const handleRefresh = (id) => {
    const location = weatherArray.find((weatherData) => weatherData.id === id);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location.name}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        const updatedWeatherData = {
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          wind: data.wind.speed,
          image: data.weather[0].icon,
          name: data.name,
          time: moment().format("h:mm:ss A"),
          id: data.id,
          description: data.weather[0].description,
          temperature: data.main.temp,
        };

        setWeatherArray((prevArray) =>
          prevArray.map((weatherData) =>
            weatherData.id === id ? updatedWeatherData : weatherData
          )
        );
      })
      .catch((error) => {
        console.log("An error occurred while refereshing :", error);
      });
  };

  return (
    <div
      className="  bg-cover bg-center bg-no-repeat min-h-screen"
      style={{ backgroundImage: `url('/bg4.jpg')` }}
    >
      <div>
        <h4 className="text-2xl font-bold text-[#003366] ml-[10%] pt-5">
          React Weather
        </h4>
        {error ? (
          <p className=" text-[1.7em]  text-center text-red-500 ">
            Please check the spelling and Try Again...
          </p>
        ) : (
          ""
        )}
      </div>
      <div className="flex justify-center items-center pt-[5%]">
        <input
          value={searchValue}
          onChange={handleChange}
          className="w-[39%] h-10 text-md border pl-4 focus:outline-blue-500 border-gray-400 rounded-l-[15px]"
          type="text"
          placeholder="Search "
        />
        <button
          onClick={handleClick}
          className="bg-[#003366] text-white rounded-r-[15px] py-2 px-4"
        >
          Search
        </button>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="text-3xl text-[#003366]">Fetching...</div>
        </div>
      ) : (
        weatherArray.map((weatherData) => (
          <Weather
            key={weatherData.id}
            deleteObjectById={deleteObjectById}
            handleRefresh={handleRefresh}
            {...weatherData}
          />
        ))
      )}
    </div>
  );
};

export default WeatherApp;
