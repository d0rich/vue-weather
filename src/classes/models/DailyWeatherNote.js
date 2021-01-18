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
        this.temp = Math.round(OwmNote.temp.day)
        this.feelsLike = Math.round(OwmNote.feels_like.day)
        this.cloudiness = OwmNote.clouds

        this.date = new Date(OwmNote.dt * 1000)
        let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']
        let todayBegin = new Date().setHours(0,0,0,0)
        let todayEnd = new Date().setHours(23,59,59,999)
        let yesterdayBegin = new Date().setHours(-24,0,0,0)
        let yesterdayEnd = new Date().setHours(-1,59,59,999)
        let tomorrowBegin = new Date().setHours(24,0,0,0)
        let tomorrowEnd = new Date().setHours(47,59,59,999)
        if (Number(this.date) >= yesterdayBegin && Number(this.date) <= yesterdayEnd)
            this.dayName = 'Вчера'
        else if (Number(this.date) >= todayBegin && Number(this.date) <= todayEnd)
            this.dayName = 'Сегодня'
        else if (Number(this.date) >= tomorrowBegin && Number(this.date) <= tomorrowEnd)
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
