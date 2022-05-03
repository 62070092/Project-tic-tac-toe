refUsers.on("value", (data) => {
    data = data.val()
    const currentUser = firebase.auth().currentUser

    document.querySelector("#username-name").innerHTML = data[currentUser.uid].name
    document.querySelector("#username-team").innerHTML = data[currentUser.uid].team
})

document.querySelector("#btn-go").addEventListener("click", () => {
    window.location.href = "game.html"
})