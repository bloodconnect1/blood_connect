// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCOvOqeWsjg2oAUkD5u3KEIR6NWT_PXk3U",
    authDomain: "bloodconnect-11c0e.firebaseapp.com",
    projectId: "bloodconnect-11c0e",
    storageBucket: "bloodconnect-11c0e.firebasestorage.app",
    messagingSenderId: "537017855792",
    appId: "1:537017855792:web:8f6e75bfbd0b060da6a2f5",
    measurementId: "G-D1TFMS753S"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Add Firebase app, auth, and db to the global scope
window.app = app;
window.analytics = analytics;
window.auth = auth;
window.db = db;