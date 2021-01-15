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

    get picture(){
        return sunset
    }
}
