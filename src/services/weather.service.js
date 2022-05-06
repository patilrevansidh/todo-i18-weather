import axios from "axios";
import { getMyLatLong } from "../config/utils/helper";
export async function getMyWeatherReport() {
  try {
    const location = await getMyLatLong();
    const { latitude, longitude } = location;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`;
    const response = await (await axios.get(url)).data;

    const { name, main, weather } = response;
    const res = {
      temp: main.temp,
      name,
      icon: weather?.[0]?.icon,
    };
    console.log(res, "response");
    return res;
  } catch (error) {}
}
