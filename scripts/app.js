const userApiUrl = "https://randomuser.me/api/?results=10";
let userLoaded = false;

const cardTemplate = informations => {
  return `
        <header>
            <img src="${informations.userPicture}" />
        </header>
        <div class="content">
            <h4><span>${informations.userName}</span></h4>
            <h5><span>@${informations.userUsername}</span></h5>
            <div><span>${informations.userEmail}</span></div>
            <footer>
              <div><small>${informations.userCountry}</small></div>
              <div><a href="#" class="button-danger" id="disconnect">disconnect x</a></div>
            </footer>
        </div>
    `;
};

const assignWindowUser = user => {

  const userEmail = user.email;
  const userName = `${user.name.first} ${user.name.last}`;
  const userCountry = user.location.country;
  const userUsername = user.login.username;
  const userPictures = user.picture.large;
  const userLoaded = true;


  const userAvatar = document.getElementById("user-avatar");
  userAvatar.src = userPictures.thumbnail;
  

  docCookies.setItem('current-user', `[{
    "userEmail": "${userEmail}",
    "userCountry": "${userCountry}",
    "userName": "${userName}",
    "userUsername": "${userUsername}",
    "userPicture": "${userPictures}"
  }]`)

  document.getElementById("user-card").innerHTML = cardTemplate({
    userEmail,
    userCountry,
    userName,
    userUsername,
    userPictures
  });
};

const assignWindowUserFromCookie = () => {
  const user = JSON.parse(docCookies.getItem("current-user"))[0];
  console.log(user)
  const userEmail = user.email;
  const userName = user.userName;
  const userCountry = user.userCountry;
  const userUsername = user.userUsername;
  const userPicture = user.userPicture;



  const userAvatar = document.getElementById("user-avatar");
  userAvatar.src = userPicture;
  document.getElementById("user-card").innerHTML = cardTemplate({
    userEmail,
    userCountry,
    userName,
    userUsername,
    userPicture
  });
}

const currentUser = data => {
  if (docCookies.hasItem('current-user')) {
    assignWindowUserFromCookie(data);
  } else {
    assignWindowUser(data);
  }
  
  console.log(data, window);
};

const disconectUser = () => {
    docCookies.hasItem("current-user") && docCookies.removeItem("current-user");

    window.location.href = window.location.href;
}

const init = () => {
  fetch(userApiUrl)
    .then(resp => resp.json())
    .then(function(data) {
      currentUser(data.results[0]);
    })
    .catch(function(error) {
      console.log(error);
    });


  document.querySelector('#user-avatar').addEventListener('click', () => {
    document.querySelector('#user-card').classList.toggle('display')
  })
 
  document.querySelector("#disconnect").addEventListener("click", disconnectUser);

};

window.addEventListener("load", init);