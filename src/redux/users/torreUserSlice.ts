import { createSlice, PayloadAction, Action } from "redux-starter-kit";
import { ThunkAction } from "redux-thunk";

import { getUserByPublicId } from "api/torreAPI";
import { ITorreAPIUser } from "api/types";
import { RootState } from "store";
import { userInitialState } from './userInitialState'
import { appendTorreOpportList } from "../opportunities/torreOpportunitySlice"

interface ITorreUserState {
    user: ITorreAPIUser;
    error: Error | null;
}

const torreUserSlice = createSlice({
    slice: "torreUser",
    initialState: {
        user: userInitialState,
        error: null,
    } as ITorreUserState,
    reducers: {
        getTorreDataSuccess(state, action: PayloadAction<ITorreAPIUser>) {
            state.user = action.payload;
            state.error = null;
        },
        getTorreDataFailed(state, action: PayloadAction<Error>) {
            state.user = {} as ITorreAPIUser;
            state.error = action.payload;
            console.info("redux state not modified")
        },
    },
});

export const { getTorreDataSuccess, getTorreDataFailed } = torreUserSlice.actions;

export default torreUserSlice.reducer;

export const fetchTorreData = (
    userPublicId: string,
): ThunkAction<void, RootState, null, Action<string>> => async dispatch => {
    try {
        const torreUser = await getUserByPublicId(userPublicId);
        dispatch(getTorreDataSuccess(torreUser));

        const skillsList = torreUser.strengths.map(str => str);

        dispatch(appendTorreOpportList(skillsList));

    } catch (err) {
        console.error("No user calls were made");
        dispatch(getTorreDataFailed(err));
    }
};
