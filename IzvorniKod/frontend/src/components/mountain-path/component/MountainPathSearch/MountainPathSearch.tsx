import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Field, Form, Formik } from "formik";
import { HillOption } from "../../models/HillOption";
import { useDispatch, useSelector } from "react-redux";
import { MainReducer } from "../../../../store/reducer";
import { findHills } from "../../../../store/actions/findAllHillsActions";
import { MountainPathResult } from "../../models/MountainPathResult";
import { MountainPathSearchRequest } from "../../models/MountainPathSearchRequest";
import { MountainPathSearchResult } from "../MountainPathSearchResult/MountainPathSearchResult";
import "./MountainPathSearch.css";
import { Slider } from "@material-ui/core";
import { difficultyMarks, walkTimeMarks } from "./MountainPathSearchUtil";
import { findArchivedPaths } from "../../../../store/actions/findAllArchivedPathsActions";
import { findGradedPaths } from "../../../../store/actions/findAllGradedPathsActions";
import { findWishlist } from "../../../../store/actions/findFavouritePathsActions";
import MountainPathCreate from "../MountainPathCreate/MountainPathCreate";

export const MountainPathSearch = () => {
  const dispatcher = useDispatch();
  const [searchResults, setSearchResults] = useState<MountainPathResult[]>([]);
  const [difficulty, setDifficulty] = useState([1, 10]);
  const [walkTime, setWalkTime] = useState([0, 24]);
  const [selected] = useState(true);

  const search = async (request: MountainPathSearchRequest) => {
    const minwalktime = walkTime[0].toString() + ":00:00";
    const maxwalktime =
      walkTime[1] === 24 ? "23:59:59" : walkTime[1].toString() + ":00:00";

    console.log(maxwalktime);

    const sRequest = {
      hillId: request.hillId,
      name: request.name,
      difficultyMinimum: difficulty[0],
      difficultyMaximum: difficulty[1],
      avgWalkTimeMaximum: maxwalktime,
      avgWalkTimeMinimum: minwalktime,
    };

    console.log(sRequest);

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(sRequest),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const response = await fetch("/api/mountain-paths/search", requestOptions);
    const json = await response.json();

    setSearchResults(json);

    if (sessionStorage.getItem("key")) {
      dispatcher(findArchivedPaths());
      dispatcher(findGradedPaths());
      dispatcher(findWishlist());
    }
  };

  const { results: hillResults } = useSelector(
    (state: MainReducer) => state.findAllHillsReducer
  );

  const walkTimeHandleChange = (event: any, newValue: any) => {
    setWalkTime(newValue);
  };

  const difficultyHandleChange = (event: any, newValue: any) => {
    setDifficulty(newValue);
  };

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("key")) {
      setLoggedIn(false);
      return;
    } else {
      setLoggedIn(true);
      return;
    }
  }, []);

  const { archivedPaths } = useSelector(
    (state: MainReducer) => state.findAllArchivedPathsReducer
  );
  const { gradedPaths } = useSelector(
    (state: MainReducer) => state.findAllGradedPathsReducer
  );
  const { favPaths } = useSelector(
    (state: MainReducer) => state.findFavPathsReducer
  );

  useEffect(() => {
    if (sessionStorage.getItem("key")) {
      dispatcher(findArchivedPaths());
      dispatcher(findGradedPaths());
      dispatcher(findWishlist());
    }
  }, [dispatcher]);

  useEffect(() => {
    if (hillResults === undefined || hillResults.length === 0) {
      console.log("Get all Hills...");
      dispatcher(findHills());
    }
  }, [dispatcher, hillResults]);

  const checkId = (id: number) => {
    if (loggedIn) {
      return archivedPaths.find((v) => v.id === id) !== undefined;
    }
    return false;
  };

  const checkFav = (id: number) => {
    if (loggedIn) {
      return favPaths.find((v) => v === id) !== undefined;
    }
    return false;
  };

  const getPathGrade = (pathId: number): number | null => {
    if (loggedIn) {
      const path = gradedPaths.find(
        (gradedPath) => gradedPath.mountainPathId === pathId
      );
      if (path) {
        return path.grade;
      }
    }
    return null;
  };

  return (
    <>
      <div className="search-form">
        <Formik
          initialValues={
            {
              name: "",
            } as MountainPathSearchRequest
          }
          onSubmit={search}
        >
          {({ setFieldValue }) => {
            return (
              <Form className="search-paths-form">
                {sessionStorage.getItem("key") && (
                  <div className="slider-button-div">
                    <MountainPathCreate />
                    <span className="add-path-span" >Stvori novu stazu </span>
                  </div>
                )}
                <div className={"search-hill"}>
                  <button className="search-button" type="submit">
                    &#8981;
                  </button>
                  <Field
                    className={"input-search"}
                    placeholder={"Pretražite planinarske staze..."}
                    name={"name"}
                    id={"name"}
                  />
                </div>
                <div className="selects">
                  <Select
                    className="hill-select"
                    isClearable={true}
                    isSearchable={true}
                    placeholder="Odaberite područje..."
                    name={"hillId"}
                    onChange={(option) =>
                      setFieldValue(
                        "hillId",
                        option === null ? null : (option as HillOption).value
                      )
                    }
                    options={hillResults}
                  />
                  {selected ? (
                    <div className={"sliders-container"}>
                      <div className="slider-dropdown">
                        <button className="slider-button">ZAHTJEVNOST</button>
                        <div className={"slider-difficulty__cnt"}>
                          <Slider
                            min={1}
                            max={10}
                            value={difficulty}
                            onChange={difficultyHandleChange}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            marks={difficultyMarks}
                          />
                        </div>
                      </div>
                      <div className="slider-dropdown">
                        <button className="slider-button">
                          PROSJECNO VRIJEME
                        </button>
                        <div className={"slider-walktime__cnt"}>
                          <Slider
                            min={0}
                            max={24}
                            value={walkTime}
                            onChange={walkTimeHandleChange}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            marks={walkTimeMarks}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className="path-results-container">
        {searchResults.length > 0 && (
          <div className="mountain-path-cnt-title">
            <span className="mountain-path-name">Naziv</span>
            <span className="mountain-path-hillname">Visočje</span>
            <span className="mountain-path-walktime">Prosječno trajanje</span>
            <span className="mountain-path-difficulty">Zahtjevnost </span>
            <span className="mountain-path-avg-grade">Prosječna ocjena </span>
          </div>
        )}
        {searchResults.length > 0 &&
          searchResults.map((result) => (
            <MountainPathSearchResult
              result={result}
              key={result.id}
              loggedIn={loggedIn}
              fav={checkFav(result.id)}
              archived={checkId(result.id)}
              grade={getPathGrade(result.id)}
            />
          ))}
      </div>
    </>
  );
};
