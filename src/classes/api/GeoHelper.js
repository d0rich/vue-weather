import axios from "axios";

export class GeoHelper{
    apiKey = 'QcCPBQrO82z8m2QIuMfaUMLz7OamwVs8'

    async getRegions(page = 1, limit = 20, orderBy = 'name', dir = 'asc'){
        let req = `http://geohelper.info/api/v1/regions?apiKey=${this.apiKey}`
        req += '&locale%5Blang%5D=ru'
        req += '&filter%5BcountryIso%5D=ru'
        req += `&pagination%5Bpage%5D=${page}`
        req += `&pagination%5Blimit%5D=${limit}`
        req += `&order%5Bby%5D=${orderBy}`
        req += `&order%5Bdir%5D=${dir}`
        let res = await axios.get(req)
        return res.data
    }

    async getCitiesOfRegion(regionId, page = 1, limit = 20, orderBy = 'name', dir = 'asc'){
        let req = `http://geohelper.info/api/v1/cities?apiKey=${this.apiKey}`
        req += '&locale%5Blang%5D=ru'
        req += `&filter%5BregionId%5D=${regionId}`
        req += `&pagination%5Bpage%5D=${page}`
        req += `&pagination%5Blimit%5D=${limit}`
        req += `&order%5Bby%5D=${orderBy}`
        req += `&order%5Bdir%5D=${dir}`
        let res = await axios.get(req)
        return res.data
    }
}
