import Cloudy from '@/assets/img/weather-icons/Cloudy.svg'
import CloudyWithSun from '@/assets/img/weather-icons/CloudyWithSun.svg'
import Sunny from '@/assets/img/weather-icons/Sunny.svg'
import VeryCloudy from '@/assets/img/weather-icons/VeryCloudy.svg'
import Cold from "@/assets/img/weather-icons/Cold.svg";
import Hot from "@/assets/img/weather-icons/Hot.svg";


export class DailyWeatherNote {
    dayName = ''
    temp = 0
    feelsLike = 0
    cloudiness = 0

    constructor(OwmNote) {
        this.temp = OwmNote.temp.day
        this.feelsLike = OwmNote.feels_like.day
        this.cloudiness = OwmNote.clouds

        this.date = new Date(OwmNote.dt * 1000)
        let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']
        let today = new Date()
        if (today.getDate() - 1 === this.date.getDate())
            this.dayName = 'Вчера'
        else if (today.getDate() === this.date.getDate())
            this.dayName = 'Сегодня'
        else if (today.getDate() + 1 === this.date.getDate())
            this.dayName = 'Завтра'
        else this.dayName = days[this.date.getDay()]
    }

    get cloudIcon(){
        if (this.cloudiness < 25) return Sunny
        else if (this.cloudiness < 50) return CloudyWithSun
        else if (this.cloudiness < 75) return Cloudy
        else return VeryCloudy
    }
    get tempIcon(){
        if (this.temp < -25) return Cold
        else if (this.temp > 30) return Hot
        return null
    }
}
