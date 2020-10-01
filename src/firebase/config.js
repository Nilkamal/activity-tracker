import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC7-JUbYt0bWhBq9BQmpJ10dmxMd2EE5wE",
    authDomain: "activity-tracker-4c465.firebaseapp.com",
    databaseURL: "https://activity-tracker-4c465.firebaseio.com",
    projectId: "activity-tracker-4c465",
    storageBucket: "activity-tracker-4c465.appspot.com",
    messagingSenderId: "219528396381",
    appId: "1:219528396381:web:083709e734ae7c209e57b4",
    measurementId: "G-T2XCKXQV3T"
  };

firebase.initializeApp(firebaseConfig);
export const authentication = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();


export const firestore = firebase.firestore();
