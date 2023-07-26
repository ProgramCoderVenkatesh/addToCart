// Challenge: Import 'initializeApp' from 
"https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
// Challenge: Import 'getDatabase' from 
"https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


// Database stores data as object
// NOTE: Deleting last item from database is not possible, because
// Deleting last item will also delete shoppingList refernce


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// -----------------------------------------------------

// Your firewall database project URL

const appSettings = {
    databaseURL: "https://realtime-database-b5892-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

// get the URL

const application = initializeApp(appSettings)

// Create database

const database = getDatabase(application)

// Give reference (ref) to database

const shoppingListInDB = ref(database, "shoppingList")


const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")


//  onValue runs everytime when its edited.

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value

    // To push item in database from textbox in doc
    push(shoppingListInDB, inputValue)

    // To clear the inputfield
    clearInputFieldEl()

    // To append in UL element
    // appendItemToShoppingListEl(inputValue)  // commenting to get rid of errors.

    console.log(inputValue)
})


onValue(shoppingListInDB, function(snapshot) {
    console.log(snapshot.val()) // all items with key also

    // Challenge: Change the onValue code so that it uses snapshot.exists() to show items when 
    // there are items in the database and if there are not displays the text 'No items here... yet'.
    // while using snapshot.exists() always think for if-else statement

    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())

        console.log(itemsArray)
        
        // To not get duplicate values
        clearShoppingListEl()
    
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            // Challenge: Make two let variables:
            // currentItemID and currentItemValue and use currentItem to set both of
            // them equal to the correct values.
            let currentItemID = currentItem[0]  // to store all IDs of database
            let currentItemValue = currentItem[1] // to store all values of database
    
    
            console.log(itemsArray[i])
    
            // To append in UL element
            appendItemToShoppingListEl(currentItem)
        }
    } else {
        shoppingListEl.innerHTML = "No items here... yet"
    }

    // BY USING BELOW CODE WILL NOT SOLVE PROBLEM WHICH IS MENTIONED AT LINE:8

    // let itemsArray = Object.entries(snapshot.val())

    // console.log(itemsArray)
    
    // // To not get duplicate values
    // clearShoppingListEl()

    // for (let i = 0; i < itemsArray.length; i++) {
    //     let currentItem = itemsArray[i]
    //     // Challenge: Make two let variables:
    //     // currentItemID and currentItemValue and use currentItem to set both of
    //     // them equal to the correct values.
    //     let currentItemID = currentItem[0]  // to store all IDs of database
    //     let currentItemValue = currentItem[1] // to store all values of database


    //     console.log(itemsArray[i])

    //     // To append in UL element
    //     appendItemToShoppingListEl(currentItem)
    // }
})

    // To clear the inputfield
function clearInputFieldEl() {
    inputFieldEl.value = ""
}

    // To append in UL element
function appendItemToShoppingListEl(item) {
    // shoppingListEl.innerHTML += `<li>${itemValue}</li>`

    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("dblclick", function() {
        console.log(itemID) // To get ID from database

        // ref always requires to specify database
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
    
        remove(exactLocationOfItemInDB) // To remove from Database
    
        console.log(exactLocationOfItemInDB)
    })

    shoppingListEl.append(newEl)
    console.log(typeof shoppingListEl) // Ans: Object
}

    // To not get duplicate values
function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}





// Reel Time

// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
// import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// const appSettings = {
//     databaseURL: "https://playground-f682c-default-rtdb.asia-southeast1.firebasedatabase.app/"
// }

// const app = initializeApp(appSettings)
// const database = getDatabase(app)
// const moviesInDB = ref(database, "movies")

// // console.log(app)


// const inputFieldEl = document.getElementById("input-field")
// const addButtonEl = document.getElementById("add-button")

// addButtonEl.addEventListener("click", function() {
//     let inputValue = inputFieldEl.value

//     push(moviesInDB, inputValue)

//     console.log(`${inputValue} added to database`)
// })

// -------------------------------------------------------------------------------

// To fetch Object in array by Object.values

// let scrimbaUsers = {
//     "00": "sindre@scrimba.com",
//     "01": "per@scrimba.com",
//     "02": "frode@scrimba.com"
// }

// // Gives as array without key
// console.log(Object.values(scrimbaUsers))

// // Gives a keys in array
// console.log(Object.keys(scrimbaUsers))

// // Gives a array with both keys and values
// console.log(Object.entries(scrimbaUsers))