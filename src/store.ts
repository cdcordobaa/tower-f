import { configureStore } from "redux-starter-kit";

import repoDetailsReducer from "./containers/RepoSearch/repoDetails";
import issuesDisplayReducer from "./containers/IssuesDisplay/issuesDisplay";
import issuesReducer from "./containers/IssuesList/issues";
import commentsReducer from "./containers/IssueDetails/comments";

export const store = configureStore({
    reducer: {
        repoDetails: repoDetailsReducer,
        issuesDisplay: issuesDisplayReducer,
        issues: issuesReducer,
        comments: commentsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
