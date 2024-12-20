let navigation = document.querySelector(".navigation"),
  toggle = document.querySelector(".toggle"),
  main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
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
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  deleteField,
  query,
  where,
  orderBy,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
const db = getFirestore();
const auth = getAuth();
// -----------------------------------------------------------------------------------
document.getElementById("send-urgent").addEventListener("click", function () {
  getAlldonorEmails()
    .then((donorEmails) => {
      composeEmail(donorEmails);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error getting donor emails");
    });
});
document.getElementById("sign-out-btn").addEventListener("click", () => {
  const confirmation = confirm("Are you sure you want to logout?");

  // If user clicks "OK", redirect to index.html
  if (confirmation) {
    localStorage.clear();
    window.location.href = "../index.html";
  }
});

async function getAlldonorEmails() {
  let donorEmails = [];
  const q = query(collection(db, "users"), where("userType", "==", "donor"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const email = doc.id; // Assuming email is a field in your user documents
    donorEmails.push(email);
  });

  return donorEmails;
}

function composeEmail(donorEmails) {
  const toField = encodeURIComponent(donorEmails.join(","));
  const subject = encodeURIComponent("Urgent Request for Blood Donation");
  const body = encodeURIComponent(
    "Dear Donors,\n\nWe are currently facing an urgent shortage of blood supply. Your donation can save lives. Please consider donating blood at your earliest convenience.\n\nThank you for your generosity.\n\nSincerely,\nThe Blood Donation Team"
  );
  const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${toField}&su=${subject}&body=${body}&fs=1&tf=1`;

  // Open Gmail compose window after filling fields
  window.open(gmailUrl, "_blank");
}

document.getElementById("searchButton").addEventListener("click", function () {
  // Get the selected city
  const selectedCity = document.getElementById("city").value;
  const selectedBloodType = document.getElementById("blood-type-spinner").value;

  console.log("clicked");
  getDocuments(selectedCity, selectedBloodType);
});
function getDocuments(city, bloodType) {
  document.getElementById("table").innerHTML = "";

  console.log(city, bloodType);

  const q = query(
    collection(db, "BloodBanks"),
    where("province", "==", city, "&&", "bloodType", "==", bloodType)
    // where("bloodType", "==", `O+`)
  );

  getDocs(q)
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const bloodValue = doc.data()[bloodType];
        fillTable(doc.id, bloodValue, bloodType);

        // Use the data as needed
      });
    })
    .catch((error) => {
      alert("error getting documents");
    });
}
function fillTable(email, bloodValue, bloodType) {
  console.log(email, bloodValue, bloodType);
  let content = `
    <tr>
    <td>${bloodType}</td>
    <td>${bloodValue}</td>
    <td>${email.toLowerCase()}</td>
    <!-- <td><span class="status return">Return</span></td> -->
  </tr>`;
  document.getElementById("table").innerHTML += content;
}
