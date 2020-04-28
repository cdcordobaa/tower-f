import { createSlice, PayloadAction, Action } from "redux-starter-kit";
import { ThunkAction } from "redux-thunk";

import { searchOportunitiesBySkill } from "api/torreAPI";
import { ITorreAPIOportunitiesSearch, Strength } from "api/types";
import { RootState, store } from "store";
import { opportunitiesSearchInitialState } from "./oportunityInitialState"
import { IOpportunitySearchModel } from "./types"


interface OrderOpportunitiesToListAction {
    torreOpportunity: IOpportunitySearchModel;
    skillWeigth: number | undefined;
}

export interface opportunitiesIds {
    [id: string]: {
        timesInSearch: number,
        name: string,
        relevance: number;
    }
}
interface ITorreOportunitiesState {
    opportunities: IOpportunitySearchModel;
    error: Error | null;
    ids: opportunitiesIds;
}

const initialState: ITorreOportunitiesState = {
    opportunities: opportunitiesSearchInitialState,
    error: null,
    ids: {},
}

const torreOportunitiesSlice = createSlice({
    slice: "torreOpportunities",
    initialState: initialState,
    reducers: {
        searchOpportunitiesSuccess(state, action: PayloadAction<IOpportunitySearchModel>) {
            state.opportunities = action.payload
            state.error = null;
        },
        emptyState(state) {
            state.ids = {} as opportunitiesIds;
            state.opportunities = initialState.opportunities as IOpportunitySearchModel
            state.error = null;
        },
        appendOpportunitiesToList(state, action: PayloadAction<OrderOpportunitiesToListAction>) {
            let opportList = state.opportunities.results

            action.payload.torreOpportunity.results.forEach(opportunity => {
                if (!opportunity.organizations[0] || !opportunity.organizations[0].name) {
                    return;
                }

                if (!state.ids[opportunity.id]) {
                    opportList.push(opportunity)
                    state.ids[opportunity.id] = {
                        timesInSearch: 1,
                        name: opportunity.organizations[0] ? opportunity.organizations[0].name : 'none?',
                        relevance: 1 + 1 * <number>action.payload.skillWeigth,
                    }

                } else {
                    state.ids[opportunity.id].timesInSearch += 1;
                    state.ids[opportunity.id].relevance = 1 + 1 * <number>action.payload.skillWeigth;
                }
            })

            state.opportunities.results = opportList;
            state.error = null;

        },
        searchOpportunitiesFailed(state, action: PayloadAction<Error>) {
            state = state;
            state.error = action.payload;
            console.info("redux state not modified")
        },
    },
});

export const { searchOpportunitiesSuccess, searchOpportunitiesFailed, appendOpportunitiesToList, emptyState } = torreOportunitiesSlice.actions;

export default torreOportunitiesSlice.reducer;

export const searchTorreOpportDataBySkill = (
    skill: string,
): ThunkAction<void, RootState, null, Action<string>> => async dispatch => {
    try {
        const torreUser = await searchOportunitiesBySkill(skill);
        dispatch(searchOpportunitiesSuccess(torreUser));

    } catch (err) {
        console.error("No user calls were made");
        dispatch(searchOpportunitiesFailed(err));
    }
};


export const appendTorreOpportList = (
    skillList: Strength[],
): ThunkAction<void, RootState, null, Action<string>> => async dispatch => {
    try {

        await dispatch(emptyState());

        skillList.forEach(async (skill, index) => {
            const torreOpportunity = await searchOportunitiesBySkill(skill.name);
            dispatch(appendOpportunitiesToList({ torreOpportunity: torreOpportunity, skillWeigth: skill.weight }));
        })


    } catch (err) {
        console.error("No user calls were made");
        dispatch(searchOpportunitiesFailed(err));
    }
};


export const sortOpportunitiesByRelevance = (
    skillList: Array<string>,
): ThunkAction<void, RootState, null, Action<string>> => async dispatch => {
    try {

        //const userSkills = dispatch.

    } catch (err) {
        console.error("No user calls were made");
        dispatch(searchOpportunitiesFailed(err));
    }
};
