import { configureStore } from "redux-starter-kit";

import repoDetailsReducer from "./containers/RepoSearch/repoDetails";
import issuesDisplayReducer from "./containers/IssuesDisplay/issuesDisplay";
import issuesReducer from "./containers/IssuesList/issues";
import commentsReducer from "./containers/IssueDetails/comments";
import torreUserReducer from "./redux/users/torreUserSlice"
import torreOpportunityReducer from './redux/opportunities/torreOpportunitySlice'
import torreFitnessSlice from "./redux/fitness/torreFitnessSlice"
export const store = configureStore({
    reducer: {
        repoDetails: repoDetailsReducer,
        issuesDisplay: issuesDisplayReducer,
        issues: issuesReducer,
        comments: commentsReducer,
        torreUser: torreUserReducer,
        opportunities: torreOpportunityReducer,
        fitness: torreFitnessSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
