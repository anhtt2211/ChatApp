import firebase from "firebase";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyA6lCCeYKrH60T-zxx1UT-2S76phkG9MeI",
  authDomain: "chat-app-react-83957.firebaseapp.com",
  projectId: "chat-app-react-83957",
  storageBucket: "chat-app-react-83957.appspot.com",
  messagingSenderId: "758025836752",
  appId: "1:758025836752:web:2bdae44f30c816491066d5",
  measurementId: "G-379JFCVBT5",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

auth.useEmulator("http://localhost:7000");
if (window.location.hostname === "localhost") {
  db.useEmulator("localhost", "7050");
}

export { db, auth };
export default firebase;
