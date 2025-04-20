"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provider = exports.db = exports.auth = void 0;
// Import the functions you need from the SDKs you need
var app_1 = require("firebase/app");
var auth_1 = require("firebase/auth");
var firestore_1 = require("firebase/firestore");
var apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
var messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID;
var appId = import.meta.env.VITE_FIREBASE_APP_ID;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: apiKey,
    authDomain: "chatgpt-66419.firebaseapp.com",
    projectId: "chatgpt-66419",
    storageBucket: "chatgpt-66419.firebasestorage.app",
    messagingSenderId: messagingSenderId,
    appId: appId
};
// Initialize Firebase
var app = (0, app_1.initializeApp)(firebaseConfig);
exports.auth = (0, auth_1.getAuth)(app);
exports.db = (0, firestore_1.getFirestore)(app);
exports.provider = new auth_1.GoogleAuthProvider();
exports.default = app;
