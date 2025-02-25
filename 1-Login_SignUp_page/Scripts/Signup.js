const myForm = document.getElementById("myForm");

myForm.addEventListener("submit", async (event) => {
    event.preventDefault(); 

    let fname = document.getElementById("firstname").value;
    let lname = document.getElementById("lastname").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let cpassword = document.getElementById("cpassword").value;
    let mobile = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
    let dob = document.getElementById("dob").value;
    let gender = document.getElementById("gender").value;
    
    const full_name = `${fname} ${lname}`;

    try {
        const response = await fetch('http://localhost:3000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ full_name, email, dob,password,gender, mobile, address }),
        });

        const result = await response.json();
        alert(result.message);
        //window.location.href='';
    } catch (error) {
        alert('Error submitting form: ' + error.message);
    }
});
