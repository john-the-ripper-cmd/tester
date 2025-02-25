// var user = firebase.database().ref('user');
// document.getElementById("sub").onclick = function(e) {
//     e.preventDefault();
    
//     let name = document.getElementById("full-name").value;
//     let email = document.getElementById("email").value;
//     let password = document.getElementById("password").value;

//     auth.createUserWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//         let user = userCredential.user;
        
//         database.ref("users/" + user.uid).set({
//             name: name,
//             email: email,
//             password: password  // Avoid storing passwords directly in the database
//         });

//         alert("Signup successful!");
//         window.location.href = "login.html";
//     })
//     .catch((error) => {
//         alert(error.message);
//     });
// };
// Get form element
const form = document.getElementById("myForm");

// Handle form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Get all form values
    const userData = {
        fullName: document.getElementById("full-name").value,
        email: document.getElementById("email").value,
        dob: document.getElementById("dob").value,
        gender: document.getElementById("gender").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value
    };

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("cpassword").value;

    // Validate passwords match
    if(password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
    }

    // Create user account
    auth.createUserWithEmailAndPassword(userData.email, password)
    .then((userCredential) => {
        // Remove password before saving to database
        delete userData.email; // Email already in auth
        delete userData.password;

        // Save additional user data
        database.ref(`users/${userCredential.user.uid}`).set({
            ...userData,
            createdAt: firebase.database.ServerValue.TIMESTAMP
        })
        .then(() => {
            alert("Signup successful! Redirecting...");
            window.location.href = "loginpage1.html";
        })
        .catch((error) => {
            console.error("Database write error:", error);
            alert("Error saving user data: " + error.message);
        });
    })
    .catch((error) => {
        console.error("Auth error:", error);
        alert("Signup error: " + error.message);
    });
});