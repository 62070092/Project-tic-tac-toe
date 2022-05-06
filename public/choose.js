refUsers.on("value", (data) => {
    data = data.val()
    const currentUser = firebase.auth().currentUser
    const user = data[currentUser.uid]
    document.querySelector("#username-name").innerHTML = user.name
    document.querySelector("#score-win span").innerHTML = user.win
    document.querySelector("#score-draw span").innerHTML = user.draw
    document.querySelector("#score-lose span").innerHTML = user.lose

    const team = document.querySelector("#username-team")
    if (team){
        team.innerHTML = user.team
        if (user.team == "ทีมแดง"){
            team.style.color = "red"
        }else{
            team.style.color = "blue"
        }
    }

    const scoreBody = document.querySelector("#score-body")
    scoreBody.innerHTML = ""
    for (const userID in data){
        const userOne = data[userID]
        console.log(userID);
        scoreBody.innerHTML += `
        <div>
            <div class='score-name'>${userOne.name}</div>
            <div>${userOne.win}</div>
            <div>${userOne.draw}</div>
            <div>${userOne.lose}</div>
        </div>
        `
    }
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

document.querySelector("#btn-logout").addEventListener("click", ()=> {
    firebase.auth().signOut()
    window.location.href = "./"
})

function toggleScore(cmd){
    document.querySelector("#score-popup").style.display = cmd == "open" ? "flex" : "none"
}