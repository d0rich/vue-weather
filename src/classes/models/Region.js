import {GeoHelper} from "@/classes";

export class Region{
    cities = []
    geoApi = new GeoHelper()
    constructor(id = 0, name = '') {
        this.id = id
        this.name = name
        this.cities = []
    }

    async getCities(page = 1, limit = 20, orderBy = 'name', dir = 'asc'){
        this.cities = []
        let cities = await this.geoApi.getCitiesOfRegion(this.id, page, limit, orderBy, dir)
        cities.forEach(city => {
            city.region = this
            this.cities.push(city)
        })
    }
}
