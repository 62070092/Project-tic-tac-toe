const elements = ["dirt", "water", "wind", "fire"];
const btnCards = document.querySelectorAll(".btn-card");
const btnXOs = document.querySelectorAll(".btn-xo");

function chooseCard(element){
    const uid = firebase.auth().currentUser.uid;
    const rdm = Math.floor(Math.random() * (elements.length - 1));
    const botElement = elements[rdm];
    
    console.log(botElement);

    const win1 = element == "dirt" && botElement == "wind";
    const win2 = element == "wind" && botElement == "water";
    const win3 = element == "water" && botElement == "fire";
    const win4 = element == "fire" && botElement == "dirt";

    const tie1 = ["wind", "fire"].includes(element) && ["wind", "fire"].includes(botElement);
    const tie2 = ["dirt", "water"].includes(element) && ["dirt", "water"].includes(botElement);
    
    if (win1 || win2 || win3 || win4){
        alert("Win!")
        checkWinRound("player")
    }
    else if (element == botElement){
    // else if (tie1 || tie2){
        alert("Play Again")
    }
    else{
        alert("Lose")
    }
}

btnXOs.forEach((el) => {
    el.addEventListener("click", inputXO)
})

function checkWinRound(who){
    if (who == "player"){
        btnCards.forEach((el) => {
            el.disabled = true
        })
    
        btnXOs.forEach((el) => {
            el.disabled = false
        })
    }
    else {

    }
};

function inputXO(){
    btnCards.forEach((el) => {
        el.disabled = false
    })

    btnXOs.forEach((el) => {
        el.disabled = true
    })
};