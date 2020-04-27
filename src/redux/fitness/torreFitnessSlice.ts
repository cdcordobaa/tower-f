import { createSlice, PayloadAction, Action } from "redux-starter-kit";
import { ThunkAction } from "redux-thunk";

// import { searchFitnessBySkill } from "api/torreAPI";
// import { ITorreAPIFitnessSearch } from "api/types";

import { RootState } from "store";
import { opportunitiesDetailsList } from "./fitnessInitialState";
import { IOpportunitiesDetails, ITorreAPIOpportunityDetail } from "api/types";



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

const torreFitnessSlice = createSlice({
    slice: "fitness",
    initialState: {
        fitness: {},
        error: null,
        companies: {}
    } as ITorreFitnessState,
    reducers: {
        sort(state, action: PayloadAction<any>) {
            state.fitness = action.payload
            state.error = null;
        },
        appendOpportunitiesToList(state, action: PayloadAction<any>) {

        },
        searchOpportunitiesFailed(state, action: PayloadAction<Error>) {
            state = state;
            state.error = action.payload;
            console.info("redux state not modified")
        },
    },
});

export const { sort, searchOpportunitiesFailed, appendOpportunitiesToList } = torreFitnessSlice.actions;

export default torreFitnessSlice.reducer;




export const appendTorreOpportList = (
    skillList: Array<string>,
): ThunkAction<void, RootState, null, Action<string>> => async dispatch => {
    try {

        skillList.forEach(async (skill, index) => {
            if (index > 3) {
                return;
            }
            //const torreUser = await searchFitnessBySkill(skill);
            //dispatch(appendOpportunitiesToList(torreUser));
        })


    } catch (err) {
        console.error("No user calls were made");
        dispatch(searchOpportunitiesFailed(err));
    }
};
