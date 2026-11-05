import {createNotification} from "../components/notification.js";

const USERNAME_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{6,24}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{6,16}$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

const form = document.querySelector("#form");
const nameInput = document.querySelector("#name-input");
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");
const matchInput = document.querySelector("#match-input");
const formBtn = document.querySelector("#form-btn");
const notificationDiv = document.querySelector("#notification");


let nameValidation = false;
let emailValidation = false;
let passwordValidation = false;
let matchValidation = false;

const validation = (input, regex) => {

    formBtn.disabled = nameValidation && emailValidation && passwordValidation && matchValidation === true ? false : true;

    if (input.value === ""){
        input.classList.remove("outline-red-700", "outline-2", "outline");
        input.classList.remove("outline-green-500", "outline-2", "outline");
        input.classList.add("focus:outline-indigo-700");
    } else if (regex == true){
        input.classList.remove("focus:outline-indigo-700");
        input.classList.remove("outline-red-700", "outline-2", "outline");
        input.classList.add("outline-green-500", "outline-2", "outline");
    } else {
        input.classList.remove("focus:outline-indigo-700");
        input.classList.remove("outline-green-500", "outline-2", "outline");
        input.classList.add("outline-red-700", "outline-2", "outline");
    }
}

nameInput.addEventListener("input", e =>{
    nameValidation = USERNAME_REGEX.test(e.target.value);
    validation(nameInput, nameValidation);
});

emailInput.addEventListener("input", e =>{
    emailValidation = EMAIL_REGEX.test(e.target.value);
    validation(emailInput, emailValidation);
});

passwordInput.addEventListener("input", e =>{
    passwordValidation = PASSWORD_REGEX.test(e.target.value);
    matchValidation = e.target.value === matchInput.value;
    validation(passwordInput, passwordValidation);
    validation(matchInput, matchValidation);
});

matchInput.addEventListener("input", e =>{
    matchValidation = e.target.value === passwordInput.value;
    validation(matchInput, matchValidation);
});

form.addEventListener("submit", async e =>{
    e.preventDefault();
    try {
        const newUser = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
        }
        const {data} = await axios.post("/api/users", newUser);
        createNotification(false, data.data);
        setTimeout(()=>{
            notificationDiv.innerHTML = "";
        }, 5000) 

        nameInput.value = "";
        emailInput.value = "";
        passwordInput.value = "";
        matchInput.value = "";
        validation(nameInput, false);
        validation(emailInput, false);
        validation(passwordInput, false);
        validation(matchInput, false);

    } catch (error) {
        createNotification(true, error.response.data.error);
        setTimeout(()=>{
            notificationDiv.innerHTML = "";
        }, 5000) 
    };
});