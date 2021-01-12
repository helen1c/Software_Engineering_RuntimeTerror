import React, { useEffect, useState } from "react";
import "./MessageSearchResult.css";
import { MessageFindResult } from "./models/MessageFindResult";
import check from "../../assets/checkmark.png";
import Snackbar from "@material-ui/core/Snackbar";
import {Alert} from "@material-ui/lab";
import {fetcher} from "../../Util";

export const MessageSearchResult = () => {
  const [allMessages, setAllMessages] = useState<MessageFindResult[]>();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");
  const [success, setSuccessMessage] = React.useState(false);
  const [error, setErrorMessage] = React.useState(false);

  const successMessage = () => {
    setSuccessMessage(true);
  };
  const errorMessage = () => {
    setErrorMessage(true);
  };

  const closeSuccessMessage = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessMessage(false);
  };
  const closeErrorMessage = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorMessage(false);
  };

  useEffect(() => {
    if (sessionStorage.getItem("key") !== null) {
      fetcher("/api/messages/all", {
        method: "GET"
      }).then(function (response) {
        if (response.status === 200) {
          response.json().then((e) => {
            setAllMessages(e);
          });
          fetcher("/api/users/user/role", {
            method: "GET"
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
        }
      });
    } else {
      setRole("NEPRIJAVLJEN");
      setLoading(false);
    }
  }, []);

  const update = async (message: MessageFindResult) => {
    const sRequest = {
      id: message.id,
      status: message.status,
    };

    fetcher("/api/messages/update", {
      method: "PATCH",
      body: JSON.stringify(sRequest)
    }).then(function (response) {
      if (response.status === 200) {
        let messages = allMessages;
        messages = messages?.filter((m) => m !== message);
        setAllMessages(messages);
        successMessage();
      } else {
        errorMessage();
      }
    });
  };
  return (
    <>
      <Snackbar open={success} autoHideDuration={2000} onClose={closeSuccessMessage}>
        <Alert onClose={closeSuccessMessage} severity="success">
          Poruka je riješena.
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={2000} onClose={closeErrorMessage}>
        <Alert onClose={closeErrorMessage} severity="error">
          Dogodila se pogreška. Pokušajte kasnije.
        </Alert>
      </Snackbar>
      <div>
        {!loading && (
          <div>
            {role === "ADMIN" ? (
              <div className="admin-container">
                {allMessages && allMessages.length > 0 ? (
                  allMessages.map((message) => (
                    <div className="result-box">
                      <span className="result-column-name">
                        <p>Naslov poruke:</p>
                        {message.name}
                      </span>
                      <span className="result-column">
                        <p className="result-user-p">Korisnik:</p>
                        <a
                          onClick={(e) =>
                            (window.location.href =
                              "/profile/" + message.userId)
                          }
                        >
                          {message.userName}
                        </a>
                      </span>

                      <span className="result-column">
                        <p className="result-user-p">Greška nastala:</p>
                        {message.error}
                      </span>
                      <text className="result-column-content">
                        <p className="result-user-p">Sadržaj:</p>
                        <span className="message-content-admin" > {message.content}</span>
                      </text>
                      <span className="result-column">
                        <button className="admin-button" onClick={() => update(message)}>
                          RIJEŠENO <img  className="going-btn-img" src={check} alt={"Check"}/>
                        </button>
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
