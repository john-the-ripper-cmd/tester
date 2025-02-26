import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDWwGMfCu2nrnzsjVUL-aLl4I3fQFNQ984",
    authDomain: "tcch-66288.firebaseapp.com",
    databaseURL: "https://tcch-66288-default-rtdb.firebaseio.com",
    projectId: "tcch-66288",
    storageBucket: "tcch-66288.appspot.com",
    messagingSenderId: "621738318792",
    appId: "1:621738318792:web:75ea3bb8ab4b238d28fefd",
    measurementId: "G-BL3WD7KSCV"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.getElementById("riderForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const rider = {
        name: document.getElementById("name").value,
        gender: document.getElementById("gender").value,
        car: document.getElementById("car").value,
        from: document.getElementById("from").value,
        to: document.getElementById("to").value,
        time: document.getElementById("time").value,
        peopleCount: 0 // Default
    };
    
    push(ref(database, "users"), rider).then(() => {
        alert("Rider registered successfully!");
        document.getElementById("riderForm").reset();
    }).catch(error => {
        alert("Error: " + error.message);
    });
});
