import {Coords} from "@/classes";
import axios from "axios";

export class Geocode{
    apikey = 'b4477b5f-95fc-42dd-b494-a27835ddbf8d'

    async getCityByCoords(coords = new Coords()){
        let req = `https://geocode-maps.yandex.ru/1.x/?geocode=${coords.longitude},${coords.latitude}`
        req += `&apikey=${this.apikey}`
        req += '&kind=locality&format=json&results=1'
        const res = await axios.get(req)
        return res.data?.response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.name
    }

    async getLocationByName(name){
        let req = `https://geocode-maps.yandex.ru/1.x/?geocode=${name}`
        req += `&apikey=${this.apikey}`
        req += '&kind=locality&format=json&results=1'
        const res = await axios.get(req)
        let coords = res.data?.response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.Point.pos.split(' ')
        return new Coords({latitude:Number(coords[1]), longitude:Number(coords[0])})
    }
}
