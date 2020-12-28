import React, {useEffect, useState} from "react";
import './MountainLodgeSearch.css'
import Select, {ValueType} from "react-select";
import {Field, Form, Formik} from "formik";
import {HillOption} from "../../models/HillOption";
import {MountainLodgeSearchRequest} from "../../models/MountainLodgeSearchRequest";
import {useDispatch, useSelector} from "react-redux";
import {MainReducer} from "../../../../store/reducer";
import {findHills} from "../../../../store/actions/findAllHillsActions";
import {findUtilities} from "../../../../store/actions/findAllUtilitiesActions";
import {MountainLodgeSearchResult} from "../MountainLodgeSearchResult/MountainLodgeSearchResult";
import {MountainLodgeResult} from "../../models/MountainLodgeResult";
import {findArchivedLodges} from "../../../../store/actions/findAllArchivedLodgesActions";

export const MountainLodgeSearch = () => {

    const dispatcher = useDispatch();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [searchResults, setSearchResults] = useState<MountainLodgeResult[]>([]);

    // @ts-ignore
    const handleChange = e => {
        // @ts-ignore
        setSelectedOptions(Array.isArray(e) ? e.map(x => x.value) : []);
    };

    const search = async (request: MountainLodgeSearchRequest) => {

        const sRequest = {
            hillId: request.hillId,
            searchText: request.searchText,
            utilities: selectedOptions
        };

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(sRequest),
            headers: {Accept: "application/json",
            "Content-Type": "application/json"}
        };

        const response = await fetch("/api/mountain-lodges/search", requestOptions);
        const json = await response.json();

        setSearchResults(json);

    }

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if(!sessionStorage.getItem("key")) {
            setLoggedIn(false);
            return;
        } else {
            setLoggedIn(true);
            return;
        }
    }, []);

    const {results: hillResults} = useSelector((state: MainReducer) => state.findAllHillsReducer);
    const {results: utilityResults} = useSelector((state: MainReducer) => state.findAllUtilitiesReducer);
    const {lodges: archivedLodges} = useSelector((state : MainReducer) => state.findAllArchivedLodgesReducer);

    const checkId = (id: number) => {
        if(loggedIn) {
            return archivedLodges.find((v) => v.id === id) !== undefined;
        }
        return false;
    }

    useEffect(() => {
        if (hillResults === undefined || hillResults.length === 0) {
            console.log("Get all Hills...");
            dispatcher(findHills());
        }
    }, [dispatcher, hillResults]);

    useEffect(() => {
        if (utilityResults === undefined || utilityResults.length === 0) {
            console.log("Get all Utilities...");
            dispatcher(findUtilities());
        }
    }, [dispatcher, utilityResults]);

    useEffect(() => {
            if(sessionStorage.getItem("key"))
            dispatcher(findArchivedLodges());
    }, [dispatcher, loggedIn]);

    return (
        <>
        <div className="search-form">
            <Formik initialValues={{
                searchText: ""
            } as MountainLodgeSearchRequest
            } onSubmit={search}>
                {({setFieldValue}) => {
                    return (<Form className="search-lodges-form">
                            <div className={"search-hill"}>
                                <button className="search-button" type="submit">&#8981;</button>
                                <Field className={"input-search"} placeholder={"Pretražite planinarske domove..."}
                                       name={"searchText"} id={"searchText"}/>
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
                                <Select
                                    className="utility-select"
                                    isClearable={true}
                                    isSearchable={true}
                                    placeholder="Odaberite infrastrukturu..."
                                    name={"utilities"}
                                    isMulti
                                    onChange={handleChange}
                                    options={utilityResults}>
                                </Select>
                            </div>
                        </Form>

                    );
                }}
            </Formik>
        </div>
        <div className="results-container">
            {searchResults.length > 0 && searchResults.map(result =>
                <MountainLodgeSearchResult result={result} key={result.id} archived={checkId(result.id)} loggedIn={loggedIn}/>) }
        </div>
    </>
    );

}
