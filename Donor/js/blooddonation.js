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
  measurementId: "G-D1TFMS753S",
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
// ------------------------------------------------------------------------
const countryInput = document.getElementById("country");
const provinceInput = document.getElementById("province");
const cityInput = document.getElementById("city");
const registerButton = document.getElementById("registerBtn");
const medicalCenterData = [];
const medicalCentersSpinner = document.getElementById("medical-centers");
const infobutton = document.getElementById("info-button");
const scheduleDateInput = document.getElementById("schedule-date");
const scheduleTimeInput = document.getElementById("schedule-time");

getMedicalCentersName();

async function getMedicalCentersName() {
  const q = query(collection(db, "MedicalCenters"));
  getDocs(q)
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        medicalCenterData.push({
          email: doc.id,
          centerName: doc.data().medicalNameMedicalCenter,
        });
      });
      fillSpinnerCentersName(medicalCenterData);
    })
    .catch((error) => {
      console.error("Error getting documents:", error);
    });
}

document.getElementById("city").addEventListener("change", () => {
  document.getElementById("medical-centers").innerHTML = ``;
  const province = provinceInput.value;
  const cityInputt = cityInput.value;
  updateMedicalCentersName(province, cityInputt);
});

document.getElementById("province").addEventListener("change", () => {
  document.getElementById("medical-centers").innerHTML = ``;
  console.log("Selected province:", provinceInput.value); // Debug log
  updateCities();
});



medicalCentersSpinner.addEventListener("change", () => {
  const infobutton = document.getElementById("info-button");
  infobutton.disabled = medicalCentersSpinner.value === ""; // Disable if no value is selected
});


infobutton.addEventListener("click", () => {
  let email = medicalCentersSpinner.value;
  let url = "medicaldata.html?email=" + encodeURIComponent(email);
  window.open(url, "_blank");
});

function fillSpinnerCentersName(data) {
  const medicalCentersSpinner = document.getElementById("medical-centers");
  const infobutton = document.getElementById("info-button");

  medicalCentersSpinner.innerHTML = ""; // Clear existing options

  if (data.length === 0) {
      // No medical centers found
      infobutton.disabled = true;
      console.log("No medical centers available.");
      return;
  }

  // Populate medical centers dropdown
  data.forEach((center) => {
      const option = `<option value="${center.email}">${center.centerName}</option>`;
      medicalCentersSpinner.innerHTML += option;
  });

  // Auto-select the first center and enable the infobutton
  medicalCentersSpinner.selectedIndex = 0; // Auto-select the first option
  infobutton.disabled = false; // Enable the info button

  // Trigger change event for medical-centers dropdown
  medicalCentersSpinner.dispatchEvent(new Event("change"));
}


registerButton.addEventListener("click", function (event) {
  event.preventDefault();
  let centerName = document.getElementById("medical-centers");
  let centerEmail = centerName.value;
  const country = countryInput.value;
  const province = provinceInput.value;
  const city = cityInput.value;
  let bloodQuantity = Number(document.getElementById("blood-units").value);
  const scheduleDate = scheduleDateInput.value; // Capture the schedule date
  const scheduleTime = scheduleTimeInput.value; // Capture the schedule date
  addDocWithSpecificId(
    localStorage.getItem("email"),
    country,
    province,
    city,
    bloodQuantity,
    centerEmail,
    scheduleDate,
    scheduleTime
  ); // Pass the date to the function
});

async function addDocWithSpecificId(
  email,
  country,
  province,
  city,
  bloodQuantity,
  centerEmail,
  scheduleDate,
  scheduleTime
) {
  let ref = doc(db, "DonationRequests", email);
  await setDoc(ref, {
    email: email,
    country: country,
    province: province,
    city: city,
    bloodQuantity: bloodQuantity,
    status: "pending",
    deleted: "false",
    centerEmail: centerEmail,
    scheduleDate: scheduleDate,
    scheduleTime: scheduleTime,
  })
    .then(() => {
      alert("Thanks for donation");
      window.location = "./donorhomepage.html";
    })
    .catch((err) => {
      alert(err);
    });
}
function updateCities() {
  const province = provinceInput.value;
  const citySelect = document.getElementById("city");
  citySelect.innerHTML = ""; // Clear existing options
  let cities = [];

  switch (province) {
      case "Beirut":
          cities = ["Beirut City", "Achrafieh", "Hamra"];
          break;
      case "South Lebanon":
          cities = ["Tyre", "Sidon", "Jezzine"];
          break;
      case "North Lebanon":
          cities = ["Tripoli", "Bsharri", "Batroun"];
          break;
      case "Mount Lebanon":
          cities = ["Jounieh", "Zahle", "Byblos"];
          break;
      case "Bekaa":
          cities = ["Zahle", "Baalbek", "Rashaya"];
          break;
      case "Nabatieh":
          cities = ["Nabatieh", "Hasbaya", "Bint Jbeil"];
          break;
      case "Akkar":
          cities = ["Halba", "Akkar el Atika", "Kobayat"];
          break;
      case "Baabda":
          cities = ["Baabda", "Aley", "Chouf"];
          break;
      default:
          cities = [];
  }

  cities.forEach((city) => {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
  });

  // Auto-select the first city and trigger the change event
  if (cities.length > 0) {
      citySelect.selectedIndex = 0; // Select the first city
      citySelect.dispatchEvent(new Event("change")); // Trigger change event
  }
}

async function updateMedicalCentersName(province, city) {
  let dataNames = [];
  console.log(`Updating medical centers for Province: ${province}, City: ${city}`); // Debugging
  const q = query(
      collection(db, "MedicalCenters"),
      where("province", "==", province),
      where("city", "==", city)
  );

  getDocs(q)
      .then((querySnapshot) => {
          if (querySnapshot.empty) {
              console.log("No medical centers found.");
              fillSpinnerCentersName([]);
          } else {
              querySnapshot.forEach((doc) => {
                  const data = doc.data();
                  dataNames.push({
                      email: doc.id,
                      centerName: data.medicalNameMedicalCenter,
                  });
              });
              fillSpinnerCentersName(dataNames);
          }
      })
      .catch((error) => {
          console.error("Error getting medical centers:", error);
      });
}



