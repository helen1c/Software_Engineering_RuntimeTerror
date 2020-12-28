import {combineReducers} from "redux";
import findAllHillsReducer from "./reducers/findAllHillsReducer";
import findAllUtilitiesReducer from "./reducers/findAllUtilitiesReducer";
import findAllArchivedLodgesReducer from "./reducers/findAllArchivedLodgesReducer";
import findAllArchivedPathsReducer from "./reducers/findAllArchivedPathsReducer";

export const mainReducer = combineReducers(
    {
        findAllUtilitiesReducer, findAllHillsReducer, findAllArchivedLodgesReducer, findAllArchivedPathsReducer
    }
);

export type MainReducer = ReturnType<typeof mainReducer>;