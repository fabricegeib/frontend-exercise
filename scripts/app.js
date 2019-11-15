const userApiUrl = "https://randomuser.me/api/?results=10"
let userLoaded = false;

function cardTemplate(informations) {
    return `
    <header>
        <img src="${informations.userPictures.large}" />
    </header>
    <div class="content">
        <h4><span>${informations.userName}</span></h4>
        <h5><span>@${informations.userUsername}</span></h5>
        <div><span>${informations.userEmail}</span></div>
        <footer>
        <small>${informations.userCountry}</small>
        </footer>
    </div>
    `
}



function assignWindowUser(user) {
    const userEmail = user.email;
    const userName = `${user.name.first} ${user.name.last}`;
    const userCountry = user.location.country;
    const userUsername = user.login.username;
    const userPictures = user.picture;
    userLoaded = true;

    document.getElementById("user-card").innerHTML=cardTemplate({
        userEmail,
        userName,
        userCountry,
        userUsername,
        userPictures
    })
}

function currentUser(data) {
    const userAvatar = document.getElementById("user-avatar")
    const avatarUrl = data.picture.thumbnail
    
    userAvatar.src = avatarUrl

    console.log(data)

    assignWindowUser(data)

    console.log(window)
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

    document.querySelector("#user-avatar").addEventListener("click", function(){
        document.querySelector("#user-card").classList.toggle("display")
    })
}

window.addEventListener("load", init)
