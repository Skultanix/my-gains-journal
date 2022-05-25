const registerForm = document.getElementById("register-form");
// const registerUsername = document.getElementById("register-username");
// const registerPassword = document.getElementById("register-password");

const headers = {
    'Content-Type' : 'application/json'
};

const baseUrl = 'http://localhost:8080/api/v1/users';

const handleSubmit = async (e) => {
    e.preventDefault()

    let bodyObj = {
        username: document.getElementById("register-username").value,
        password: document.getElementById("register-password").value
    };

    console.log(bodyObj)

    const response = await fetch(`http://localhost:8080/api/v1/users/register`, {
        method: "POST",
        body: JSON.stringify(bodyObj),
        headers: headers
    })
        .catch(err => console.error(err.message));

        const responseArr = await response.json();

        if(response.status === 200) {
            window.location.replace(responseArr[0])
        };
};

registerForm.addEventListener("submit", handleSubmit);