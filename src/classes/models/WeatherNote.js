import Cloudy from '@/assets/img/weather-icons/Cloudy.svg'
import CloudyWithMoon from '@/assets/img/weather-icons/CloudyWithMoon.svg'
import CloudyWithSun from '@/assets/img/weather-icons/CloudyWithSun.svg'
import Cold from '@/assets/img/weather-icons/Cold.svg'
import Hot from '@/assets/img/weather-icons/Hot.svg'
import Moon from '@/assets/img/weather-icons/Moon.svg'
import Snow from '@/assets/img/weather-icons/Snow.svg'
import Sunny from '@/assets/img/weather-icons/Sunny.svg'
import VeryCloudy from '@/assets/img/weather-icons/VeryCloudy.svg'
import Wet from '@/assets/img/weather-icons/Wet.svg'

export class WeatherNote{
    temp = 0
    feelsLike = 0
    windSpeed = 0
    windDeg = 0
    cloudiness = 0
    pressure = 0
    humidity = 0

    constructor(OwmNote) {
        this.temp = OwmNote.main.temp
        this.feelsLike = OwmNote.main.feels_like
        this.windSpeed = OwmNote.wind.speed
        this.windDeg = OwmNote.wind.deg
        this.cloudiness = OwmNote.clouds.all
        this.pressure = Math.round(OwmNote.main.pressure * 0.750063755419211 *100) /100
        this.humidity = OwmNote.main.humidity

        this.date = new Date(OwmNote.dt * 1000)
    }

    get cloudIcon(){
        if (this.date.getHours() > 20 || this.date.getHours() < 10){
            if (this.cloudiness < 25) return Moon
            else if (this.cloudiness < 50) return CloudyWithMoon
            else if (this.cloudiness < 75) return Cloudy
            else return VeryCloudy
        }
        else {
            if (this.cloudiness < 25) return Sunny
            else if (this.cloudiness < 50) return CloudyWithSun
            else if (this.cloudiness < 75) return Cloudy
            else return VeryCloudy
        }
    }

    get tempIcon(){
        if (this.temp < -25) return Cold
        else if (this.temp > 30) return Hot
        return null
    }

    get humidityIcon(){
        if (this.temp < -5){
            if (this.humidity >= 80) return Snow
        }
        else if (this.humidity >= 80) return Wet
        return null
    }
}
