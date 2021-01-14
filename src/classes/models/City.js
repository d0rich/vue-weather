import {Geocode, OwmApi, Region} from "@/classes";

export class City{
    region = new Region()
    geocode = new Geocode()

    weatherApi = new OwmApi()
    constructor(id = 0,name = '', location, postalCode) {
        this.id = id
        this.name = name
        this.postalCode = postalCode
        if (location) this.location = location
        else if (this.postalCode) this.getLocationByPostalCode()
        else this.getLocationByName()
        this.region = undefined
        this.currentWeather = undefined
    }

    async getLocationByName(){
        this.location = await this.geocode.getLocationByName(this.name)
    }

    async getLocationByPostalCode(){
        this.location = await this.weatherApi.locationByZip(this.postalCode)
    }

    async getCurrentWeather(){
        //console.log(this)
        if (this.postalCode) {
            this.currentWeather = await this.weatherApi.currentWeatherByZip(this.postalCode)
            //console.log('Есть почтовый индекс', this.currentWeather)
        }
        else {
            this.currentWeather = await this.weatherApi.currentWeatherByCoords(this.location)
            //console.log('Нет почтового индекса', this.currentWeather)
        }
    }
}
