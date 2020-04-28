import { createSlice, PayloadAction, Action } from "redux-starter-kit";
import { ThunkAction } from "redux-thunk";

import { getOpportunityById } from "api/torreAPI";

import { RootState, store } from "store";
import { opportunitiesDetailsList } from "./fitnessInitialState";
import { ITorreAPIOpportunityDetail, ITorreAPIUser } from "api/types";



export interface opportunitiesIds {
    [id: string]: {
        timesInSearch: number,
        name: string,
    }
}
interface ITorreFitnessState {
    companies: Array<ITorreAPIOpportunityDetail>;
    error: Error | null;
    fitness: any;
}

const initialState: any = {
    fitness: {},
    error: null,
    companies: [...opportunitiesDetailsList],
}

const torreFitnessSlice = createSlice({
    slice: "fitness",
    initialState: initialState,
    reducers: {
        sort(state, action: PayloadAction<any>) {
            state.fitness = action.payload
            state.error = null;
        },
        getOpportDetailsSuccess(state, action: PayloadAction<ITorreAPIOpportunityDetail>) {
            console.log("success")
            let list = state.companies.push(action.payload);
            state.error = null;
        },
        getOpportDetailsFailed(state, action: PayloadAction<Error>) {
            state.error = action.payload;
            console.info("redux state not modified")
        },
        calculateFitness(state, action: PayloadAction<ITorreAPIUser>) {

            console.log("going here")

            let fitness: any = {};
            state.companies.forEach((company: any, index: any) => {
                let matches = 0
                action.payload.strengths.map(strengths => {
                    console.log("hey here", strengths.name);
                    company.details.map((detail: any) => {
                        console.log("jumm", detail.content);
                        let isMentioned = detail.content.toLowerCase().includes(strengths.name.toLowerCase());
                        if (isMentioned) {
                            console.log("mentioned")
                            matches++;
                        }
                        fitness[company.id] = {
                            culturalFit: matches,
                        }

                    });
                });
            })

            state.fitness = fitness;
            state.error = null;
        },
    },
});

export const { sort, getOpportDetailsSuccess, getOpportDetailsFailed, calculateFitness } = torreFitnessSlice.actions;

export default torreFitnessSlice.reducer;



export const fecthOpportunitiesDetailsByIds = (
    companiesIdsList: Array<string>,
): ThunkAction<void, RootState, null, Action<string>> => async dispatch => {
    try {


        companiesIdsList.forEach(async (companiesIdsList, index) => {
            console.log("fetching opps")
            const opportDetail = await getOpportunityById(companiesIdsList);
            dispatch(getOpportDetailsSuccess(opportDetail));
        })


    } catch (err) {
        console.error("No user calls were made");
        dispatch(getOpportDetailsFailed(err));
    }
};


export const calculateCulturalFit = (
    userData: ITorreAPIUser,
): ThunkAction<void, RootState, null, Action<string>> => async dispatch => {
    try {

        dispatch(calculateFitness(userData));

    } catch (err) {
        console.error("No user calls were made");
        dispatch(getOpportDetailsFailed(err));
    }
};


