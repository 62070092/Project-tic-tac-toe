refUsers.on("value", (data) => {
    data = data.val()
    const currentUser = firebase.auth().currentUser

    document.querySelector("#username-name").innerHTML = data[currentUser.uid].name
    document.querySelector("#score-win span").innerHTML = data[currentUser.uid].win
    document.querySelector("#score-draw span").innerHTML = data[currentUser.uid].draw
    document.querySelector("#score-lose span").innerHTML = data[currentUser.uid].lose
})

document.querySelector("#btn-go").addEventListener("click", () => {
    window.location.href = "game.html"
})