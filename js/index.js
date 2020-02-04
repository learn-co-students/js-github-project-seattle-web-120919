document.addEventListener("DOMContentLoaded", ()=>{


   getSearch();
   console.log(search);

})



function getSearch() {
    const search_form = document.getElementById("github-form");
    let input;

    search_form.addEventListener("submit", function(event) {
        event.preventDefault();
        postUserName(event.target.elements[0].value);
    })



}


function postUserName(username) {
    fetch(`https://api.github.com/search/users?q=${username}`)
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    displayUsers(myJson.items)

  });


}


function displayUsers(users) {
    const user_list = document.getElementById("user-list");
    users.forEach(user => {
        const li = document.createElement("li");
        li.innerText = user.login;
        li.addEventListener("click", () => showRepos(user));
        const avatar = document.createElement("img");
        avatar.src = user.avatar_url;
        li.appendChild(avatar);

        user_list.appendChild(li);
    });

}

function showRepos(user) {
    fetch(`https://api.github.com/users/${user.login}/repos`)
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      console.log(myJson);
      displayRepos(myJson);
  
    });

}

function displayRepos(repos) {
    const repo_list = document.getElementById("repos-list");
    repo_list.innerHTML = "";
    repos.forEach(repo => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        
        link.href = repo.html_url;
        link.innerText = repo.name;
        console.log(link);

        li.appendChild(link);
        repo_list.appendChild(li);
    });


}