const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");
const errorText = document.querySelector("#error-text");
const form = document.querySelector("#form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
    const user = {
        email: emailInput.value,
        password: passwordInput.value,
    }
    await axios.post("/api/login", user)
    window.location.pathname = `/todos/`;
    } catch (error) {
        console.log(error);
        errorText.textContent = error.response.data.error;
    }
});

window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        window.location.href = "/";
    }
});