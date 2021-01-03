import {UserInfo} from "../mountain-lodge/models/UserInfo";
import React, {useState} from "react";
import {useHistory} from "react-router";
import "./FriendshipRequestsNotification.css"

interface Props {
    user: UserInfo;
    allUsers: UserInfo[];
    setAllUsers: (users: UserInfo[]) => void;
}

class NumberOfClicks {
    static click: number = 0;

    static addClick() {
        this.click++;
        return this.click;
    }
}

export const ShowFriendshipRequestNotification= ({ user, allUsers, setAllUsers}: Props) => {
    const history = useHistory();
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [isAllDone, setIsAllDone] = useState<number>(0);
    const [numberOfNotifications, setNumberOfNotifications] = useState<number>(0);
    const [isFirst, setIsFirst] = useState<boolean>(false);

    if(!isFirst) {
        setNumberOfNotifications(allUsers.length);
        setIsFirst(true);
    }

    function click() {
        setIsClicked((true));
        setIsAllDone(NumberOfClicks.addClick());
    }

    return (

        <div>
            {!isClicked ?(
                <div className="notification-container">
                    <img
                        alt={user.name}
                        src={user.image}
                        className="user-photo"
                        onClick={(e) => history.push("/profile/" + user.id)}
                    />
                    <span>Postali ste prijatelj s <br></br>

                         <div className="user-name">{user.name} <span> </span>
                         <button type="submit" className="submit" onClick={() => click()}>
                           OK
                         </button>
                         </div>

                    </span>
                </div>
            ):(
                <div>
                    {(numberOfNotifications === isAllDone) ? (
                        <div className="event-input">Nema novih obavijesti.</div>
                    ) : (
                        <div> </div>
                    )}
                </div>
            )}
        </div>

    );
};