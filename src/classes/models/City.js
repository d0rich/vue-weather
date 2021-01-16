import {Geocode, OwmApi, Region} from "@/classes";

export class City{
    region = new Region()
    geocode = new Geocode()

    onCurrentWeatherLoad = true
    onSunDayLoad = true
    onWeekWeatherLoad = true

    weatherApi = new OwmApi()

    get populationString(){
        if (this.population > 1000000) return `${Math.round(this.population / 100000) / 10} млн.`
        else if (this.population > 1000) return `${Math.round(this.population / 100) / 10} тыс.`
        else return this.population
    }

    constructor(id = 0,name = '', location, postalCode, population ) {
        this.id = id
        this.name = name

        this.population = population ? population : Math.round(Math.random() * 100)

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
        if (this.location || this.postalCode){
            this.onCurrentWeatherLoad = true
            if (this.postalCode) {
                this.currentWeather = await this.weatherApi.currentWeatherByZip(this.postalCode)
            }
            else {
                this.currentWeather = await this.weatherApi.currentWeatherByCoords(this.location)
            }
            this.onCurrentWeatherLoad = false
        }
        else {
            if (this.postalCode) await this.getLocationByPostalCode()
            else await this.getLocationByName()
            await this.getCurrentWeather()
        }
    }

    async getSunDay(){
        if (this.location || this.postalCode){
            this.onSunDayLoad = true
            if (this.postalCode) {
                this.sunDay = await this.weatherApi.sunDayByZip(this.postalCode)
            }
            else {
                this.sunDay = await this.weatherApi.sunDayByCoords(this.location)
            }
            this.onSunDayLoad = false
        }
        else {
            if (this.postalCode) await this.getLocationByPostalCode()
            else await this.getLocationByName()
            await this.getSunDay()
        }
    }

    async getWeekWeather(){
        if (this.location){
            this.onWeekWeatherLoad = true
            this.weekWeather = await this.weatherApi.weekWeatherByCoords(this.location)
            this.onWeekWeatherLoad = false
        }
        else {
            if (this.postalCode) await this.getLocationByPostalCode()
            else await this.getLocationByName()
            await this.getWeekWeather()
        }
    }
}
