import React from "react";
import {useFormik} from "formik";

import {UserInfo} from "../mountain-lodge/models/UserInfo";
import {HttpCodesUtil} from "./HttpCodesUtil";

interface Props {
    dataFunction: (userArray: UserInfo[]) => void;
}

export const SearchBar = ({dataFunction}: Props) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    function dataRequest(values: String) {
        fetch("/api/users/community?name=" + values, {
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
                    dataFunction(users);
                });
            } else {
                dataFunction([]);
            }
        });
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
            ? "Unesi ključnu riječ"
            : "Prvi korisnik, drugi korisnik, treći korisnik,...";
    };

    function handleSearchChanged(e: any) {
        formik.handleChange(e);
        dataRequest(e.target.value);
    }

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <div>
                        <input
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
};
