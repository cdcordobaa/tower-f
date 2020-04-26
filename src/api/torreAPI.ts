
import axios from "axios";
import { IAPIUser } from './types'

const torreBios = 'https://bio.torre.co/api/bios/';

export async function getUserByPublicId(publicId: string) {
    publicId = 'cristiandanielcordobaaguirre';
    const url = `${torreBios}${publicId}`;

    const { data } = await axios.get<IAPIUser>(url);
    console.log("Get from", data);
    return data;
}

export async function getIssue(org: string, repo: string, number: number) {
    const url = `https://api.github.com/repos/${org}/${repo}/issues/${number}`;

    const { data } = await axios.get<IAPIUser>(url);
    return data;
}

export async function getComments(url: string) {
    const { data } = await axios.get<IAPIUser[]>(url);
    return data;
}
