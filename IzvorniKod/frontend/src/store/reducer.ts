import {combineReducers} from "redux";
import findAllHillsReducer from "./reducers/findAllHillsReducer";
import findAllUtilitiesReducer from "./reducers/findAllUtilitiesReducer";
import findAllMessagesReducer from "./reducers/findAllMessagesReducer";
import findAllArchivedLodgesReducer from "./reducers/findAllArchivedLodgesReducer";
import findAllArchivedPathsReducer from "./reducers/findAllArchivedPathsReducer";
import findAllGradedPathsReducer from "./reducers/findAllGradedPathsReducer";
import getOwnMountainPathsReducer from "./reducers/getOwnMountainPathsReducer";
import findAllEventsAndAttendance from "./reducers/findAllEventsAndAttendanceReducer";
import findFavPathsReducer from "./reducers/findFavPathsReducer";
import findMyEventsReducer from "./reducers/findMyEventsReducer";
import getAndRefuseAndAcceptFriendRequestsReducer from "./reducers/getAndRefuseAndAcceptFriendRequestsReducer";
import getAndResolveFriendRequestsNotificationActionReducer
        from "./reducers/getAndResolveFriendRequestsNotificationActionReducer";

export const mainReducer = combineReducers(
    {
        findAllMessagesReducer,
        findAllUtilitiesReducer,
        findAllHillsReducer,
        findAllEventsAndAttendance,
        findAllArchivedLodgesReducer,
        findAllArchivedPathsReducer,
        getOwnMountainPathsReducer,
        findAllGradedPathsReducer,
        findFavPathsReducer,
        findMyEventsReducer,
        getAndRefuseAndAcceptFriendRequestsReducer,
        getAndResolveFriendRequestsNotificationActionReducer
    }
);

export type MainReducer = ReturnType<typeof mainReducer>;