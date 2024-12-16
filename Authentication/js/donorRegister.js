import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
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
const googleProvider = new GoogleAuthProvider();
import {
  getFirestore,
  doc,
  getDoc,
  getDocs, //get all documents inside one collection
  setDoc,
  
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
const db = getFirestore();
const auth = getAuth();

const donorRegisterBtn = document.getElementById("donor-register-Btn");
if (donorRegisterBtn) {
  donorRegisterBtn.addEventListener("click", () => {
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const phoneNumber = document.getElementById("phone-number").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createNewUser(email, password, firstName, lastName, phoneNumber, "donor");
  });
}
function createNewUser(
  email,
  password,
  firstName,
  lastName,
  phoneNumber,
  userType
) {
  createUserWithEmailAndPassword(auth, email, password).then((credenitails) => {
    addUserInfo(userType, email, phoneNumber, firstName, lastName);
  });
}
async function addUserInfo(userType, email, phone, fname, lname) {
  let ref = doc(db, "users", email);
  await setDoc(ref, {
    userType: userType,
  })
    .then(() => {
      console.log("added new user");
      addMedicalInfo(email, fname, lname, phone);
    })
    .catch((err) => {
      console.log(err);
      alert(err);
    });
}
async function addMedicalInfo(email, firstName, lastName, phoneNumber) {
  let ref = doc(db, "MedicalInfo", email);

  await setDoc(ref, {
    firstName: firstName || "",
    lastName: lastName || "",
    phone: phoneNumber || "",
  })
    .then(() => {
      console.log("data added  to database");
      localStorage.setItem("email", email);
      localStorage.setItem("userType", "donor");
      window.location.href = "../Donor/donorhomepage.html";
    })
    .catch((err) => {
      console.log(err);
    });
}
