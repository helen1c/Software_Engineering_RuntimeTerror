import {UtilityResponse} from "./UtilityResponse";

export interface MountainLodgeResult {
    id: number,
    name: string,
    image?: string,
    utilities: UtilityResponse[],
    elevation: number,
    hillName: string
}