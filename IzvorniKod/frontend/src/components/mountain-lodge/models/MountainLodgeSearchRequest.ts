import {UtilityOption} from "./UtilityOption";

export interface MountainLodgeSearchRequest {
    searchText: string,
    hillId: number,
    utilities: UtilityOption[]
}