export interface ITorreAPIUser {
    person: Person;
    stats: Stats;
    strengths: Strength[];
    interests: Interest[];
    experiences: Experience[];
    achievements: any[];
    jobs: Job[];
    projects: any[];
    publications: any[];
    education: Education[];
    opportunities: Opportunity[];
    languages: Language[];
    professionalCultureGenomeResults: ProfessionalCultureGenomeResults;
}

interface ProfessionalCultureGenomeResults {
    groups: Group[];
    analyses: Analysis[];
}

interface Analysis {
    groupId: string;
    section: string;
    analysis: number;
}

interface Group {
    id: string;
    text: string;
    answer: string;
    order: number;
}

interface Language {
    code?: string;
    language: string | Country;
    fluency?: string;
}

interface Opportunity {
    id: string;
    interest: string;
    field: string;
    data: Datum[] | boolean | number | string;
}

interface Datum {
    locale: string;
    name: string;
}

interface Education {
    id: string;
    category: string;
    name: string;
    organizations: Organization[];
    fromMonth: string;
    fromYear: string;
    remote: boolean;
    additionalInfo: string;
    highlighted: boolean;
    weight: number;
    verifications: number;
    recommendations: number;
    media: any[];
    toMonth?: string;
    toYear?: string;
}

interface Job {
    id: string;
    category: string;
    name: string;
    organizations: Organization[];
    fromMonth: string;
    fromYear: string;
    toMonth: string;
    toYear: string;
    highlighted: boolean;
    weight: number;
    verifications: number;
    recommendations: number;
    media: Media[];
}

interface Experience {
    id: string;
    category: string;
    name: string;
    organizations: Organization[];
    fromMonth: string;
    fromYear: string;
    remote?: boolean;
    additionalInfo?: string;
    highlighted: boolean;
    weight: number;
    verifications: number;
    recommendations: number;
    media: Media[];
    toMonth?: string;
    toYear?: string;
}

interface Media {
    group: string;
    mediaType: string;
    description: string;
    mediaItems: MediaItem[];
}

interface MediaItem {
    id: string;
    address: string;
}

interface Organization {
    id: number;
    name: string;
}

interface Interest {
    id: string;
    code: number;
    name: string;
    media: any;
    created: string;
}

export interface Strength {
    id: string;
    code: number;
    name: string;
    weight?: number;
    recommendations?: number;
    media?: any;
    created?: string;
    experience?: string;
}

interface Stats {
    jobs: number;
    education: number;
    strengths: number;
    interests: number;
}

interface Person {
    professionalHeadline?: string;
    completion?: number;
    showPhone?: boolean;
    created?: string;
    verified?: boolean;
    flags?: Flags;
    weight?: number;
    locale?: string;
    subjectId?: string | number;
    picture?: string;
    hasEmail?: boolean;
    name?: string;
    links?: Link[];
    location?: Location;
    theme?: string;
    id: string;
    pictureThumbnail?: string;
    claimant?: boolean;
    weightGraph?: string;
    publicId?: string;
    username?: string;
    hasBio?: boolean;
    bioCompletion?: number;
}

interface Location {
    id?: string;
    name?: string;
    latitude: number;
    longitude: number;
    timezone?: string;
    timezoneOffSet?: number;
}

interface Link {
    id: string;
    name: string;
    address: string;
}

interface Flags {
    benefits: boolean;
    canary: boolean;
    enlauSource: boolean;
    fake: boolean;
    featureDiscovery: boolean;
    getSignaledBenefitsViewed: boolean;
    firstSignalSent: boolean;
    promoteYourselfBenefitsViewed: boolean;
    promoteYourselfCompleted: boolean;
    importingLinkedin: boolean;
    onBoarded: boolean;
    opportunitiesNotificationsSent: boolean;
    remoter: boolean;
    signalsFeatureDiscovery: boolean;
    signedInToOpportunities: boolean;
    importingLinkedinRecommendations: boolean;
    contactsImported: boolean;
}


export interface ITorreAPIOportunitiesSearch {
    aggregators?: Aggregators | null;
    offset?: number;
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
    compensation?: any;
    skills: Skill[];
    members: Member[];
    questions: any[];
    context: Context;
}

interface Context {
    signaled: any[];
}

// interface Member {
//     subjectId?: string | null;
//     name: string;
//     username: string;
//     professionalHeadline?: string | null;
//     picture?: string | null;
//     member?: boolean;
//     manager?: boolean;
//     poster: boolean;
//     weight: number;
// }

interface Skill {
    code: number;
    name: string;
    experience: string;
}

interface Organization {
    id: number;
    name: string;
    picture?: string | null;
    size?: number;
}

interface Aggregators {
    remote: Remote[];
    organization: Remote[];
    skill: any[];
    compensationrange: any[];
    type: Remote[];
    status: Remote[];
}

interface Remote {
    total: number;
    value: string;
}


export interface IOpportunitiesDetails {
    opportunitiesDetails: Array<ITorreAPIOpportunityDetail>;
}
export interface ITorreAPIOpportunityDetail {
    residency: Residency;
    attachments: Attachment[];
    boardVersion: number;
    prefilledStatus: string;
    locale: string;
    objective: string;
    review: string;
    draft?: any;
    members: Member[];
    details: Detail[];
    id: string;
    place: Place;
    deadline: string;
    slug: string;
    owner: Owner;
    completion: number;
    agreement: Agreement;
    languages: Language[];
    created: string;
    opportunity: string;
    active: boolean;
    commitment: Commitment;
    stableOn: string;
    timezones: string[];
    strengths: Strength[];
    organizations: Organization[];
    compensation: Compensation;
    openGraph: string;
    status: string;
    size?: number;
}

interface Compensation {
    code: string;
    currency: string;
    minAmount: number;
    maxAmount: number;
    periodicity: string;
    visible: boolean;
}

// interface Organization {
//     id: number;
//     name: string;
//     size: number;
//     picture: string;
// }

// interface Strength {
//     id: string;
//     code: number;
//     name: string;
//     experience: string;
// }

interface Commitment {
    code: string;
    hours: number;
}

// interface Language {
//     language: Country;
//     fluency: string;
// }

interface Agreement {
    type: string;
}

interface Owner {
    id: string;
    username: string;
    name: string;
    hasEmail: boolean;
    professionalHeadline: string;
    picture: string;
    pictureThumbnail: string;
    hasBio: boolean;
    bioCompletion: number;
    weight: number;
    verified: boolean;
    subjectId: number;
}

interface Place {
    remote: boolean;
    anywhere: boolean;
    location: Location[];
}

// interface Location {
//     id: string;
//     latitude: number;
//     longitude: number;
// }

interface Detail {
    code: string;
    content: string;
}

interface Member {
    id?: string;
    person?: Person;
    manager?: boolean;
    poster?: boolean;
    member?: boolean;
    status?: string;
    visible?: boolean;
    subjectId?: string | null;
    name?: string;
    username?: string;
    professionalHeadline?: string | null;
    picture?: string | null;
    weight?: number;

}

// interface Person {
//     id: string;
//     username: string;
//     name: string;
//     hasEmail: boolean;
//     hasBio: boolean;
//     bioCompletion: number;
//     weight: number;
//     verified: boolean;
//     professionalHeadline: string;
//     picture: string;
//     pictureThumbnail?: string;
//     subjectId?: number;
// }

interface Attachment {
    resource: string;
    address: string;
    path: string;
    caption: string;
}

interface Residency {
    anywhere: boolean;
    countries: Country2[];
}

interface Country2 {
    country: Country;
    sponsorVisa: string;
}

interface Country {
    code: string;
    name: string;
}