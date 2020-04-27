import { createSlice, PayloadAction, Action } from "redux-starter-kit";
import { ThunkAction } from "redux-thunk";

import { searchOportunitiesBySkill } from "api/torreAPI";
import { ITorreAPIOportunitiesSearch } from "api/types";
import { RootState } from "store";
import { opportunitiesSearchInitialState } from "./oportunityInitialState"

interface ITorreOportunitiesState {
    oportunities: ITorreAPIOportunitiesSearch;
    error: Error | null;
}

const torreOportunitiesSlice = createSlice({
    slice: "torreUsers",
    initialState: {
        oportunities: opportunitiesSearchInitialState,
        error: null,
    } as ITorreOportunitiesState,
    reducers: {
        searchOpportunitiesSuccess(state, action: PayloadAction<ITorreAPIOportunitiesSearch>) {
            state.oportunities = action.payload
            state.error = null;
        },
        searchOpportunitiesFailed(state, action: PayloadAction<Error>) {
            state = state;
            state.error = action.payload;
            console.info("redux state not modified")
        },
    },
});

export const { searchOpportunitiesSuccess, searchOpportunitiesFailed } = torreOportunitiesSlice.actions;

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
