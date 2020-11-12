import React, {useEffect} from "react";
import './MountainLodgeSearch.css'
import Select, {ValueType} from "react-select";
import {Formik, Form, Field} from "formik";
import {HillOption} from "../models/HillOption";
import {MountainLodgeSearchRequest} from "../models/MountainLodgeSearchRequest";
import {useDispatch, useSelector} from "react-redux";
import {MainReducer} from "../../../store/reducer";
import {findHills} from "../../../store/actions/findAllHillsActions";

export const MountainLodgeSearch = () => {

    const dispatcher = useDispatch();

    const ispis = (request : MountainLodgeSearchRequest) => {
        console.log("Upravo pretražujete dom naziva: " + request.searchText + ", a visočje je: " + results.filter(s => s.value === request.hillId));
    }

    const {results} = useSelector((state: MainReducer) => state.findAllHillsReducer);

    useEffect(() => {
        if(results === undefined || results.length === 0) {
            console.log("Get all Hills...");
            dispatcher(findHills());
        }
    }, [dispatcher, results]);

    return (
        <div className="search-form">
            <Formik initialValues={{
                searchText: ""
            } as MountainLodgeSearchRequest
            } onSubmit={ispis}>
                {({setFieldValue}) =>{
                    return (<Form className="search-lodges-form">
                            <button className="search-button" type="submit">&#8981;</button>
                        <Field className={"input-search"} placeholder={"Pretražite planinarske domove..."} name={"searchText"} id={"searchText"}/>
                        <Select
                            className="hill-select"
                            isClearable={true}
                            isSearchable={true}
                            placeholder="Odaberite područje..."
                            name={"hillId"}
                            onChange={(option: ValueType<HillOption>) => setFieldValue("hillId",
                                option === null ? null : (option as HillOption).value)
                            }
                            options={results}>
                        </Select>
                    </Form>
                  );
                }}
            </Formik>


            </div>
        );

}
