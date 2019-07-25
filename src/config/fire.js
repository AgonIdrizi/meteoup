import firebase from 'firebase';

const config =  {
    apiKey: "AIzaSyAPuzFpV_XriYx72RQDkgGyjAtaADt-94E",
    authDomain: "meteoup-110f8.firebaseapp.com",
    databaseURL: "https://meteoup-110f8.firebaseio.com",
    projectId: "meteoup-110f8",
    storageBucket: "meteoup-110f8.appspot.com",
    messagingSenderId: "446361811173",
    appId: "1:446361811173:web:bd723563492a46e5"
  };

  const fire = firebase.initializeApp(config)
  export default fire;