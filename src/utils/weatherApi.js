import { weatherOptions, defaultWeatherOptions } from "./constants";


export const getWeather = async ({ latitude, longitude }, apiKey) => {
  if (!apiKey) {
    console.error("OpenWeatherMap API key is missing!");
    return Promise.reject("Missing API key");
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;

  try {
    const res = await fetch(url);
    const text = await res.text(); 

    try {
      return JSON.parse(text);
    } catch {
      console.error("OpenWeatherMap returned invalid JSON:", text);
      return Promise.reject("Invalid JSON from OpenWeatherMap API");
    }
  } catch (err) {
    console.error("Network error fetching weather:", err);
    return Promise.reject(err);
  }
};

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = {
    F: Math.round(data.main.temp),
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };
  result.type = getWeatherType(result.temp.F);
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys, Date.now());

  const dayOrNight = result.isDay ? "day" : "night";
  result.iconUrl =
    weatherOptions.find(
      (w) => w.condition === result.condition && w.day === result.isDay
    )?.url || defaultWeatherOptions[dayOrNight].url;

  return result;
};


const isDay = ({ sunrise, sunset }) => {
  const now = Date.now();
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherType = (tempF) => {
  if (tempF >= 86) return "hot";
  if (tempF >= 66) return "warm";
  return "cold";
};
