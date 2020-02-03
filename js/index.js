function searchButton(){
  let form = document.getElementById("github-form")
  form.addEventListener("submit", function(event){
    event.preventDefault()
    searchGitForUser(event.target.search.value)
  })
}

function searchGitForUser(user){
  fetch(`https://api.github.com/search/users?q=${user}`)
  .then(response => response.json())
  .then(json => displayUser(json.items[0]))
}

function searchGitForRepos(user){
  fetch(`https://api.github.com/users/${user}/repos`)
  .then(response => response.json())
  .then(json => displayRepos(json))
}

function displayRepos(repos){
    let repoList = document.getElementById("repos-list")
  repos.map(repo => {
    let div = document.createElement("div")
    div.className = "card"
    let name = document.createElement("h4")
    name.innerText = repo.name
    let link = document.createElement("a")
    link.href = repo.html_url
    link.innerText = repo.html_url 

    div.appendChild(name)
    div.appendChild(link)
    repoList.appendChild(div)
  })
}

function displayUser(user){
    let repoList = document.getElementById("repos-list")

    let div = document.createElement("div")
    div.className = "card"
    let img = document.createElement("img")
    img.src = user.avatar_url
    img.width = "200"
    img.height = "200"
    let username = document.createElement("h3")
    username.innerText = user.login
    username.addEventListener("click", function (){
    if (repoList.hasChildNodes()) {
        while(repoList.hasChildNodes()) {
            repoList.removeChild(repoList.firstChild)
        }
    }
      searchGitForRepos(user.login)
    })
    let link = document.createElement("a")
    link.href = user.html_url
    link.innerText = user.html_url

    div.appendChild(img)
    div.appendChild(username)
    div.appendChild(link)

    document.getElementById("user-list").appendChild(div)
}

document.addEventListener("DOMContentLoaded", function(){
    searchButton()
  })