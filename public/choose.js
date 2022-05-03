refUsers.on("value", (data) => {
    data = data.val()
    const currentUser = firebase.auth().currentUser

    document.querySelector("#username-name").innerHTML = data[currentUser.uid].name
})

function chooseTeam(team){
    const currentUser = firebase.auth().currentUser
    refUsers.child(currentUser.uid).update({
        team: team
    })
    setTimeout(() => {
        window.location.href = "your_team.html"
    }, 1000)
}