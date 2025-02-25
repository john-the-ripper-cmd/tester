// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"
const firebaseConfig = {
    apiKey: "AIzaSyDWwGMfCu2nrnzsjVUL-aLl4I3fQFNQ984",
    authDomain: "tcch-66288.firebaseapp.com",
    databaseURL: "https://tcch-66288-default-rtdb.firebaseio.com",
    projectId: "tcch-66288",
    storageBucket: "tcch-66288.firebasestorage.app",
    messagingSenderId: "621738318792",
    appId: "1:621738318792:web:75ea3bb8ab4b238d28fefd",
    measurementId: "G-BL3WD7KSCV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function () {
        messageDiv.style.opacity = 0;
    }, 5000);
}
document.addEventListener("DOMContentLoaded", function () {
const signup = document.getElementById('sub');
signup.addEventListener('click', (event) => {
    event.preventDefault();
    const fullname = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const cpassword = document.getElementById('cpassword').value;
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const auth = getAuth();
    const db = getFirestore();
    createUserWithEmailAndPassword(auth, email, password)//.then is executed when the promise is resolved
        .then((userCredential) => {   //userCredential is the object that's returned by the promise which was returned by the function 
            const user = userCredential.user;
            const userData = {
                email: email,
                // fullname: fullname,
                password: password,
                // cpassword: cpassword,
                // dob: dob,
                // gender: gender,
                // phone: phone,
                // address: address,
            };
        //     showMessage('Account Created Successfully', 'signupmessage');
        //     const docRef = doc(db, "users", user.uid);
        //     setDoc(docRef, userData)
        //         .then(() => {
        //             window.location.href = 'signup.html';
        //         })
        //         .catch((error) => {
        //             console.error("error writing document", error);

        //         });
        // })
        // .catch((error) => {
        //     const errorCode = error.code;
        //     if (errorCode == 'auth/email-already-in-use') {
        //         showMessage('Account Created Successfully', 'signupmessage');
        //     }
        //     else {
        //         showMessage('Account Created Successfully', 'signupmessage');

        //     }
        function showMessage(message, divId) {
            var messageDiv = document.getElementById(divId);
            if (!messageDiv) {
                console.error(`Element with ID '${divId}' not found.`);
                return;
            }
            messageDiv.style.display = "block";
            messageDiv.innerHTML = message;
            messageDiv.style.opacity = 1;
        
            setTimeout(function () {
                messageDiv.style.opacity = 0;
            }, 5000);
        }
        
        })
});
});
