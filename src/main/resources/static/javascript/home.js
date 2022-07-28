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
const entrySetValueOne = document.getElementById("set-1");
const entrySetValueTwo = document.getElementById("set-2");
const entrySetValueThree = document.getElementById("set-3");
const entrySetValueFour = document.getElementById("set-4");
const entrySetValueFive = document.getElementById("set-5");
const entrySubmitButton = document.getElementById("submit-button");
const journalEntryCollection = document.getElementById("journal-collection")

//Modal Elements
const modalEntryDate = document.getElementById("modal-entry-date");
const modalExerciseType = document.getElementById("modal-exercise-type");
const modalExerciseName = document.getElementById("modal-exercise-name");
const modalWeightAmount = document.getElementById("modal-weight-amt");
const modalEnduranceDistance = document.getElementById("modal-end-distance");
const modalEnduranceDuration = document.getElementById("modal-end-time");
const modalSetsCounter = document.getElementById("modal-set-counter-select");
const modalSetValueOne = document.getElementById("modal-set-1");
const modalSetValueTwo = document.getElementById("modal-set-2");
const modalSetValueThree = document.getElementById("modal-set-3");
const modalSetValueFour = document.getElementById("modal-set-4");
const modalSetValueFive = document.getElementById("modal-set-5");
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
        journalEntryCollection.innerHTML = ''
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
    journalEntryCollection.innerHTML = ''
    return getEntries(userId)
}

async function handleDelete(entryId) {
    await fetch(baseUrl + entryId, {
        method: "DELETE",
        headers: headers
    })
        .catch(err => console.error(err))
    journalEntryCollection.innerHTML = ''
    return getEntries(userId)
}

const createEntryCards = (array) => {
    // entryContainer.innerHTML = ''
    array.forEach(obj => {
        let entryCard = document.createElement("div")
        entryCard.classList.add("card")
        entryCard.innerHTML = `
    <div class="card-body">
        <h1 class="card-header">Workout Entry</h1>
        <div class="card-ex-type" style="display: inline-block; margin-right: 50px">
            <p class="card-section-header">Exercise Type</p>
            <p class="card-text">${obj.exerciseType}</p>
        </div>
        <div class="card-ex-name" style="display: inline-block">
            <p class="card-section-header">Exercise Name</p>
            <p class="card-text">${obj.exerciseName}</p>
        </div>
     </div>
        `
        if (obj.exerciseType === "Resistance") {
            entryCard.innerHTML += `
            <div class="card-resistance-data" >
                <p class="card-section-header">Weight</p>
                <p class="card-text">${obj.weight} lbs</p>
            </div>
            `
            if (obj.setCount === 5) {
                entryCard.innerHTML += `
                <div class="card-set-data">
                    <p class="card-section-header">Number of Sets</p>
                    <p class="card-text">${obj.setCount}</p>
                <div class="card-set-one-data" style="display: inline-block">
                    <p class="card-section-header">Set I</p>
                    <p class="card-text" style="text-align: center">${obj.setOne} Reps</p>
                </div>
                <div class="card-set-two-data" style="display: inline-block; padding: 5px;">
                    <p class="card-section-header">Set II</p>
                    <p class="card-text" style="text-align: center">${obj.setTwo} Reps</p>
                </div>
                <div class="card-set-three-data" style="display: inline-block; padding: 5px;">
                    <p class="card-section-header">Set III</p>
                    <p class="card-text" style="text-align: center">${obj.setThree} Reps</p>
                </div>
                <div class="card-set-four-data" style="display: inline-block; padding: 5px;">
                    <p class="card-section-header">Set IV</p>
                    <p class="card-text" style="text-align: center">${obj.setFour} Reps</p>
                </div>
                <div class="card-set-five-data" style="display: inline-block; padding: 5px;">
                    <p class="card-section-header">Set V</p>
                    <p class="card-text" style="text-align: center">${obj.setFive} Reps</p>
                </div>
                </div>
                `
            } else if (obj.setCount === 4) {
                entryCard.innerHTML += `
                <div class="card-set-data">
                    <p class="card-section-header">Number of Sets</p>
                    <p class="card-text">${obj.setCount}</p>
                <div class="card-set-one-data" style="display: inline-block">
                    <p class="card-section-header">Set I</p>
                    <p class="card-text" style="text-align: center">${obj.setOne} Reps</p>
                </div>
                <div class="card-set-two-data" style="display: inline-block; padding: 5px;">
                    <p class="card-section-header">Set II</p>
                    <p class="card-text" style="text-align: center">${obj.setTwo} Reps</p>
                </div>
                <div class="card-set-three-data" style="display: inline-block; padding: 5px;">
                    <p class="card-section-header">Set III</p>
                    <p class="card-text" style="text-align: center">${obj.setThree} Reps</p>
                </div>
                <div class="card-set-four-data" style="display: inline-block; padding: 5px;">
                    <p class="card-section-header">Set IV</p>
                    <p class="card-text" style="text-align: center">${obj.setFour} Reps</p>
                </div>
                </div>
                `
            } else if (obj.setCount === 3) {
                entryCard.innerHTML += `
                <div class="card-set-data">
                    <p class="card-section-header">Number of Sets</p>
                    <p class="card-text">${obj.setCount}</p>
                <div class="card-set-one-data" style="display: inline-block">
                    <p class="card-section-header">Set I</p>
                    <p class="card-text" style="text-align: center">${obj.setOne} Reps</p>
                </div>
                <div class="card-set-two-data" style="display: inline-block; padding: 5px;">
                    <p class="card-section-header">Set II</p>
                    <p class="card-text" style="text-align: center">${obj.setTwo} Reps</p>
                </div>
                <div class="card-set-three-data" style="display: inline-block; padding: 5px;">
                    <p class="card-section-header">Set III</p>
                    <p class="card-text" style="text-align: center">${obj.setThree} Reps</p>
                </div>
                </div>
                `
            } else if (obj.setCount === 2) {
                entryCard.innerHTML += `
                <div class="card-set-data">
                    <p class="card-section-header">Number of Sets</p>
                    <p class="card-text">${obj.setCount}</p>
                <div class="card-set-one-data" style="display: inline-block">
                    <p class="card-section-header">Set I</p>
                    <p class="card-text" style="text-align: center">${obj.setOne} Reps</p>
                </div>
                <div class="card-set-two-data" style="display: inline-block; padding: 5px;">
                    <p class="card-section-header">Set II</p>
                    <p class="card-text" style="text-align: center">${obj.setTwo} Reps</p>
                </div>
                </div>
                `
            } else if (obj.setCount === 1) {
                entryCard.innerHTML += `
                <div class="card-set-data">
                    <p class="card-section-header">Number of Sets</p>
                    <p class="card-text">${obj.setCount}</p>
                <div class="card-set-one-data" style="display: inline-block">
                    <p class="card-section-header">Set I</p>
                    <p class="card-text" style="text-align: center">${obj.setOne} Reps</p>
                </div>
                </div>
                `
            } else {

            }
        } else if (obj.exerciseType === "Endurance") {
            entryCard.innerHTML += `
            <div class="endurance data">
                <div class="card-end-dist" style="display: inline-block; padding: 5px;">
                    <p class="card-section-header">Distance</p>
                    <p class="card-text" style="text-align: center">${obj.distance} Miles</p>
                </div>
                <div class="card-end-dur" style="display: inline-block; padding: 5px;">
                    <p class="card-section-header">Duration</p>
                    <p class="card-text" style="text-align: center">${obj.time} Minutes</p>
                </div>
            </div>
            `
        }

        entryCard.innerHTML += `
            <div class="card-footer">
            <button class="btn btn-danger" onclick="handleDelete(${obj.id});">Delete</button>
            </div>
        `
        journalEntryCollection.append(entryCard);
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

///Responsive formatting for UI
const weightDiv = document.getElementById("weight-amt")
const endDistanceDiv = document.getElementById("end-distance-div")
const endTimeDiv = document.getElementById("end-time-div")
const setCounterDiv = document.getElementById("weight-set-amount")
const setOne = document.getElementById("rep-counter-1")
const setTwo = document.getElementById("rep-counter-2")
const setThree = document.getElementById("rep-counter-3")
const setFour = document.getElementById("rep-counter-4")
const setFive = document.getElementById("rep-counter-5")

function resistEndurance() {
    if (entryExerciseType.value === "Resistance") {
        weightDiv.style.display = ''
        endDistanceDiv.style.display = 'none'
        endTimeDiv.style.display = 'none'
        setCounterDiv.style.display = ''
    } else if (entryExerciseType.value === "Endurance") {
        weightDiv.style.display = 'none'
        endDistanceDiv.style.display = ''
        endTimeDiv.style.display = ''
        setCounterDiv.style.display = "none"
    } else {
        weightDiv.style.display = "none"
        endDistanceDiv.style.display = 'none'
        endTimeDiv.style.display = 'none'
        setCounterDiv.style.display = "none"
    }
}
entryExerciseType.addEventListener('change',resistEndurance)

function setsCount() {
    if (entrySetCounter.value === '5') {
        setOne.style.display = ''
        setTwo.style.display = ''
        setThree.style.display = ''
        setFour.style.display = ''
        setFive.style.display = ''
    } else if (entrySetCounter.value === '4') {
        setOne.style.display = ''
        setTwo.style.display = ''
        setThree.style.display = ''
        setFour.style.display = ''
        setFive.style.display = 'none'
    } else if (entrySetCounter.value === '3') {
        setOne.style.display = ''
        setTwo.style.display = ''
        setThree.style.display = ''
        setFour.style.display = 'none'
        setFive.style.display = 'none'
    } else if (entrySetCounter.value === '2') {
        setOne.style.display = ''
        setTwo.style.display = ''
        setThree.style.display = 'none'
        setFour.style.display = 'none'
        setFive.style.display = 'none'
    } else if (entrySetCounter.value === '1') {
        setOne.style.display = ''
        setTwo.style.display = 'none'
        setThree.style.display = 'none'
        setFour.style.display = 'none'
        setFive.style.display = 'none'
    }  else {
        setOne.style.display = 'none'
        setTwo.style.display = 'none'
        setThree.style.display = 'none'
        setFour.style.display = 'none'
        setFive.style.display = 'none'
    }
}
entrySetCounter.addEventListener("change", setsCount)

//Modal Responsive Formatting
const modalWeightDiv = document.getElementById("modal-weight-amt-div")
const modalEndDistanceDiv = document.getElementById("modal-end-distance-div")
const modalEndTimeDiv = document.getElementById("modal-end-time-div")
const modalSetCounterDiv = document.getElementById("modal-weight-set-amount-div")
const modalSetOne = document.getElementById("modal-rep-counter-1")
const modalSetTwo = document.getElementById("modal-rep-counter-2")
const modalSetThree = document.getElementById("modal-rep-counter-3")
const modalSetFour = document.getElementById("modal-rep-counter-4")
const modalSetFive = document.getElementById("modal-rep-counter-5")

function modalResistEndurance() {
    if (modalExerciseType.value === "Resistance") {
        modalWeightDiv.style.display = ''
        modalEndDistanceDiv.style.display = 'none'
        modalEndTimeDiv.style.display = 'none'
        modalSetCounterDiv.style.display = ''
    } else if (modalExerciseType.value === "Endurance") {
        modalWeightDiv.style.display = 'none'
        modalEndDistanceDiv.style.display = ''
        modalEndTimeDiv.style.display = ''
        setCounterDiv.style.display = "none"
    } else {
        modalWeightDiv.style.display = "none"
        modalEndDistanceDiv.style.display = 'none'
        modalEndTimeDiv.style.display = 'none'
        modalSetCounterDiv.style.display = "none"
    }
}
modalExerciseType.addEventListener('change',modalResistEndurance)

function modalSetsCount() {
    if (modalSetsCounter.value === '5') {
        modalSetOne.style.display = ''
        modalSetTwo.style.display = ''
        modalSetThree.style.display = ''
        modalSetFour.style.display = ''
        modalSetFive.style.display = ''
    } else if (modalSetsCounter.value === '4') {
        modalSetOne.style.display = ''
        modalSetTwo.style.display = ''
        modalSetThree.style.display = ''
        modalSetFour.style.display = ''
        modalSetFive.style.display = 'none'
    } else if (modalSetsCounter.value === '3') {
        modalSetOne.style.display = ''
        modalSetTwo.style.display = ''
        modalSetThree.style.display = ''
        modalSetFour.style.display = 'none'
        modalSetFive.style.display = 'none'
    } else if (modalSetsCounter.value === '2') {
        modalSetOne.style.display = ''
        modalSetTwo.style.display = ''
        modalSetThree.style.display = 'none'
        modalSetFour.style.display = 'none'
        modalSetFive.style.display = 'none'
    } else if (modalSetsCounter.value === '1') {
        modalSetOne.style.display = ''
        modalSetTwo.style.display = 'none'
        modalSetThree.style.display = 'none'
        modalSetFour.style.display = 'none'
        modalSetFive.style.display = 'none'
    } else {
        modalSetOne.style.display = 'none'
        modalSetTwo.style.display = 'none'
        modalSetThree.style.display = 'none'
        modalSetFour.style.display = 'none'
        modalSetFive.style.display = 'none'
    }
}
modalSetsCounter.addEventListener("change", modalSetsCount)

///Edit Note related functions
const modal = document.getElementById("entry-edit-modal")
const mainEntry = document.getElementById("home-container")
const closeModalButton = document.getElementById("button-close")

function showModal() {
    modal.style.display = ''
    mainEntry.style.display = 'none'
}

function hideModal() {
    modal.style.display = `none`
    mainEntry.style.display = ''
}
closeModalButton.addEventListener("click", hideModal)