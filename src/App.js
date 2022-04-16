import "./App.css";
import React, { useEffect, useState } from "react";
// import ThemeContextProvider from "./Contexts/ThemeContext";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cities, setCities] = useState([]);
  const [selectedCityKey, setSelectedCityKey] = useState();
  const [weatherInformation, setWeatherInformation] = useState({
    isWeather: false,
    weatherCodition: "",
    celcius: "",
    fahrenheit: "",
  });

  const onCityChange = (e) => {
    setSelectedCityKey(e.target.value);
    localStorage.setItem("previousCity", e.target.options.selectedIndex);
  };

  const setPreviousCity = (e) => {
    var previousCity = localStorage.getItem("previousCity");
    if (previousCity) {
      var city = document.getElementById("city");
      console.log(city);
      if (city) {
        city.selectedIndex = previousCity;
      }
    }
  };

  const getWeatherInformation = () => {
    var apiKey = "WhUAQOfy4yagJiErGEcIHUYxBPJte5YN";
    fetch(
      "http://dataservice.accuweather.com/currentconditions/v1/" +
        selectedCityKey +
        "?apikey=" +
        apiKey
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setWeatherInformation({
            isWeather: true,
            weatherCodition: result[0].WeatherText,
            celcius: result[0].Temperature.Metric.Value,
            fahrenheit: result[0].Temperature.Imperial.Value,
          });
        },
        (error) => {
          setError(error);
        }
      );
  };

  useEffect(() => {
    var noOfCities = 100;
    var apiKey = "WhUAQOfy4yagJiErGEcIHUYxBPJte5YN";
    fetch(
      "http://dataservice.accuweather.com/locations/v1/topcities/" +
        noOfCities +
        "?apikey=" +
        apiKey
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCities(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <div
          style={{
            backgroundImage: "url(/background.jpg)",
            backgroundPosition: "center",
            height: 97 + "vh",
            filter: "blur(2px)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
        <div
          style={{
            zIndex: 2,
            position: "absolute",
            width: 100 + "%",
            left: 0,
            top: 0,
          }}
        >
          <nav className="navbar navbar-light bg-light p-2">
            <div className="container-fluid">
              <span
                className="navbar-brand"
                href="#"
                style={{
                  textShadow: "3px 3px 3px rgba(0, 0, 0, 0.2)",
                }}
              >
                Weather App
              </span>
            </div>
          </nav>
          <div className="d-grid gap-3 col-6 mx-auto py-5">
            <label
              style={{
                color: "white",
                textShadow: "3px 3px 3px rgba(0, 0, 0, 0.2)",
              }}
            >
              Select a City:
            </label>
            <select
              className="form-select"
              id="city"
              onChange={(e) => {
                onCityChange(e);
              }}
              onLoad={() => {
                setPreviousCity();
              }}
              style={{
                boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              <option value="none" defaultValue>
                None
              </option>
              {cities.map((city, index) => (
                <option key={index} value={city.Key}>
                  {city.LocalizedName}
                </option>
              ))}
            </select>
            <button
              className="btn btn-primary"
              onClick={() => {
                getWeatherInformation();
              }}
              style={{
                boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              Get Weather Information
            </button>
          </div>
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-6">
              <div
                style={{
                  boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
                }}
              >
                {weatherInformation.isWeather ? (
                  <div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">
                        Weather Condition:{" "}
                        <strong>{weatherInformation.weatherCodition}</strong>
                      </li>
                      <li class="list-group-item">
                        Temperature in Celcius:{" "}
                        <strong>{weatherInformation.celcius}</strong>
                      </li>
                      <li class="list-group-item">
                        Temperature in Fahrenheit:{" "}
                        <strong>{weatherInformation.fahrenheit}</strong>
                      </li>
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="col-sm-3"></div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
