import React, { useEffect, useState } from "react";
import "./MessageSearchResult.css";
import { MessageFindResult } from "./models/MessageFindResult";

export const MessageSearchResult = () => {
  const [allMessages, setAllMessages] = useState<MessageFindResult[]>();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("key") !== null) {
      fetch("/api/messages/all", {
        method: "GET",
        headers: new Headers({
          authorization: sessionStorage.getItem("key") || "",
        }),
      }).then(function (response) {
        if (response.status === 200) {
          response.json().then((e) => {
            setAllMessages(e);
          });
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

    fetch("/api/messages/update", {
      method: "PATCH",
      body: JSON.stringify(sRequest),
      headers: new Headers({
        authorization: sessionStorage.getItem("key") || "",
        "Content-Type": "application/json"
      }),
    }).then(function (response) {
      if (response.status === 200) {
        let messages = allMessages;
        messages = messages?.filter((m) => m !== message);
        setAllMessages(messages);
      } else {
      }
    });
  };
  return (
    <>
      <div>
        {!loading && (
          <div>
            {role === "ADMIN" ? (
              <div>
                {allMessages && allMessages.length > 0 ? (
                  allMessages.map((message) => (
                    <div className="result-box">
                      <span className="result-column">
                        <p>Korisnik:</p>
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
                        <p>NASLOV PORUKE:</p>
                        {message.name}
                      </span>
                      <span className="result-column">
                        <p>GREŠKA NASTALA:</p>
                        {message.error}
                      </span>
                      <text className="result-column">
                        <p>SADRŽAJ:</p>
                        {message.content}
                      </text>
                      <span className="result-column">
                        <button onClick={() => update(message)}>
                          RIJEŠENO
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