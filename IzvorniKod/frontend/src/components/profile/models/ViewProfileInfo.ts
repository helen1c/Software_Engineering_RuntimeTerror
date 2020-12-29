import {Badge} from "../../badges/models/Badge";

export interface ViewProfileInfo {
    name: string;
    email: string;
    placeOfResidence: string;
    description: string;
    dateOfBirth: string;
    isOwner: boolean;
    isAdmin: boolean;
    image: string;
    badges?: Badge[];
}

export const getEmptyProfile = (): ViewProfileInfo => {
    return {
        name: "",
        email: "",
        placeOfResidence: "",
        description: "",
        dateOfBirth: "",
        isOwner: false,
        isAdmin: false,
        image: "",
        badges: []
    };
};