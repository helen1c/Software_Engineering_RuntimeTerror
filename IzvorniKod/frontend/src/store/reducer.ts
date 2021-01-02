import {combineReducers} from "redux";
import findAllHillsReducer from "./reducers/findAllHillsReducer";
import findAllUtilitiesReducer from "./reducers/findAllUtilitiesReducer";
import findAllArchivedLodgesReducer from "./reducers/findAllArchivedLodgesReducer";
import findAllArchivedPathsReducer from "./reducers/findAllArchivedPathsReducer";
import findAllGradedPathsReducer from "./reducers/findAllGradedPathsReducer";
import findAllEvents from "./reducers/findAllEvents";

export const mainReducer = combineReducers(
    {
        findAllUtilitiesReducer,
        findAllHillsReducer,
        findAllEvents,
        findAllArchivedLodgesReducer,
        findAllArchivedPathsReducer,
        findAllGradedPathsReducer
    }
);

export type MainReducer = ReturnType<typeof mainReducer>;