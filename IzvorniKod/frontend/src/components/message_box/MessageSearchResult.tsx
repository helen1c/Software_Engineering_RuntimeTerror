import React, { useEffect, useState } from "react";
import "./MessageSearchResult.css";
import { useDispatch, useSelector } from "react-redux";
import { MainReducer } from "../../store/reducer";
import { findMessages } from "../../store/actions/findAllMessagesAction";
import { MessageFindResult } from "./models/MessageFindResult";

export const MessageSearchResult = () => {
  const dispatcher = useDispatch();
  const { results: messagesResults, status } = useSelector(
    (state: MainReducer) => state.findAllMessagesReducer
  );
  const [loading, setLoading] = useState(true);
  const [read, setRead] = useState(true);

  useEffect(() => {
    if (read) {
      console.log("Get all Messages...");
      setRead(false);
      dispatcher(findMessages());
    }
  }, [dispatcher, messagesResults, read]);

  const [role, setRole] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("key") !== null) {
      fetch("/api/users/user/role", {
        method: "GET",
        headers: new Headers({
          authorization: sessionStorage.getItem("key") || "",
        }),
      }).then(function (response) {
        if (response.status === 200) {
          response.json().then((e) => {
            setRole(e.role);
            setLoading(false);
          });
        } else {
          setRole("KORISNIK");
          setLoading(false);
        }
      });
    } else {
      setRole("NEPRIJAVLJEN");
      setLoading(false);
    }
  }, []);

  const update = async (result: MessageFindResult) => {
    const sRequest = {
      id: result.id,
      status: result.status,
    };

    const requestOptions = {
      method: "PATCH",
      body: JSON.stringify(sRequest),
      headers: {
        Accept: "application/json",
        authorization: sessionStorage.getItem("key") || "",
        "Content-Type": "application/json",
      },
    };
    const response = await fetch("/api/messages/update", requestOptions);
    window.location.href = "/admin/message-box";
  };
  return (
    <>
      <div>
        {(status === "waiting" || loading) && (
          <div>
            {role === "ADMIN" ? (
              <div>
                {messagesResults.length > 0 ? (
                  messagesResults.map((result) => (
                    <div className="result-box">
                      <span className="result-column">
                        <p>Korisnik:</p>
                        <a
                          onClick={(e) =>
                            (window.location.href = "/profile/" + result.userId)
                          }
                        >
                          {result.userName}
                        </a>
                      </span>
                      <span className="result-column">
                        <p>NASLOV PORUKE:</p>
                        {result.name}
                      </span>
                      <span className="result-column">
                        <p>GREŠKA NASTALA:</p>
                        {result.error}
                      </span>
                      <text className="result-column">
                        <p>SADRŽAJ:</p>
                        {result.content}
                      </text>
                      <span className="result-column">
                        <button onClick={() => update(result)}>RIJEŠENO</button>
                      </span>
                    </div>
                  ))
                ) : (
                  <h1 className="message-notification">Nema poruka!</h1>
                )}
              </div>
            ) : (
              <h1 className="error-message">Nemate ovlasti!</h1>
            )}
          </div>
        )}
      </div>
    </>
  );
};
