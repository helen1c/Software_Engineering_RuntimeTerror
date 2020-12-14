import React, { useEffect } from "react";
import { useFormik } from "formik";

import { UserInfo } from "../mountain-lodge/models/UserInfo";
import { HttpCodesUtil } from "./HttpCodesUtil";

interface Props {
  dataFunction: (userArray: UserInfo[]) => void;
}

export const SearchBar = ({ dataFunction }: Props) => {
  const dataRequest = (values: any) => {
    fetch("/api/users/community?name=" + values, {
      method: "GET",
      headers: new Headers({
        authorization: sessionStorage.getItem("key") || "",
      }),
    }).then(function (response) {
      if (response.status === HttpCodesUtil.SUCCESS) {
        response.json().then((users) => {
          dataFunction(users);
        });
      } else {
        dataFunction([]);
      }
    });
  };

  useEffect(() => {
    dataRequest("");
  }, []);

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
