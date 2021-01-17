export class Coords{
    latitude = 0
    longitude = 0

    constructor(coords = {latitude:0, longitude:0}) {
        this.latitude = coords.latitude
        this.longitude = coords.longitude
    }

    getDistance(coords = new Coords())
    {
        const d = {
            x: this.latitude - coords.latitude,
            y: this.longitude - coords.longitude
        }
        return Math.sqrt(d.x * d.x + d.y * d.y)
    }
}
