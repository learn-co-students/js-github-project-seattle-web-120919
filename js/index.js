document.addEventListener("DOMContentLoaded", () => {
   searchForm();
})

function search(user) {
    fetch(`https://api.github.com/search/users?q=${user}`)
    .then(res => res.json())
    .then(users => {
        renderUser(users.items[0]);
    })
}

function searchForm() {
    let githubForm = document.getElementById("github-form")
    githubForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let user = document.getElementById("search").value
        // {login: event.target.name.value}
        search(user);
    })
}

function showUsers(users) {
    users.array.forEach(element => {
        renderUser(element)
    });
}

function renderUser(user) {
    let userList = document.getElementById("user-list")
    let repoList = document.getElementById("repos-list")
    let userCard = document.createElement("li")
    
    let userName = document.createElement("p")
    userName.textContent = user.login

    let image = document.createElement("img")
    image.src = user.avatar_url
    image.width = "200"
    image.height = "200"

    let link = document.createElement("a")
    link.href = user.html_url
    link.innerText = user.html_url

    userName.addEventListener("click", function (){
    if (repoList.hasChildNodes()) {
        while(repoList.hasChildNodes()) {
            repoList.removeChild(repoList.firstChild)
        }
    }
      searchGitForRepos(user.login)
    })

    userCard.appendChild(userName);
    userCard.appendChild(image);
    userCard.appendChild(link);
    userList.appendChild(userCard);
}

function searchGitForRepos(user){
    fetch(`https://api.github.com/users/${user}/repos`)
    .then(response => response.json())
    .then(repos => renderRepos(repos))
  }

  function renderRepos(repos) {
    let repoList = document.getElementById("repos-list")
    repos.forEach(repo => {
        let repoDiv = document.createElement("div")

        let name = document.createElement("p")
        name.textContent = repo.name

        let link = document.createElement("a")
        link.href = repo.html_url
        link.textContent = repo.html_url
        

        repoDiv.appendChild(name)
        repoDiv.appendChild(link)
        repoList.appendChild(repoDiv)
    })
  }