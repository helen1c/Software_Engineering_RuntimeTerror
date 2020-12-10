export interface MountainLodgeCreateRequest {
    name: string,
    elevation: number,
    hillId: number | undefined,
    image?: []
}