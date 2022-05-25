//Cookies
const cookieArr = document.cookie.split("=");
const userId = cookieArr[1]

//Base Journal Entry Elements
const submitForm = document.getElementById("journal-form");
const entryContainer = document.getElementById("journal-container");
const entryDate = document.getElementById("entry-date");
const entryExerciseType = document.getElementById("exercise-type");
const entryExerciseName = document.getElementById("exercise-name");
const entryWeightAmount = document.getElementById("resist-weight-amt");
const entryDistance = document.getElementById("end-distance");
const entryDuration = document.getElementById("end-duration");
const entrySetCounter = document.getElementById("set-counter-select");
const entrySetValueOne = document.getElementById("rep-counter-1");
const entrySetValueTwo = document.getElementById("rep-counter-2");
const entrySetValueThree = document.getElementById("rep-counter-3");
const entrySetValueFour = document.getElementById("rep-counter-4");
const entrySetValueFive = document.getElementById("rep-counter-5");
const entrySubmitButton = document.getElementById("submit-button");

//Modal Elements
const modalEntryDate = document.getElementById("modal-entry-date");
const modalExerciseType = document.getElementById("modal-exercise-type");
const modalExerciseName = document.getElementById("modal-exercise-name");
const modalWeightAmount = document.getElementById("modal-weight-amt");
const modalEnduranceDistance = document.getElementById("modal-end-distance");
const modalEnduranceDuration = document.getElementById("modal-end-time");
const modalSetsCounter = document.getElementById("modal-set-counter-select");
const modalSetValueOne = document.getElementById("modal-rep-counter-select-1");
const modalSetValueTwo = document.getElementById("modal-rep-counter-select-2");
const modalSetValueThree = document.getElementById("modal-rep-counter-select-3");
const modalSetValueFour = document.getElementById("modal-rep-counter-select-4");
const modalSetValueFive = document.getElementById("modal-rep-counter-select-5");
const updateEntryButton = document.getElementById("update-entry-button");


const headers = {
    'Content-Type': 'application/json'
}

const baseUrl = "http://localhost:8080/api/v1/journal/"

///Functions

function handleLogout(){
    let c = document.cookie.split(";");
    for(let i in c){
        document.cookie = /^[^=]+/.exec(c[i])[0]+"=expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
}

const handleSubmit = async (e) => {
    e.preventDefault()
    let bodyObj = {
        exerciseType:entryExerciseType.value,
        exerciseName:entryExerciseName.value,
        weight:entryWeightAmount.value,
        setCount:entrySetCounter.value,
        setOne:entrySetValueOne.value,
        setTwo:entrySetValueTwo.value,
        setThree:entrySetValueThree.value,
        setFour:entrySetValueFour.value,
        setFive:entrySetValueFive.value,
        distance:entryDistance.value,
        time:entryDuration.value
    }
    await addEntry(bodyObj);
    entryExerciseType.value = ""
    entryExerciseName.value = ""
    entryWeightAmount.value = ""
    entrySetCounter.value = ""
    entrySetValueOne.value = ""
    entrySetValueTwo.value = ""
    entrySetValueThree.value = ""
    entrySetValueFour.value = ""
    entrySetValueFive.value = ""
    entryDistance.value = ""
    entryDuration.value = ""
}

async function addEntry(obj) {
    const response = await fetch(`${baseUrl}user/${userId}`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: headers
    })
        .catch(err => console.error(err.message))
    if(response.status == 200) {
        return getEntries(userId)
    }
}

async function getEntries(userId) {
    await fetch(`http://localhost:8080/api/v1/journal/user/${userId}`, {
        method: "GET",
        headers: headers
    })
        .then(response => response.json())
        // .then(data => console.log(data))
        .then(data => createEntryCards(data))
        .catch(err => console.error(err))
}

async function getEntryById(entryId){
    await fetch(baseUrl + entryId, {
        method: "GET",
        headers: headers
    })
        .then(res => res.json())
        .then(data => populateModal(data))
        .catch(err => console.error(err.message))
}

async function handleEntryEdit(entryId) {
    let bodyObj = {
        id: entryId,
        exerciseType:modalExerciseType.value,
        exerciseName:modalExerciseName.value,
        weight:modalWeightAmount.value,
        setCount:modalSetsCounter.value,
        setOne:modalSetValueOne.value,
        setTwo:modalSetValueTwo.value,
        setThree:modalSetValueThree.value,
        setFour:modalSetValueFour.value,
        setFive:modalSetValueFive.value,
        distance:modalEnduranceDistance.value,
        time:modalEnduranceDuration.value
    }

    await fetch(baseUrl, {
        method: "PUT",
        body: JSON.stringify(bodyObj),
        headers: headers
    })
        .catch(err => console.error(err))

    return getEntries(userId)
}

async function handleDelete(entryId) {
    await fetch(baseUrl + entryId, {
        method: "DELETE",
        headers: headers
    })
        .catch(err => console.error(err))

    return getEntries(userId);
}

const createEntryCards = (array) => {
    // entryContainer.innerHTML = ''
    array.forEach(obj => {
        let entryCard = document.createElement("div")
        entryCard.classList.add("m-2")
        entryCard.innerHTML = `
        <div class="card d-flex" style="width: 18rem; height: 18rem;">
            <div class="card-body d-flex flex-column justify-content-between" style="height: max-content">
                <p class="card-text">${obj.exerciseType}</p>
                <p class="card-text">${obj.exerciseName}</p>
                <p class="card-text">${obj.weight}</p>
                <p class="card-text">${obj.setCount}</p>
                <p class="card-text">${obj.setOne}</p>
                <p class="card-text">${obj.setTwo}</p>
                <p class="card-text">${obj.setThree}</p>
                <p class="card-text">${obj.setFour}</p>
                <p class="card-text">${obj.setFive}</p>
                <p class="card-text">${obj.distance}</p>
                <p class="card-text">${obj.time}</p>
            </div>
            <div class="d-flex justify-content-between">
                <button class="btn btn-danger" onclick="handleDelete(${obj.id})">Delete</button>
                <button onclick="getEntryById(${obj.id})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#entry-edit-modal">
                Edit
                </button>
            </div>
        </div>
        `
        entryContainer.append(entryCard);
    })
}

const populateModal = (obj) =>{
    modalExerciseType.innerText = ""
    modalExerciseType.innerText = obj.exerciseType
    modalExerciseName.innerText = ""
    modalExerciseName.innerText = obj.exerciseName
    modalWeightAmount.innerText = ""
    modalWeightAmount.innerText = obj.weight
    modalSetsCounter.innerText = ""
    modalSetsCounter.innerText = obj.setCount
    modalSetValueOne.innerText = ""
    modalSetValueOne.innerText = obj.setOne
    modalSetValueTwo.innerText = ""
    modalSetValueTwo.innerText = obj.setTwo
    modalSetValueThree.innerText = ""
    modalSetValueThree.innerText = obj.setThree
    modalSetValueFour.innerText = ""
    modalSetValueFour.innerText = obj.setFour
    modalSetValueFive.innerText = ""
    modalSetValueFive.innerText = obj.setFive
    modalEnduranceDistance.innerText = ""
    modalEnduranceDistance.innerText = obj.distance
    modalEnduranceDuration.innerText = ""
    modalEnduranceDuration.innerText = obj.time
    updateEntryButton.setAttribute("data-entry-id", obj.id)
}

getEntries(userId);

submitForm.addEventListener("submit", handleSubmit)

//Form Data Testing
submitForm.addEventListener("submit", dataTest)
function dataTest() {
    console.log(entryExerciseType.value)
    console.log(entryExerciseName.value)
    console.log(entryWeightAmount.value)
    console.log(entrySetCounter.value)
    console.log(entrySetValueOne.value)
}

updateEntryButton.addEventListener("click", (e) =>{
    let entryId = e.target.getAttribute("data-entry-id")
    handleEntryEdit(entryId)
})