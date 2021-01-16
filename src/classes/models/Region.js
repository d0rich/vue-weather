import {GeoHelper} from "@/classes";

export class Region{
    cities = []
    citiesPages = 1
    geoApi = new GeoHelper()
    constructor(id = 0, name = '') {
        this.id = id
        this.name = name
        this.cities = []
    }

    async getCities(page = 1, limit = 20, orderBy = 'name', dir = 'asc'){
        this.cities = []
        let res = (await this.geoApi.getCitiesOfRegion(this.id, page, limit, orderBy, dir))
        let cities = res[0]
        this.citiesPages = res[1]
        cities.forEach(city => {
            city.region = this
            this.cities.push(city)
        })
    }
}
