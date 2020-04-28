import { configureStore } from "redux-starter-kit";

import torreUserReducer from "./redux/users/torreUserSlice"
import torreOpportunityReducer from './redux/opportunities/torreOpportunitySlice'
import torreFitnessSlice from "./redux/fitness/torreFitnessSlice"
export const store = configureStore({
    reducer: {
        torreUser: torreUserReducer,
        opportunities: torreOpportunityReducer,
        fitness: torreFitnessSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
