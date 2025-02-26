import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, get, push, update, onValue } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

// Firebase Configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Sample user data (Starts with peopleCount = 0)
const users = [
    { name: "Aditya Waghmare", gender: "Male", car: "Rolls Royce Phantom", from: "pune station", to: "kondwa", time: "5 am" },
    { name: "Rajnandini Chauhan", gender: "Female", car: "Toyota", from: "pune station", to: "kondwa", time: "8 am" },
    { name: "Rupali Bhatt", gender: "Female", car: "Swift", from: "pune station", to: "kondwa", time: "9 am" },
    { name: "Narayan Shrivastav", gender: "Male", car: "Hyundai i10", from: "pune station", to: "kondwa", time: "5 pm" },
    { name: "Aditya Mule", gender: "Male", car: "Porsche 956", from: "swargate", to: "pune station", time: "6 am" }
];

// Store Sample Data (if not already stored)
async function storeUserData() {
    const usersRef = ref(database, "users");
    const snapshot = await get(usersRef);

    console.log("Checking if users are already stored...");
    if (!snapshot.exists()) {
        console.log("Storing users in Firebase...");
        users.forEach(user => {
            push(usersRef, { ...user, peopleCount: 0 });
        });
    } else {
        console.log("Users are already stored in Firebase.");
    }
}
storeUserData();

// Handle Form Submission
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#myForm").addEventListener("submit", async function (event) {
        event.preventDefault();

        const from = document.querySelector("#from").value.trim().toLowerCase();
        const to = document.querySelector("#to").value.trim().toLowerCase();
        const storedDataList = document.querySelector("#storedData");
        storedDataList.innerHTML = "";
        document.querySelector(".form-container").style.display = "none";

        // Fetch matching users from Firebase
        const usersRef = ref(database, "users");
        get(usersRef).then(snapshot => {
            let found = false;

            snapshot.forEach(childSnapshot => {
                const user = childSnapshot.val();
                const userId = childSnapshot.key;

                if (user.from.toLowerCase() === from && user.to.toLowerCase() === to) {
                    found = true;
                    let img = user.gender.toLowerCase() === "male" ? "male2.png" : "female2.png";

                    const listItem = document.createElement("li");
                    listItem.dataset.userId = userId; // Store user ID for updating count
                    listItem.innerHTML = `
                        
                        <div class="data">
                            <img src="images/${img}" alt="pfp" class="pfp"><br>
                            <strong>Name:</strong> ${user.name} <br>
                            <strong>Gender:</strong> ${user.gender} <br>
                            <strong>Car:</strong> ${user.car} <br>
                            <strong>From:</strong> ${user.from} → <strong>To:</strong> ${user.to} <br>
                            <strong>Time:</strong> ${user.time} <br>
                            <strong>No of People:</strong> <span class="people-count">${user.peopleCount}</span>/5<br>
                        </div>
                        
                        <button class="select-btn">Confirm</button>`;

                    storedDataList.appendChild(listItem);

                    // Listen for real-time updates
                    onValue(ref(database, `users/${userId}`), snapshot => {
                        if (snapshot.exists()) {
                            let userData = snapshot.val();
                            listItem.querySelector(".people-count").innerText = userData.peopleCount;
                        }
                    });
                    
                }
            });

            if (!found) {
                storedDataList.innerHTML = '<li class="no-data">No matching rides found.</li>';
            }
        });
    });

    // Handle Confirm button click
    document.querySelector("#storedData").addEventListener("click", async (event) => {
        if (event.target.classList.contains("select-btn")) {
            const listItem = event.target.closest("li");
            const userId = listItem.dataset.userId;
            let peopleCountRef = ref(database, `users/${userId}/peopleCount`);
    
            get(peopleCountRef).then(snapshot => {
                if (snapshot.exists()) {
                    let currentCount = snapshot.val();
                    if (currentCount < 5) {
                        update(ref(database, `users/${userId}`), { peopleCount: currentCount + 1 });
                        alert("You have confirmed the selection!");
                    } else {
                        alert("Ride is full!");
                    }
                }
            });
        }
    });
});     