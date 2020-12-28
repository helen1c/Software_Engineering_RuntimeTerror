import {combineReducers} from "redux";
import findAllHillsReducer from "./reducers/findAllHillsReducer";
import findAllUtilitiesReducer from "./reducers/findAllUtilitiesReducer";
import findAllArchivedLodges from "./reducers/findAllArchivedLodges";

export const mainReducer = combineReducers(
    {
        findAllUtilitiesReducer, findAllHillsReducer, findAllArchivedLodges
    }
);

export type MainReducer = ReturnType<typeof mainReducer>;