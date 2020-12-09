import React, {useEffect, useState} from "react";
import './MountainLodgeSearch.css'
import Select, {ValueType} from "react-select";
import {Formik, Form, Field} from "formik";
import {HillOption} from "../models/HillOption";
import {MountainLodgeSearchRequest} from "../models/MountainLodgeSearchRequest";
import {useDispatch, useSelector} from "react-redux";
import {MainReducer} from "../../../store/reducer";
import {findHills} from "../../../store/actions/findAllHillsActions";
import {UtilityOption} from "../models/UtilityOption";
import {findUtilities} from "../../../store/actions/findAllUtilitiesActions";

export const MountainLodgeSearch = () => {

    const dispatcher = useDispatch();
    const [s, setS] = useState("");

    const ispis = (request : MountainLodgeSearchRequest) => {
        setS("Upravo pretražujete dom naziva: " + request.searchText);
    }

    const {results: hillResults} = useSelector((state: MainReducer) => state.findAllHillsReducer);
    const {results: utilityResults} = useSelector((state: MainReducer) => state.findAllUtilitiesReducer);

    useEffect(() => {
        if(hillResults === undefined || hillResults.length === 0) {
            console.log("Get all Hills...");
            dispatcher(findHills());
        }
    }, [dispatcher, hillResults]);

    useEffect(() => {
        if(utilityResults === undefined || utilityResults.length === 0) {
            console.log("Get all Utilites...");
            dispatcher(findUtilities());
        }
    }, [dispatcher, utilityResults]);


    return (
        <div className="search-form">
            <Formik initialValues={{
                searchText: "",
                utilities: [utilityResults[0] ,utilityResults[1]],
                hillId: 1
            } as MountainLodgeSearchRequest
            } onSubmit={ispis}>
                {({setFieldValue}) =>{
                    return (<Form className="search-lodges-form">

                            <div className={"search-hill"}>
                                <button className="search-button" type="submit">&#8981;</button>
                                <Field className={"input-search"} placeholder={"Pretražite planinarske domove..."} name={"searchText"} id={"searchText"}/>

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
                                onChange={(option: ValueType<UtilityOption>) => setFieldValue("utilities",
                                    option === null ? null : (option as UtilityOption).value)
                                }
                                options={utilityResults}>
                            </Select>
                            </div>
                    </Form>

                  );
                }}
            </Formik>
            <p className={"searching"}>{s}</p>

            </div>
        );

}
