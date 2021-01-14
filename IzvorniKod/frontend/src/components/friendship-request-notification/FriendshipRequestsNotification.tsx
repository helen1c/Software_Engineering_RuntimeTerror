import React, { useEffect } from "react";
import { UserInfo } from "../mountain-lodge/models/UserInfo";
import { useHistory } from "react-router";
import "./FriendshipRequestsNotification.css";
import { useDispatch, useSelector } from "react-redux";
import { MainReducer } from "../../store/reducer";
import {
  dispatchGetFriendRequestsNotifications,
  dispatchResolveFriendRequestNotification,
} from "../../store/actions/getAndResolveFriendRequestsNotificationActions";

export const FriendshipRequestsNotification = () => {
  const { results: friendRequestsNotificationResults } = useSelector(
    (state: MainReducer) =>
      state.getAndResolveFriendRequestsNotificationActionReducer
  );
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(dispatchGetFriendRequestsNotifications());
  }, []);

  const handleOk = (user: UserInfo) => {
    dispatch(dispatchResolveFriendRequestNotification(user));
  };

  return (
    <div>
      {!friendRequestsNotificationResults.length ? (
        <div className="request-empty"> Nema novih obavijesti.</div>
      ) : (
        <div style={{ margin: "5px" }}>
          <div className="all-users-container">
            <span className="request-heading">Obavijesti</span>
            {friendRequestsNotificationResults.map((user) => (
              <div key={user.id}>
                <div>
                  <div className="notification-container">
                    <img
                      alt={user.name}
                      src={user.image}
                      className="user-request-photo"
                      onClick={(e) => history.push("/profile/" + user.id)}
                    />
                    <span className="user-name-span">
                      Postali ste prijatelj s <br></br>
                      <span className="user-name">{user.name} !</span>{" "}
                    </span>
                    <button
                      type="submit"
                      className="submitButtonaccept"
                      onClick={() => handleOk(user)}
                    >
                      OK
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
