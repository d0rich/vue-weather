export class Coords{
    latitude = 0
    longitude = 0

    constructor(coords = {latitude:0, longitude:0}) {
        this.latitude = coords.latitude
        this.longitude = coords.longitude
    }
}
