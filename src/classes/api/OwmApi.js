import axios from "axios";
import {Coords, SunDay, WeatherNote} from "@/classes";

export class OwmApi{
    appid = '4348eb5b375eced3edae61fb223cd51f'

    async locationByZip(PostalCode){
        let res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${PostalCode},ru&appid=${this.appid}&units=metric`)
        return new Coords({latitude:res.data.coord.lat, longitude:res.data.coord.lon})
    }

    async currentWeatherByCoords(coords = new Coords()){
        let res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${this.appid}&units=metric`)
        return new WeatherNote(res.data)
    }

    async currentWeatherByZip(PostalCode){
        let res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${PostalCode},ru&appid=${this.appid}&units=metric`)
        return new WeatherNote(res.data)
    }
    async sunDayByCoords(coords = new Coords()){
        let res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${this.appid}&units=metric`)
        return new SunDay(res.data)
    }

    async sunDayByZip(PostalCode){
        let res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${PostalCode},ru&appid=${this.appid}&units=metric`)
        return new SunDay(res.data)
    }
}
