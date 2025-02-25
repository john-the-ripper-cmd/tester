const input_email=document.querySelector("#email");
const input_password=document.querySelector("#password");

const Url = 'http://localhost:3000/user';
const validate = async () => {
    try {
    const response = await fetch(Url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const user = data.find(user => user.email ===input_email);

    if (user) {
      const emailAndPassword = {
        email: user.email,
        password: user.password
      };
      console.log(emailAndPassword); 
    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
