import React from "react";
import './MountainLodgeSearch.css'
import Select, {ValueType} from "react-select";
import {Formik, Form, Field} from "formik";
import {HillOption} from "../models/HillOption";
import {MountainLodgeSearchRequest} from "../models/MountainLodgeSearchRequest";

export const MountainLodgeSearch = () => {


    const ispis = (request : MountainLodgeSearchRequest) => {
        console.log(request.searchText);
        console.log(request.hillId);
        console.log("sada")
    }

    const options = [
        { value: 1, label: 'Medvednica' },
        { value: 2, label: 'Sljeme' },
        { value: 3, label: 'Sjeverni Velebit' }
    ]

    return (
        <div className="search-form">
            <Formik initialValues={{
                searchText: "1000",
                hillId: 2
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
                            options={options}>
                        </Select>
                    </Form>
                  );
                }}
            </Formik>


            </div>
        );

}
