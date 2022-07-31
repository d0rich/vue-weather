import axios from "axios";
import {City, Region} from "@/classes";

export class GeoHelper{
    apiKey = 'QcCPBQrO82z8m2QIuMfaUMLz7OamwVs8'
    apiHost = 'https://geohelper-proxy.onrender.com'

    async getRegionById(id){
        let req = `${this.apiHost}/api/v1/regions?apiKey=${this.apiKey}`
        req += '&locale[lang]=ru'
        req += `&filter[id]=${id}`
        let res = await axios.get(req)
        let region = res.data.result[0]
        return new Region(region.id, region.name)
    }

    async getRegions(){
        let req = `${this.apiHost}/api/v1/regions?apiKey=${this.apiKey}`
        req += '&locale[lang]=ru'
        req += '&filter[countryIso]=ru'
        req += `&pagination[page]=1`
        req += `&pagination[limit]=100`
        req += `&order[by]=name`
        req += `&order[dir]=asc`
        let res = await axios.get(req)
        let regions = []
        res.data.result.forEach(region => {
            regions.push(new Region(region.id, region.name))
        })
        return regions
    }

    async getCityById(id){
        let req = `${this.apiHost}/api/v1/cities?apiKey=${this.apiKey}`
        req += '&locale[lang]=ru'
        req += `&filter[id]=${id}`
        let res = await axios.get(req)
        let city = res.data.result[0]
        let cityAsClass = new City(city.id, city.name, null, city?.postCode, city?.population)
        cityAsClass.region = new Region()
        cityAsClass.region.id = city.regionId
        return cityAsClass
    }

    async getCityByName(name){
        let req = `${this.apiHost}/api/v1/cities?apiKey=${this.apiKey}`
        req += '&locale[lang]=ru'
        req += `&filter[name]=${name}`
        req += '&filter[nameStrictLanguage]=ru'
        req += '&order[by]=population'
        req += '&order[dir]=desc'
        let res = await axios.get(req)
        let city = res.data.result[0]
        if (!city) {
            let req = `${this.apiHost}/api/v1/cities?apiKey=${this.apiKey}`
            req += '&locale[lang]=ru'
            req += `&filter[name]=Москва`
            req += '&filter[nameStrictLanguage]=ru'
            req += '&order[by]=population'
            req += '&order[dir]=desc'
            let res = await axios.get(req)
            city = res.data.result[0]
        }
        let cityAsClass = new City(city.id, city.name, null, city?.postCode, city?.population)
        cityAsClass.region = new Region()
        cityAsClass.region.id = city.regionId
        return cityAsClass
    }

    async getCitiesOfRegion(regionId, page = 1, limit = 20, orderBy = 'name', dir = 'asc'){
        let req = `${this.apiHost}/api/v1/cities?apiKey=${this.apiKey}`
        req += '&locale[lang]=ru'
        req += `&filter[regionId]=${regionId}`
        req += `&pagination[page]=${page}`
        req += `&pagination[limit]=${limit}`
        req += `&order[by]=${orderBy}`
        req += `&order[dir]=${dir}`
        let res = await axios.get(req)
        let cities = []
        res.data.result.forEach(city => {
            let newCity = new City(city.id, city.name, null, city?.postCode, city?.population)
            cities.push(newCity)
        })
        return {cities, pages: res.data.pagination.totalPageCount}
    }

    async getTopCities(country_code){
        let req = `${this.apiHost}/api/v1/cities?apiKey=${this.apiKey}`
        req += '&locale[lang]=ru'
        req += `&filter[countryIso]=${country_code}`
        req += `&order[by]=population`
        req += `&order[dir]=desc`
        let res = await axios.get(req)
        let cities = res.data.result
            .map(city => new City(city.id, city.name, null, city?.postCode, city?.population))
        if (!cities.length) {
            let req = `${this.apiHost}/api/v1/cities?apiKey=${this.apiKey}`
            req += '&locale[lang]=ru'
            req += `&filter[countryIso]=RU`
            req += `&order[by]=population`
            req += `&order[dir]=desc`
            let res = await axios.get(req)
            cities = res.data.result
                .map(city => new City(city.id, city.name, null, city?.postCode, city?.population))
        }
        return cities
    }
}
