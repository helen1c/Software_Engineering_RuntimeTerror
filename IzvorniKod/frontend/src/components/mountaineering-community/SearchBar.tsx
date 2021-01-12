import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

import { UserInfo } from "../mountain-lodge/models/UserInfo";
import {HttpCodesUtil} from "./HttpCodesUtil";
import "./SearchBar.css";
import {fetcher} from "../../Util";

interface Props {
  dataFunction: (userArray: UserInfo[]) => void;
}

export const SearchBar = ({ dataFunction }: Props) => {
  const [allUsers, setAllUsers] = useState<UserInfo[]>([]);
  useEffect(() => {
    fetcher("/api/users/get-friends", {
      method: "GET"
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
      allUsers.filter((user) => user.name.toLowerCase().includes(searchText.toLowerCase()))
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
        <div className="community-user-search-div">
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <div>
                        <input className="community-user-search-bar"
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
