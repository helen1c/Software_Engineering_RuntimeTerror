import React, {useEffect, useState} from "react";
import {UserInfo} from "../mountain-lodge/models/UserInfo";
import {HttpCodesUtil} from "../mountaineering-community/HttpCodesUtil";
import {useFormik} from "formik";

interface Props{
    dataFunction: (userArray: UserInfo[]) => void;
    stateFunction: (state: boolean) => void;
}

export const Search = ({dataFunction,stateFunction} : Props) =>{
    const [allUsers, setAllUsers] = useState<UserInfo[]>([]);
    useEffect(() => {
        fetch("/api/users/get-all-users", {
            method: "GET",
            headers: new Headers({
                authorization: sessionStorage.getItem("key") || "",
            }),
        }).then(function (response) {
            if (response.status === HttpCodesUtil.SUCCESS) {
                response.json().then((users) => {
                    users.forEach(function (item: UserInfo) {
                        item.image = "data:image/jpeg;base64," + item.image;
                    });
                    setAllUsers(users);
                    dataFunction(users);
                    stateFunction(false);
                });
            } else {
                dataFunction([]);
                stateFunction(false);
            }
        });
    }, [dataFunction, stateFunction]);

    function dataRequest(searchText: string) {
        dataFunction(
            allUsers.filter((user) => user.name.toLowerCase().includes(searchText))
        );
    }

    const formik = useFormik({
        initialValues: {
            searchText: "",
        },
        onSubmit: (values) => {
            dataRequest(values.searchText);
        },
    });

    const placeholder = () => {
        return formik.values.searchText === ""
            ? "Pretražite planinarsku zajednicu..."
            : "Prvi korisnik, drugi korisnik, treći korisnik,...";
    };

    function handleSearchChanged(e: any) {
        formik.handleChange(e);
        dataRequest(e.target.value);
    }

    return (
        <div className="user-search-div">
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <div>
                        <input className="user-search-bar"
                               type="text"
                               name="searchText"
                               placeholder={placeholder()}
                               onChange={(e) => handleSearchChanged(e)}
                               value={formik.values.searchText}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}