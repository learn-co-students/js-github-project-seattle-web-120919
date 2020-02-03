// Note: the repos link is not complete

document.addEventListener("DOMContentLoaded", function () {
    const userList = document.getElementById('user-list')
    const form = document.getElementById("github-form")
    const reposList = document.getElementById("repos-list")

    form.addEventListener("submit", function (event) {
        event.preventDefault()
        const search = event.target.search.value
        fetch(`https://api.github.com/search/users?q=${search}`, {
            method: "GET",
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/vnd.github.v3+json'
            }
        })
            .then(function (res) {
                return res.json()
            })
            .then(function (users) {
                showResult(users)
            })
    })

    function showResult(users) {
        users.items.map(user => {
            console.log(user)
            const div = document.createElement("div")

            const avatar = document.createElement("img")
            avatar.src = user.avatar_url

            const profileLink = document.createElement("a")
            profileLink.href = user.html_url
            profileLink.textContent = user.login
            profileLink.addEventListener("click", function () {
                showRepos(user)
            })

            div.appendChild(avatar)
            div.appendChild(profileLink)
            userList.appendChild(div)
        })
    }

    function showRepos(user) {
        fetch(`https://api.github.com/users/${user.login}/repos`)
            .then(function (res) {
                return res.json()
            })
            .then(function (repos) {
                reposList.innerText = ""
                repos.forEach((repo) => {
                    const repoLink = document.createElement("a")
                    repoLink.textContent = repo.full_name
                    repoLink.href = repo.html_url
                    reposList.appendChild(repoLink)
                })
            })
    }
})