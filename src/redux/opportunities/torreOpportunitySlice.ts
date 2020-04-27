import { createSlice, PayloadAction, Action } from "redux-starter-kit";
import { ThunkAction } from "redux-thunk";

import { searchOportunitiesBySkill } from "api/torreAPI";
import { ITorreAPIOportunitiesSearch, Strength } from "api/types";
import { RootState, store } from "store";
import { opportunitiesSearchInitialState } from "./oportunityInitialState"


interface OrderOpportunitiesToListAction {
    torreOpportunity: ITorreAPIOportunitiesSearch;
    skillWeigth: number;
}

export interface opportunitiesIds {
    [id: string]: {
        timesInSearch: number,
        name: string,
        relevance: number;
    }
}
interface ITorreOportunitiesState {
    oportunities: ITorreAPIOportunitiesSearch;
    error: Error | null;
    ids: opportunitiesIds;
    sorted: Array<any>;
}

const torreOportunitiesSlice = createSlice({
    slice: "torreOpportunities",
    initialState: {
        oportunities: opportunitiesSearchInitialState,
        error: null,
        ids: {},
        sorted: []
    } as ITorreOportunitiesState,
    reducers: {
        searchOpportunitiesSuccess(state, action: PayloadAction<ITorreAPIOportunitiesSearch>) {
            state.oportunities = action.payload
            state.error = null;
        },
        appendOpportunitiesToList(state, action: PayloadAction<OrderOpportunitiesToListAction>) {
            let opportList = state.oportunities.results

            action.payload.torreOpportunity.results.forEach(opportunity => {
                if (!state.ids[opportunity.id]) {
                    opportList.push(opportunity)
                    state.ids[opportunity.id] = {
                        timesInSearch: 1,
                        name: opportunity.organizations[0] ? opportunity.organizations[0].name : 'none?',
                        relevance: 1 + 1 * action.payload.skillWeigth,
                    }

                } else {
                    state.ids[opportunity.id].timesInSearch += 1;
                    state.ids[opportunity.id].relevance = 1 + 1 * action.payload.skillWeigth;
                }
            })

            state.oportunities.results = opportList;
            state.error = null;

        },
        searchOpportunitiesFailed(state, action: PayloadAction<Error>) {
            state = state;
            state.error = action.payload;
            console.info("redux state not modified")
        },
    },
});

export const { searchOpportunitiesSuccess, searchOpportunitiesFailed, appendOpportunitiesToList } = torreOportunitiesSlice.actions;

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

        skillList.forEach(async (skill, index) => {
            if (index > 3) {
                return;
            }
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
