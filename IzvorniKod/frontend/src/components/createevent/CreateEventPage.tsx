import React, { useState } from "react";
import "./CreateEventPage.css";
import "../../App.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import moment from "moment";
import { ShowEvent } from "./ShowEvent";

export const CreateEventPage = () => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [numberOfDays, setNumberOfDays] = useState();

  const formik = useFormik({
    initialValues: {
      name: "",
      path: "",
      endDate: "",
      startDate: "",
      dateCreated: "",
      description: "",
    },

    validateOnChange: false,
    validateOnMount: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      name: Yup.string().required("Obavezan unos!"),

      path: Yup.string().required("Obavezan unos!"),
      startDate: Yup.date().required("Obavezan unos!"),
      endDate: Yup.date().min(Yup.ref("startDate")).required("Obavezan unos!"),
    }),

    onSubmit: (values) => {
        //ovdje se treba slati dok sve bude ispunjeno i one kucice se trebaju stvoriti odmah ispod onog gumba, ja bi to sve ubacio na jednu stranicu

      // var date1 = new Date(values.endDate);
      // var date2 = new Date(values.startDate);
      //
      // var admission = moment(date1, "DD-MM-YYYY");
      // var discharge = moment(date2, "DD-MM-YYYY");
      //
      // //setEventInfo(discharge.diff(admission, "days"));
      // setIsSubmit(true);
    },
  });

  function a() {
    var date1 = new Date(formik.values.endDate);
    var date2 = new Date(formik.values.startDate);

    var admission = moment(date1, "DD-MM-YYYY");
    var discharge = moment(date2, "DD-MM-YYYY");

    setNumberOfDays(admission.diff(discharge, "days"));
    setIsSubmit(true);
  }

  return (
    <main className="main">
      <div className="event-header">
        <h1>Novi događaj</h1>
      </div>
      <div className="main-event">
        <form onSubmit={formik.handleSubmit}>
          <div className="event-container">
            <div className="event-column">
              <div className="eventComponent">
                <p className={"inputLabel"}>Naziv događaja:</p>
                <input
                  id="name"
                  className="event-input"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                <p className="errorText">
                  {formik.errors.name ? formik.errors.name : null}
                </p>
              </div>

              <div className="eventComponent">
                <p className={"inputLabel"}>Naziv staze:</p>
                <input
                  className={"event-input"}
                  id="path"
                  value={formik.values.path}
                  onChange={formik.handleChange}
                />
                <p className="errorText">
                  {formik.errors.path ? formik.errors.path : null}
                </p>
              </div>
              <div className="eventComponent">
                <p style={{ marginTop: "2rem" }} className={"inputLabel"}>
                  Opis događaja:
                </p>
                <textarea
                  placeholder={"Unesite detalje puta..."}
                  className={"event-text-area"}
                  id="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
                <p className="errorText">
                  {formik.errors.description ? formik.errors.description : null}
                </p>
              </div>
              <div className="eventComponent">
                <p className={"inputLabel"}>Datum stvaranja događaja:</p>
                <input
                  className={"event-input"}
                  id="dateCreated"
                  type="date"
                  max={moment().format("YYYY-MM-DD")}
                  value={formik.values.dateCreated}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="eventComponent">
                <p className={"inputLabel"}>Datum početka:</p>
                <input
                  className={"event-input"}
                  id="startDate"
                  type="date"
                  min={moment().format("YYYY-MM-DD")}
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="eventComponent">
                <p className={"inputLabel"}>Datum završetka:</p>
                <input
                  className={"event-input"}
                  id="endDate"
                  type="date"
                  min={moment().format("YYYY-MM-DD")}
                  value={formik.values.endDate}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
          </div>
          <div>
            <button type="submit" className="submitButton" onClick={() => a()}>
              Stvori događaj
            </button>

            {isSubmit && <ShowEvent numberOfDays={numberOfDays} />}
          </div>
        </form>
      </div>
    </main>
  );
};
