const cookieArr = document.cookie.split("=");
const userId = cookieArr[1]

const submitForm = document.getElementById("journal-form");
const entryContainer = document.getElementById("journal-form-container");