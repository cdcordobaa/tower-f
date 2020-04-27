import { createSlice, PayloadAction, Action } from "redux-starter-kit";
import { ThunkAction } from "redux-thunk";

import { searchOportunitiesBySkill } from "api/torreAPI";
import { ITorreAPIOportunitiesSearch } from "api/types";
import { RootState } from "store";
import { opportunitiesSearchInitialState } from "./oportunityInitialState"

interface ITorreOportunitiesState {
    oportunities: ITorreAPIOportunitiesSearch;
    error: Error | null;
    ids: {
        [id: string]: {
            timesInSearch: number,
            name: string,
        }
    }
}

const torreOportunitiesSlice = createSlice({
    slice: "torreUsers",
    initialState: {
        oportunities: opportunitiesSearchInitialState,
        error: null,
        ids: {}
    } as ITorreOportunitiesState,
    reducers: {
        searchOpportunitiesSuccess(state, action: PayloadAction<ITorreAPIOportunitiesSearch>) {
            state.oportunities = action.payload
            state.error = null;
        },
        appendOpportunitiesToList(state, action: PayloadAction<ITorreAPIOportunitiesSearch>) {
            let opportList = state.oportunities.results

            action.payload.results.forEach(opportunity => {
                if (!state.ids[opportunity.id]) {
                    opportList.push(opportunity)
                    state.ids[opportunity.id] = {
                        timesInSearch: 1,
                        name: opportunity.organizations[0] ? opportunity.organizations[0].name : 'none?',
                    }

                } else {
                    state.ids[opportunity.id].timesInSearch += 1;
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
    skillList: Array<string>,
): ThunkAction<void, RootState, null, Action<string>> => async dispatch => {
    try {

        skillList.forEach(async (skill, index) => {
            if (index > 3) {
                //return;
            }
            const torreUser = await searchOportunitiesBySkill(skill);
            dispatch(appendOpportunitiesToList(torreUser));
        })




    } catch (err) {
        console.error("No user calls were made");
        dispatch(searchOpportunitiesFailed(err));
    }
};
