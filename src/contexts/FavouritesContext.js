import React, { useState, useEffect } from 'react';
import firebase from '../config/fire';
export const FavouritesContext = React.createContext();

export const FavouritesProvider =(props) => {
  const [favData, setFavData] = useState([]);
   
  useEffect( () => {
      console.log('favourite provider props.loggedIn', props.loggedIn)
    if(props.loggedIn) {
      var db = firebase.database();
      var ref = db.ref('favourites').orderByChild('uid').equalTo(props.user.uid)
      ref.once('value', snapshot => {
        if(snapshot.exists()) {
          let snapdata = snapshot.val()
          let compdata = Object.keys(snapdata).map(igkey => {
            return {favId: igkey, ...snapdata[igkey] }
          });
          console.log(compdata)
          setFavData(compdata)
        }
      });
    }
  },[]) 
    
  return (
    <FavouritesContext.Provider 
      value={{
        favData: favData
      }}>
      {props.children}
    </FavouritesContext.Provider>
  )
    
}