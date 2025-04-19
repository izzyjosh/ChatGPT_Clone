"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provider = exports.db = exports.auth = void 0;
// Import the functions you need from the SDKs you need
var app_1 = require("firebase/app");
var auth_1 = require("firebase/auth");
var firestore_1 = require("firebase/firestore");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCllC2z3UHoRqXkBc3JdpZnktj892hlZzQ",
    authDomain: "chatgpt-66419.firebaseapp.com",
    projectId: "chatgpt-66419",
    storageBucket: "chatgpt-66419.firebasestorage.app",
    messagingSenderId: "771589229738",
    appId: "1:771589229738:web:15d22a11f4bebbf7e554d3"
};
// Initialize Firebase
var app = (0, app_1.initializeApp)(firebaseConfig);
exports.auth = (0, auth_1.getAuth)(app);
exports.db = (0, firestore_1.getFirestore)(app);
exports.provider = new auth_1.GoogleAuthProvider();
exports.default = app;
