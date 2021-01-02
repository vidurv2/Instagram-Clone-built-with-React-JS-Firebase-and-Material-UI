import firebase from "firebase";

const firebaseApp = firebase.initializeApp(
    {
  apiKey: "AIzaSyDrk-uTW0TsJPjyqyHZjOIq8W4lBxt6_G4",
  authDomain: "react-instagram-copy.firebaseapp.com",
  projectId: "react-instagram-copy",
  storageBucket: "react-instagram-copy.appspot.com",
  messagingSenderId: "216397637927",
  appId: "1:216397637927:web:813ca8bae4e0778af76102",
  measurementId: "G-MKGYQQPC3Q"
    }
);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db , auth , storage};