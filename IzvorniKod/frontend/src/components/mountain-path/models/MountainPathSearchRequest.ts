export interface MountainPathSearchRequest {
    name: string,
    hillId: number | null,
    avgWalkTimeMinimum: number | null,
    avgWalkTimeMaximum: number | null,
    difficultyMinimum: number | null,
    difficultyMaximum: number | null,
    lengthMin: number | null,
    lengthMax: number | null
}
