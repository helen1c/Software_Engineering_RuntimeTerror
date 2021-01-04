import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

import { UserInfo } from "../mountain-lodge/models/UserInfo";
import {HttpCodesUtil} from "./HttpCodesUtil";
import "./SearchBar.css";

interface Props {
  dataFunction: (userArray: UserInfo[]) => void;
}

export const SearchBar = ({ dataFunction }: Props) => {
  const [allUsers, setAllUsers] = useState<UserInfo[]>([]);
  useEffect(() => {
    fetch("/api/users/get-friends", {
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
        });
      } else {
        dataFunction([]);
      }
    });
  }, [dataFunction]);

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
};
