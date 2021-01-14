import axios from "axios";
import {Coords} from "@/classes";

export class IpApi{
    async getCoordsByIp(){
        let res = await axios.get('https://ipapi.co/json/')
        return new Coords(res.data)
    }
}
