import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

import { UserInfo } from "../mountain-lodge/models/UserInfo"
import { HttpCodesUtil } from "./HttpCodesUtil";

interface Props {
    dataFunction: (userArray: UserInfo[]) => void;
}

export const SearchBar = ({ dataFunction}: Props) => {


    const dataRequest = (values: any) => {
        fetch("/api/users/community" + "?name=" + values["searchText"] , {
            method: "GET",
            headers: new Headers({
                authorization: sessionStorage.getItem("key") || ""
            })
        }).then(function(response) {
            if (response.status === HttpCodesUtil.SUCCESS) {
                response.json().then(users => {
                    dataFunction(users) ;
                });
            } else {
                dataFunction([]);
            }
        });
    };

    useEffect(() => {
       dataRequest({ searchText: ""});
    }, []);

    const formik = useFormik({
        initialValues: {
            searchText: ""

        },

        onSubmit: values => {
            dataRequest(values);
        }
    });

    const placeholder = () => {
        return formik.values.searchText === ""
            ? "Unesi ključnu riječ"
            : "Prvi korisnik, drugi korisnik, treći korisnik,...";
    };

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className="flex-col md:p-2 p-5">
                    <div className="flex md:block mx-auto mt-3 flex-col w-full">
                        <input
                            className="search-bar order-1 border rounded leading-tight w-full md:max-w-sm"
                            type="text"
                            name="searchText"
                            placeholder={placeholder()}
                            onChange={formik.handleChange}
                            value={formik.values.searchText}
                        />
                        <span className="order-3">
              <button
                  className="bt-yellow-100 search-button md:ml-4 mt-1 mb-3 text-white font-medium w-full md:w-auto"
                  type="submit">
                  Pretraži
              </button>
                        </span>

                    </div>
                </div>
            </form>
        </div>
    );
};
