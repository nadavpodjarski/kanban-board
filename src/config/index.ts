import firebase from "firebase";

const db = firebase.firestore();

db.settings({
  host: process.env.REACT_APP_FIRESTORE_EMULATOR_HOST,
});
