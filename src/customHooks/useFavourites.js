import React, { useState, useEffect, useContext } from "react";
import { LoginRegisterContext } from "../contexts/LoginRegisterContext";
import { database } from "../config/fire";
function useFavourite() {
  const [favData, setFavData] = useState([]);
  const loginRegisterContext = useContext(LoginRegisterContext);

  useEffect(() => {
    if (
      loginRegisterContext.user &&
      loginRegisterContext.user.email != undefined
    ) {
      var favouritesRef = database
        .ref("favourites")
        .orderByChild("uid")
        .equalTo(loginRegisterContext.user.uid);

      favouritesRef.on("value", snapshot => {
        if (snapshot.exists()) {
          let snapdata = snapshot.val();
          let dataWithFirebaseKey = Object.keys(snapdata).map(igkey => {
            return { favId: igkey, ...snapdata[igkey] };
          });
          setFavData(dataWithFirebaseKey);
        }
      });
    }

    return () => {
      if (
        loginRegisterContext.user &&
        loginRegisterContext.user.email != undefined
      ) {
        database
          .ref("favourites")
          .orderByChild("uid")
          .equalTo(loginRegisterContext.user.uid)
          .off();
      }
    };
  }, [loginRegisterContext.user, loginRegisterContext.loggedIn]);

  return [favData, setFavData, loginRegisterContext];
}

export default useFavourite;
