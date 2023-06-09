import React, {useState} from "react";
import "./CreateEventPage.css";
import "../../App.css";
import * as Yup from "yup";
import {useFormik} from "formik";
import moment from "moment";
import {EventDays} from "./EventDays";
import {EventInfo} from "./EventInfo";
import {Paths} from "./models/Paths";
import {useHistory} from "react-router";

export const CreateEventPage = () => {
    const history = useHistory();
    const [eventDays, setEventDays] = useState<EventInfo[]>([]);
    const [falseDate, setIsFalseDate] = useState<boolean>(false);
    const [paths, setPaths] = useState<Paths[]>();

    const formik = useFormik({
        initialValues: {
            name: "",
            endDate: "",
            startDate: "",
            description: "",
        },

        validateOnChange: false,
        validateOnMount: false,
        validateOnBlur: false,
        validationSchema: Yup.object({
            name: Yup.string().required("Obavezan unos!"),
            startDate: Yup.date().required("Obavezan unos!"),
            endDate: Yup.date().min(Yup.ref("startDate")).required("Obavezan unos!"),
        }),

        onSubmit: (values) => {
            let newEvent = {
                userId: 1,
                name: values.name,
                endDate: values.endDate,
                startDate: values.startDate,
                description: values.description,
                paths: paths
            }

            fetch("/api/event", {
                method: "POST",
                body: JSON.stringify(newEvent),
                headers: new Headers({
                    "Content-Type": "application/json",
                    authorization: sessionStorage.getItem("key") || "",
                }),
            }).then(function (response) {
                if (response.status === 201) {
                    sessionStorage.setItem("successfulEventCreation", "true");
                    history.push('/mountaineering-community');
                } else {
                    //nadodat isto kao na izradi doma
                }
            });
        },
    });

    function calculateDayDifference() {
        var date1 = new Date(formik.values.endDate);
        var date2 = new Date(formik.values.startDate);

        var admission = moment(date1, "DD-MM-YYYY");
        var discharge = moment(date2, "DD-MM-YYYY")

        initializeCards(admission.diff(discharge, "days"));

        setIsFalseDate(false);

        if (date1 < date2) {
            setIsFalseDate(true);
        }

    }

    const initializeCards = (differenceInDays: number) => {
        let cards: EventInfo[] = [];

        for (let i = 1; i <= differenceInDays + 1; i++) {
            if (formik.values.startDate !== null) {
                const cardDate = new Date(
                    moment(formik.values.startDate)
                        .add(i, "days")
                        .toDate()
                );
                const card: EventInfo = { date: cardDate.toISOString().slice(0,10)};
                cards.push(card);
            }
        }
        setEventDays(cards);
    };

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
                                <p style={{marginTop: "2rem"}} className={"inputLabel"}>
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
                        <button className="submitButton" onClick={() => calculateDayDifference()} type="button">
                            Unesi detalje po danima
                        </button>

                        {falseDate ? (
                            <div className="event-input">Datum početka mora biti prije datuma završetka</div>
                        ) : (
                            <EventDays cardsToRender={eventDays} paths={paths || []}
                                       setPaths={setPaths}/>
                        )}
                    </div>
                    {eventDays.length ? (
                        <button type="submit" className="submitButton">
                            Stvori događaj
                        </button>
                    ) : (
                        ""
                    )}
                </form>
            </div>
        </main>
    );
};
