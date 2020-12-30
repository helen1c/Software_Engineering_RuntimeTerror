import React, { useState } from "react";
import "./CreateEventPage.css";
import "../../App.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import moment from "moment";
import { EventDays } from "./EventDays";
import { EventInfo } from "./EventInfo";


export const CreateEventPage = () => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [eventDays, setEventDays] = useState<EventInfo[]>([]);
  const [falseDate, setIsFalseDate] = useState<boolean>(false);

// {isSubmit  &&<EventDays cardsToRender={eventDays} />}
  const formik = useFormik({
    initialValues: {
      name: "",
      path: "",
      endDate: "",
      startDate: "",
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
    var discharge = moment(date2, "DD-MM-YYYY")

    let cards: EventInfo[] = [];
    for (let i = 0; i <= admission.diff(discharge, "days").valueOf(); i++) {
      const card: EventInfo = { date: date1.getFullYear() + "-" + date1.getMonth() + "-" + date1.getDate()};
      date1 = new Date(date1.getTime() + i * 86400000 );
      cards.push(card);
    }
    setEventDays(cards);
    alert(cards?.pop()?.date)

    setIsSubmit(true);
    setIsFalseDate(false);

    if(date1<date2) {
      setIsFalseDate(true);
    }

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
              Unesi detalje po danima
            </button>

            {falseDate ? (
                <div className="event-input">Datum početka mora biti prije datuma završetka</div>
            ) : (
                <EventDays cardsToRender={eventDays}/>
            )}
          </div>
        </form>
      </div>
    </main>
  );
};
