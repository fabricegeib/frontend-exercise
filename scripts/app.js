const userApiUrl = "https://randomuser.me/api/?results=10"

function currentUser(data) {
    const userAvatar = document.getElementById("user-avatar")
    const avatarUrl = data.picture.thumbnail
    
    userAvatar.src = avatarUrl

    console.log(data)
}

function init() {
    fetch(userApiUrl) // Call the fetch function passing the url of the API as a parameter

    .then((resp) => resp.json()) // Transform the data into json

    .then(function(response) {
        // Your code for handling the data you get from the API
        // console.log(response)
        currentUser(response.results[0])
    })
    .catch(function(error) {
        // This is where you run code if the server returns any errors
        console.log(error)
    });
}

window.addEventListener("load", init)
