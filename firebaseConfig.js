import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDMuHYLTZ5im1vSMWjaseJWuZmE-tgq0LA",
  authDomain: "adonde-app.firebaseapp.com",
  projectId: "adonde-app",
  storageBucket: "adonde-app.appspot.com",
  messagingSenderId: "856042748200",
  appId: "1:856042748200:web:01350a4cac792a7024f81d",
  measurementId: "G-N6Q6580WSM",
};

export const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
