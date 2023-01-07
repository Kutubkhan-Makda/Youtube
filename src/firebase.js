// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAt6TpnwDFIQOZuw20WqE4ZtwZFLqqooBg",
    authDomain: "fir-5fc9e.firebaseapp.com",
    projectId: "fir-5fc9e",
    storageBucket: "fir-5fc9e.appspot.com",
    messagingSenderId: "347474594291",
    appId: "1:347474594291:web:ece218d3a4aaa4cba66a86",
    measurementId: "G-DZR0MQ9TST"
  };

  firebase.initializeApp(firebaseConfig);
  export default firebase.auth();