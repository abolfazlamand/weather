import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchEngine from "./SearchEngine";
import Forecast from "./Forecast";

import "../styles.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import {useTranslation} from "react-i18next";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({
    loading: true,
    data: {},
    error: false
  });

  const {i18n, t} = useTranslation();

  const toDate = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    const currentDate = new Date();

    return `${days[currentDate.getDay()]} 
    ${currentDate.getDate()} 
    ${months[currentDate.getMonth()]
    }`;
  };

  const search = async (event) => {
    event.preventDefault();
    if (event.type === "click" || (event.type === "keypress" && event.key === "Enter")) {
      setWeather({ ...weather, loading: true });
      const apiKey = "b03a640e5ef6980o4da35b006t5f2942";
      const url = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}`;

      await axios
        .get(url)
        .then((res) => {
          console.log("res", res);
          setWeather({ data: res.data, loading: false, error: false });
        })
        .catch((error) => {
          setWeather({ ...weather, data: {}, error: true });
          console.log("error", error);
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = "b03a640e5ef6980o4da35b006t5f2942";
      const url = `https://api.shecodes.io/weather/v1/current?query=Tehran&key=${apiKey}`;

      try {
        const response = await axios.get(url);
        setWeather({ data: response.data, loading: false, error: false });
      } catch (error) {
        setWeather({ data: {}, loading: false, error: true });
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  const onChangeLanguage = (e)=>{
    e.preventDefault();

    const value = e.currentTarget.value;
    i18n.changeLanguage(value);
  }

  return (
      <div className="App">
        <div style={{display: 'flex', paddingLeft: 27}}>
          <label htmlFor="cars">{t('choose_lang')}:</label>

          <select onChange={onChangeLanguage} style={{marginLeft: 10}} name="cars" id="cars" value={i18n.language}>
            <option value="fa">Fa</option>
            <option value="en">En</option>
          </select>
        </div>
        {/* SearchEngine component */}
        <SearchEngine query={query} setQuery={setQuery} search={search}/>

        {weather.loading && (
            <>
              <br/>
              <br/>
              <h4>Searching..</h4>
            </>
        )}

        {weather.error && (
            <>
              <br/>
              <br/>
              <span className="error-message">
            <span style={{fontFamily: "font"}}>
              {t('no_city_error')}
            </span>
          </span>
            </>
        )}

        {weather && weather.data && weather.data.condition && (
            // Forecast component
            <Forecast weather={weather} toDate={toDate}/>
        )}
      </div>
  );
}

export default App;
