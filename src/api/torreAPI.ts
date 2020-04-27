
import axios, { AxiosRequestConfig, AxiosPromise } from "axios";
import { ITorreAPIUser, ITorreAPIOportunitiesSearch } from './types'

const torreBios = 'https://torre.bio/api/bios/';
const torreSearch = 'https://search.torre.co/opportunities/_search/'

export async function getUserByPublicId(publicId: string) {
    publicId = 'cristiandanielcordobaaguirre';
    const url = `${torreBios}${publicId}`;

    const config: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Request-Method': 'GET, PUT, POST, DELETE, HEAD, OPTIONS',
            // 'Access-Control-Allow-Origin': '*',
        }
    }
    let response = await axios.get<ITorreAPIUser>(url, config);
    console.log("Get User from axios: ", (await response).data);
    return (await response).data;
}

export async function searchOportunitiesBySkill(skill: string) {
    skill = 'javascript';
    const url = `${torreSearch}`;
    const config: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json',
        },
        params: {
            currency: 'USD$',
            page: 0,
            periodicity: 'hourly',
            aggregate: true,
            offset: 0,
            size: 20
        }
    };
    const data = {
        "skill": {
            "term": skill,
            "experience": "potential-to-develop"
        }
    };

    let response = await axios.post<ITorreAPIOportunitiesSearch>(url, data, config);
    console.log(`Get opportunities by skill ${skill} from axios: ", ${(await response).data}`);
    return (await response).data;
}