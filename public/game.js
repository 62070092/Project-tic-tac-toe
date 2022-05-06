const elements = ["dirt", "water", "wind", "fire"];
const btnCards = document.querySelectorAll(".btn-card");
const btnXOs = document.querySelectorAll(".table-block");
let WhoWin = "";

// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       var uid = user.uid;
//       setUpGame(uid);
//       // ...
//     } else {
//       // User is signed out
//       // ...
//     }
//   });
refUsers.on("value", (data) => {
    data = data.val()
    console.log(data);
    const currentUser = firebase.auth().currentUser
    setUpGame(data[currentUser.uid])
})

function setUpGame(data){
    const imgePlayer = document.querySelectorAll('.imagePlayer');
    const imgeBot = document.querySelectorAll('.imageBot');
    const BotName = document.querySelectorAll('.botTeam');
    const playername = document.querySelectorAll('.username-name');
    const scoreWin = document.querySelector("#score-win span")
    const scoreDraw = document.querySelector("#score-draw span")
    const scoreLose = document.querySelector("#score-lose span")
    
    console.log(BotName)
    playername[0].innerHTML = data.name;
    playername[1].innerHTML = data.name;
    scoreWin.innerHTML = data.win
    scoreDraw.innerHTML = data.draw
    scoreLose.innerHTML = data.lose

    if (data.team == "ทีมแดง"){
        imgeBot[0].src = "./img/Will.png"
        imgeBot[1].src = "./img/Will.png"
        imgeBot[0].style.transform = "scaleX(-1)"
        imgeBot[1].style.transform = "scaleX(-1)"
        imgePlayer[0].src = "./img/Julia.png"
        imgePlayer[0].style.transform = "scaleX(-1)"
        imgePlayer[1].src = "./img/Julia.png"
        imgePlayer[1].style.transform = "scaleX(-1)"
        BotName[0].innerHTML = 'ทีมน้ำเงิน'
        BotName[1].innerHTML = 'ทีมน้ำเงิน'
    }
    else {
        imgeBot[0].src = "./img/Julia.png"
        imgeBot[0].style.transform = "scaleX(1)"
        imgePlayer[0].src = "./img/Will.png"
        imgePlayer[0].style.transform = "scaleX(1)"
        BotName[0].innerHTML = 'ทีมแดง'

        imgeBot[1].src = "./img/Julia.png"
        imgeBot[1].style.transform = "scaleX(1)"
        imgePlayer[1].src = "./img/Will.png"
        imgePlayer[1].style.transform = "scaleX(1)"
        BotName[1].innerHTML = 'ทีมแดง'
    }
}

function chooseCard(element){
    const uid = firebase.auth().currentUser.uid;
    const rdm = Math.floor(Math.random() * (elements.length - 1));
    const botElement = elements[rdm];
    
    console.log(botElement);

    const win1 = element == "dirt" && botElement == "wind";
    const win2 = element == "wind" && botElement == "water";
    const win3 = element == "water" && botElement == "fire";
    const win4 = element == "fire" && botElement == "dirt";

    document.querySelector('.battle').style.display = 'flex'

    const text = document.querySelector('.text-result');
    const cards = document.querySelectorAll('.card-battle img');

    if(element == "dirt"){
        cards[1].src = `./img/card-3.png`
    }
    else if(element == "wind"){
        cards[1].src = `./img/card-1.png`
    }
    else if(element == "water"){
        cards[1].src = `./img/card-2.png`
    }
    else{
        cards[1].src = `./img/card-4.png`
    }
    

    if(botElement == "dirt"){
        cards[0].src = `./img/card-3.png`
    }
    else if(botElement == "wind"){
        cards[0].src = `./img/card-1.png`
    }
    else if(botElement == "water"){
        cards[0].src = `./img/card-2.png`
    }
    else{
        cards[0].src = `./img/card-4.png`
    }

    if (win1 || win2 || win3 || win4){
        // alert("Win!")
        text.innerHTML = 'ชนะ'
        checkWinRound("player")
    }
    else if (element == botElement){
        text.innerHTML = 'เสมอ'
        // alert("Play Again")
    }
    else{
        text.innerHTML = 'แพ้'
        checkWinRound("Bot")
        // alert("Lose")
    }
}

btnXOs.forEach((el) => {
    el.addEventListener("click", inputXO)
})

function checkWinRound(who){
    if (who == "player"){
        WhoWin = "player";
        btnCards.forEach((el) => {
            el.disabled = true
        })
    
        btnXOs.forEach((el) => {
            el.disabled = false
        })
    }
    else {
        WhoWin = "Bot";
        BotInput();
    }
};

function inputXO(){
    if(WhoWin == "Bot" || WhoWin == ""){
        return
    }
    console.log(event.target.id)

    if(event.target.innerHTML){
        return
    }
    event.target.innerHTML = 'X'
    CheckWinner();
    WhoWin = "";
    btnCards.forEach((el) => {
        el.disabled = false
    })

    btnXOs.forEach((el) => {
        el.disabled = true
    })
};

function BotInput(){
    let rdm = Math.floor(Math.random() * (btnXOs.length - 1));
    while (btnXOs[rdm].innerHTML){
        rdm = Math.floor(Math.random() * (btnXOs.length - 1))
    }
    btnXOs[rdm].innerHTML = "O"

}

function CheckWinner(){
    let player = "";
    if (WhoWin == "player"){
        player = 'X'
    }
    else {
        player = 'O'
    }
    const win1 = btnXOs[0].innerHTML == player && btnXOs[1].innerHTML == player && btnXOs[2].innerHTML == player
    const win2 = btnXOs[3].innerHTML == player && btnXOs[4].innerHTML == player && btnXOs[5].innerHTML == player
    const win3 = btnXOs[6].innerHTML == player && btnXOs[7].innerHTML == player && btnXOs[8].innerHTML == player

    const win4 = btnXOs[0].innerHTML == player && btnXOs[3].innerHTML == player && btnXOs[6].innerHTML == player
    const win5 = btnXOs[1].innerHTML == player && btnXOs[4].innerHTML == player && btnXOs[7].innerHTML == player
    const win6 = btnXOs[2].innerHTML == player && btnXOs[5].innerHTML == player && btnXOs[8].innerHTML == player

    const win7 = btnXOs[0].innerHTML == player && btnXOs[4].innerHTML == player && btnXOs[8].innerHTML == player
    const win8 = btnXOs[2].innerHTML == player && btnXOs[4].innerHTML == player && btnXOs[6].innerHTML == player
    
    if(win1 || win2 || win3 || win4 || win5 || win6 || win7 || win8){
        // alert(WhoWin + ' Win')
        winPopup(WhoWin);
    }
    else if(btnXOs[0].innerHTML && btnXOs[1].innerHTML && btnXOs[2].innerHTML && btnXOs[3].innerHTML && btnXOs[4].innerHTML && btnXOs[5].innerHTML && btnXOs[6].innerHTML && btnXOs[7].innerHTML && btnXOs[8].innerHTML){
        winPopup("draw")
    }

    if(WhoWin == "Bot"){
        WhoWin = "";
    }
}

function closePopup(){
    document.querySelector('.battle').style.display = 'none';
    if(WhoWin == "Bot"){
        CheckWinner();
    }
    
}

function winPopup(who){
    console.log(who);
    document.querySelector('.win').style.display = 'flex';
    const currentUser = firebase.auth().currentUser
    refUsers.child(currentUser.uid).once("value", (data) => {
        data = data.val()
        if(who == "player"){
            document.querySelector('.win-result').innerHTML = "คุณชนะ"
            refUsers.child(currentUser.uid).update({
                win: data.win + 1
            })
        }
        else if(who == "draw"){
            document.querySelector('.win-result').innerHTML = "เสมอ"
            refUsers.child(currentUser.uid).update({
                draw: data.draw + 1
            })
        }
        else{
            document.querySelector('.win-result').innerHTML = "คุณแพ้"
            refUsers.child(currentUser.uid).update({
                lose: data.lose + 1
            })
        }
    })
    
}