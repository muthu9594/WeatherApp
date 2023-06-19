import React from "react";
import { TiDeleteOutline } from "@react-icons/all-files/ti/TiDeleteOutline";
import { FaLongArrowAltDown } from "@react-icons/all-files/fa/FaLongArrowAltDown";
import { FaLongArrowAltUp } from "@react-icons/all-files/fa/FaLongArrowAltUp";

import { MdRefresh } from "@react-icons/all-files/md/MdRefresh";

const Weather = ({
  name,
  humidity,
  wind,
  pressure,
  temperature,
  description,
  image,
  time,
  deleteObjectById,
  id,
  handleRefresh,
}) => {
  //deleting card by calling deleteObjectBYId from parent component
  const deleteObj = () => {
    deleteObjectById(id, name);
  };

  //refreshing weather by clicking button in parent component
  const refreshWeather = () => {
    handleRefresh(id);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="bg-white rounded-lg shadow-lg my-[1.5%] mx-auto w-[80%] md:w-[60%] lg:w-[40%] relative">
        <div className="flex justify-end">
          <TiDeleteOutline
            onClick={deleteObj}
            size={30}
            color={"lightBlue"}
            className="cursor-pointer absolute"
          />
        </div>
        <div className="absolute cursor-pointer">
          <MdRefresh onClick={refreshWeather} size={27} color="lightBlue" />
        </div>
        <div className="p-5  pb-[5%] flex">
          <div className="pl-3">
            <h2 className="text-md font-semibold  text-gray-400 pb-0">
              Current Weather
            </h2>
            <div className=" pt-5 pl-5 ">
              <h1 className="font-bold text-[#3e6c9e]">{name}</h1>
              <div>
                <p className="text-[20px] font-semibold text-blue-500">
                  {description}
                </p>
                <div className="flex pr-2">
                  <img
                    src={`https://openweathermap.org/img/wn/${image}.png`}
                    className="w-20 h-20"
                    alt="Weather Icon"
                  />
                  <span className="text-[70px] font-light  text-[#3e6c9e]">
                    {Math.round(temperature)}&deg;
                  </span>
                </div>
              </div>
              <div className="text-gray-400 font-semibold">
                <p> Last updated : {time}</p>
              </div>
            </div>
          </div>

          <div className="pl-[20%] pt-9">
            <div>
              <h2 className="text-gray-500">
                Feels Like {Math.round(temperature)}&deg;
              </h2>
              <p className="flex pt-2  text-[#91dbde]">
                <span className="flex pr-10 ">
                  <FaLongArrowAltDown size={20} color={"#91dbde"} />{" "}
                  {Math.round(temperature)}
                  &deg;
                </span>
                <span className="flex">
                  <FaLongArrowAltUp size={20} color={"#91dbde"} />
                  {Math.round(temperature)}&deg;
                </span>
              </p>
            </div>
            <div className="pt-5 text-[15px]  text-blue-500 font-light ">
              <p className="pl-5 pb-2 ">
                Humdity
                <span className="pl-6 text-[13px] font-semibold ">
                  {humidity}
                </span>
              </p>
              <p className="pl-5 pb-2">
                Wind
                <span className="pl-11 text-[13px] font-semibold">
                  {wind}kmph
                </span>
              </p>
              <p className="pl-5 pb-2">
                Pressure
                <span className="pl-6 text-[13px] font-semibold">
                  {pressure}hPa
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
