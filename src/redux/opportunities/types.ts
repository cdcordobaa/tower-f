

export interface IOpportunitySearchModel {
    aggregators: Aggregators;
    offset: number;
    results: Result[];
    size: number;
    total: number;
}

interface Result {
    id: string;
    objective: string;
    type: string;
    organizations: Organization[];
    locations: string[];
    remote: boolean;
    external: boolean;
    deadline: string;
    status: string;
    compensation?: Compensation | null;
    skills: Skill[];
    members: Member[];
    questions: any[];
    context: Context;
}

interface Context {
    signaled: any[];
}

interface Member {
    subjectId?: string | null;
    name: string;
    username: string;
    professionalHeadline?: string | null;
    picture?: string | null;
    member: boolean;
    manager: boolean;
    poster: boolean;
    weight: number;
}

interface Skill {
    code: number;
    name: string;
    experience: string;
}

interface Compensation {
    data: Data;
    visible: boolean;
}

interface Data {
    currency: string;
    minAmount: number;
    maxAmount?: number | null;
    periodicity: string;
}

interface Organization {
    id: number;
    name: string;
    picture?: string | null;
}

interface Aggregators {
    remote: Remote[];
    organization: Remote[];
    skill: Remote[];
    compensationrange: Remote[];
    type: Remote[];
    status: Remote[];
}

interface Remote {
    total: number;
    value: string;
}