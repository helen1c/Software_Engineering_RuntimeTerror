import React, { useEffect, useState } from "react";
import { UserInfo } from "../mountain-lodge/models/UserInfo";
import { HttpCodesUtil } from "../mountaineering-community/HttpCodesUtil";
import { useHistory } from "react-router";
import "./FriendshipRequestList.css";
import {useDispatch, useSelector} from "react-redux";
import {MainReducer} from "../../store/reducer";
import {
  dispatchAcceptFriendRequest,
  dispatchRefuseFriendRequest,
  findFriendRequests
} from "../../store/actions/getAndRefuseAndAcceptFriendRequestsActions";
import getAndRefuseAndAcceptFriendRequestsReducer
  from "../../store/reducers/getAndRefuseAndAcceptFriendRequestsReducer";

export const FriendshipRequestList = () => {
  const dispatch = useDispatch();
  const {results: friendRequestsResults} = useSelector((state: MainReducer) => state.getAndRefuseAndAcceptFriendRequestsReducer);
  const history = useHistory();

  function confirm(user: UserInfo) {
    dispatch(dispatchAcceptFriendRequest(user));
  }

  function refuse(user: UserInfo) {
    dispatch(dispatchRefuseFriendRequest(user));
  }

  useEffect(() => {
    dispatch(findFriendRequests())
  }, []);

  return (
      <div>
        {!friendRequestsResults.length ? (
            <div className="request-empty">Nema pristiglih zahtjeva za prijateljstvo. </div>
        ) : (
            <div style={{ backgroundColor: "aliceblue" }}>
              <div className="all-users-container">
                <span className="request-heading"> Zahtjevi za prijateljstvo </span>
                {friendRequestsResults.map((user) => (
                    <div key={user.id}>
                      <div className="users-container">
                        <div className="user-request">
                          <img
                              alt={user.name}
                              src={user.image}
                              className="user-request-photo"
                              onClick={(e) => history.push("/profile/" + user.id)}
                          />
                          <span>
                      <span className="user-name">{user.name} </span>
                      vam šalje zahtjev za prijateljstvo !{" "}
                    </span>
                          <button
                              type="submit"
                              className="submitButtonaccept"
                              onClick={() => confirm(user)}
                          >
                            Prihvati
                          </button>
                          <button
                              type="submit"
                              className="submitButtondecline"
                              onClick={() => refuse(user)}
                          >
                            Odbij
                          </button>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            </div>
        )}
      </div>
  );
};
