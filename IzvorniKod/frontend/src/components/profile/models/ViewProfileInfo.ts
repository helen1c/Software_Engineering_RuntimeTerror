export interface ViewProfileInfo {
    name: string;
    email: string;
    placeOfResidence: string;
    description: string;
    dateOfBirth: string;
    image: string;
    isOwner: boolean;
    isAdmin: boolean;
}

export const getEmptyProfile = (): ViewProfileInfo => {
    return {
        name: "",
        email: "",
        placeOfResidence: "",
        description: "",
        dateOfBirth: "",
        image: "",
        isOwner: false,
        isAdmin: false
    };
};