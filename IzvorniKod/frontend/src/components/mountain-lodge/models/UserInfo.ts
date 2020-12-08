export interface UserInfo {
    id: number,
    name: string,
    image: string
}

export const getEmptyUserInfo = (): UserInfo => {
    return {
          id: 0,
        name: "",
        image: ""
    };
};