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
        this.pressure = OwmNote.main.pressure * 0.750063755419211
        this.humidity = OwmNote.main.humidity
    }
}
