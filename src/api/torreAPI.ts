
import axios, { AxiosRequestConfig } from "axios";
import { ITorreAPIUser, ITorreAPIOpportunityDetail } from './types'
import { IOpportunitySearchModel } from "../redux/opportunities/types"


const torreBios = 'https://torre.bio/api/bios/';
const opportunitites = "https://torre.co/api/opportunities/"
const torreSearch = 'https://search.torre.co/opportunities/_search/'

export async function getUserByPublicId(publicId: string) {
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

    let response = await axios.post<IOpportunitySearchModel>(url, data, config);
    console.log(`Get opportunities by skill ${skill} from axios: ", ${(await response).data}`);
    return (await response).data;
}

export async function getOpportunityById(opportunityId: string) {

    const url = `${opportunitites}${opportunityId}`;

    const config: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    let response = await axios.get<ITorreAPIOpportunityDetail>(url, config);
    console.log("Get opportunity from axios: ", (await response).data);
    return (await response).data;
}