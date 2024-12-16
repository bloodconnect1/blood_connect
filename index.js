
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
  increment,
  addDoc,
  updateDoc,
  deleteDoc,
  deleteField,
  query,
  where,
  limit,
  orderBy,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
const db = getFirestore();
const auth = getAuth();
getRequestAccepted()
async function getRequestAccepted() {
  const q = query(
    collection(db, "DonationRequests"),
    where("status", "==", "accepted"),
    limit(5)
  );

  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log("No accepted donation requests found.");
      return;
    }
    querySnapshot.forEach((doc) => {
      let bloodQuantity = doc.data().bloodQuantity;
      let donorEmail = doc.data().email;
      fillTable(donorEmail, bloodQuantity);
    });
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}

async function fillTable(email, blood) {
  let ref = doc(db, "MedicalInfo", email);
  try {
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      let data = docSnap.data();
      let firstName = data.firstName;
      let lastName = data.lastName;
      let bloodType = data.bloodType;
      let tableRow = document.createElement("tr");

      tableRow.innerHTML = `
        <td scope="col">#</td>
        <td scope="col">${firstName} ${lastName}</td>
        <td scope="col">${bloodType}</td>
        <td scope="col">${blood}</td>
      `;

      document.getElementById("table-body-heroes").appendChild(tableRow);
    } else {
      console.log("No such donor found in MedicalInfo collection.");
    }
  } catch (error) {
    console.error("Error fetching donor information: ", error);
  }
}
