import { createSlice, PayloadAction, Action } from "redux-starter-kit";
import { ThunkAction } from "redux-thunk";

import { getRepoDetails, RepoDetails } from "api/githubAPI";
import { getUserByPublicId } from "api/torreAPI";
import { IAPIUser } from "api/types";
import { RootState } from "store";

interface RepoDetailsState {
    openIssuesCount: number;
    error: Error | null;
}

const torreSlice = createSlice({
    slice: "repoDetails",
    initialState: {
        openIssuesCount: -1,
        error: null,
    } as RepoDetailsState,
    reducers: {
        getTorreDataSuccess(state, action: PayloadAction<IAPIUser>) {
            state.openIssuesCount = 2;
            state.error = null;
        },
        getTorreDataFailed(state, action: PayloadAction<Error>) {
            state.openIssuesCount = -1;
            state.error = action.payload;
        },
    },
});

export const { getTorreDataSuccess, getTorreDataFailed } = torreSlice.actions;

export default torreSlice.reducer;

export const fetchTorreData = (
    userPublicId: string,
): ThunkAction<void, RootState, null, Action<string>> => async dispatch => {
    try {
        // const repoDetails = await getRepoDetails(org, repo);

        const torreUser = await getUserByPublicId(userPublicId);

        dispatch(getTorreDataSuccess(torreUser));
    } catch (err) {
        dispatch(getTorreDataFailed(err));
    }
};
