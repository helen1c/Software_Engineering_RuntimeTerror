import {combineReducers} from "redux";
import findAllHillsReducer from "./reducers/findAllHillsReducer";
import findAllUtilitiesReducer from "./reducers/findAllUtilitiesReducer";
import findAllArchivedLodgesReducer from "./reducers/findAllArchivedLodgesReducer";
import findAllArchivedPathsReducer from "./reducers/findAllArchivedPathsReducer";
import findAllGradedPathsReducer from "./reducers/findAllGradedPathsReducer";
import getOwnMountainPathsReducer from "./reducers/getOwnMountainPathsReducer";
import findAllEvents from "./reducers/findAllEventsReducer";
import findFavPathsReducer from "./reducers/findFavPathsReducer";

export const mainReducer = combineReducers(
    {
        findAllUtilitiesReducer,
        findAllHillsReducer,
        findAllEvents,
        findAllArchivedLodgesReducer,
        findAllArchivedPathsReducer,
        getOwnMountainPathsReducer,
        findAllGradedPathsReducer,
        findFavPathsReducer
    }
);

export type MainReducer = ReturnType<typeof mainReducer>;