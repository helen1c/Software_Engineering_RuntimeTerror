export interface MountainPathCreateRequest {
    name: string,
    startPoint: string,
    endPoint: string,
    avgWalkTime: number,
    length: number,
    seaLevelDiff: number,
    dateCreated: string,
    isPrivate: boolean,
    hillId: number,
    authorId: number
}