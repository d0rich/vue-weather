import sunset from '@/assets/img/sunset.jpg'
export class SunDay{
    constructor(OwmNote) {
        this.sunrise = new Date( OwmNote.sys.sunrise * 1000 )
        this.sunset = new Date( OwmNote.sys.sunset * 1000 )
    }

    get long(){
        let ms = this.sunset - this.sunrise
        return `${Math.floor(ms/1000/60/60)}ч ${new Date(ms).getMinutes()}м`
    }
    get sunriseTime(){
        return `${this.sunrise.getHours() < 10 ? 0 : ''}${this.sunrise.getHours()} : ${this.sunrise.getMinutes() < 10 ? 0 : ''}${this.sunrise.getMinutes()}`
    }
    get sunsetTime(){
        return `${this.sunset.getHours() < 10 ? 0 : ''}${this.sunset.getHours()} : ${this.sunset.getMinutes() < 10 ? 0 : ''}${this.sunset.getMinutes()}`
    }
    get picture(){
        return sunset
    }
}
