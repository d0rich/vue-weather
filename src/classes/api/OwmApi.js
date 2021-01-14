import axios from "axios";
import {Coords, WeatherNote} from "@/classes";

export class OwmApi{
    appid = '4348eb5b375eced3edae61fb223cd51f'

    async currentWeatherByCoords(coords = new Coords()){
        let res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${this.appid}&units=metric`)
        console.log(res.data)
        return new WeatherNote(res.data)
    }

    async currentWeatherByZip(PostalCode){
        let res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${PostalCode},ru&appid=${this.appid}&units=metric`)
        return res.data
    }
}
