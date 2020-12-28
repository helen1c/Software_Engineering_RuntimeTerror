import React, {useEffect, useState} from "react";
import Select, {ValueType} from "react-select";
import {Field, Form, Formik} from "formik";
import {HillOption} from "../../models/HillOption";
import {useDispatch, useSelector} from "react-redux";
import {MainReducer} from "../../../../store/reducer";
import {findHills} from "../../../../store/actions/findAllHillsActions";
import {MountainPathResult} from "../../models/MountainPathResult";
import {MountainPathSearchRequest} from "../../models/MountainPathSearchRequest";
import {MountainPathSearchResult} from "../MountainPathSearchResult/MountainPathSearchResult";
import "./MountainPathSearch.css"
import {Slider, Typography} from "@material-ui/core";
import {difficultyMarks, walkTimeMarks} from "./MountainPathSearchUtil";

export const MountainPathSearch = () => {

    const dispatcher = useDispatch();
    const [searchResults, setSearchResults] = useState<MountainPathResult[]>([]);
    const [difficulty, setDifficulty] = useState([1, 10]);
    const [walkTime, setWalkTime] = useState([0, 24])
    const [selected, setSelected] = useState(true);

    const search = async (request: MountainPathSearchRequest) => {

        const minwalktime = walkTime[0].toString() + ":00:00";
        const maxwalktime = walkTime[1] === 24 ? "23:59:59" : walkTime[1].toString() + ":00:00";

        console.log(maxwalktime);

        const sRequest = {
            hillId: request.hillId,
            name: request.name,
            difficultyMinimum: difficulty[0],
            difficultyMaximum: difficulty[1],
            avgWalkTimeMaximum: maxwalktime,
            avgWalkTimeMinimum: minwalktime
        };

        console.log(sRequest);

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(sRequest),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        };

        const response = await fetch("/api/mountain-paths/search", requestOptions);
        const json = await response.json();

        setSearchResults(json);
    }

    const {results: hillResults} = useSelector((state: MainReducer) => state.findAllHillsReducer);

    const walkTimeHandleChange = (event: any, newValue: any) => {
        setWalkTime(newValue);
    }

    const difficultyHandleChange = (event:any, newValue: any) => {
        setDifficulty(newValue);
    }

    useEffect(() => {
        if (hillResults === undefined || hillResults.length === 0) {
            console.log("Get all Hills...");
            dispatcher(findHills());
        }
    }, [dispatcher, hillResults]);

    return (
        <>
            <div className="search-form">
                <Formik initialValues={{
                    name: ""
                } as MountainPathSearchRequest
                } onSubmit={search}>
                    {({setFieldValue}) => {
                        return (<Form className="search-paths-form">

                                <div className={"search-hill"}>
                                    <button className="search-button" type="submit">&#8981;</button>
                                    <Field className={"input-search"} placeholder={"Pretražite planinarske staze..."}
                                           name={"name"} id={"name"}/>
                                </div>
                                <div className="selects">
                                    <Select
                                        className="hill-select"
                                        isClearable={true}
                                        isSearchable={true}
                                        placeholder="Odaberite područje..."
                                        name={"hillId"}
                                        onChange={(option: ValueType<HillOption>) => setFieldValue("hillId",
                                            option === null ? null : (option as HillOption).value)
                                        }
                                        options={hillResults}>
                                    </Select>
                                    {selected ? <div className={"sliders-container"}>
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
                                        <button className="slider-button">PROSJECNO VRIJEME</button>
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
                                    </div> : <></>}

                                </div>


                            </Form>

                        );
                    }}
                </Formik>
            </div>
            <div className="path-results-container">
                { searchResults.length > 0 && <div className="mountain-path-cnt-title">
                    <span className="mountain-path-name">Naziv</span>
                    <span className="mountain-path-hillname">Visočje</span>
                    <span className="mountain-path-walktime">Prosječno trajanje</span>
                    <span className="mountain-path-difficulty">Zahtjevnost </span>
                </div>}
                {searchResults.length > 0 && searchResults.map(result =>
                    <MountainPathSearchResult result={result} key={result.id}/>)}
            </div>
        </>
    );

}
