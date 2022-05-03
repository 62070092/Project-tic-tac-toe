
document.querySelector("#btn-enter").addEventListener('click', loginAnonymous)

function loginAnonymous(){
    const name = document.querySelector("#input-login-username").value
    firebase.auth().signInAnonymously()
      .then((userCredential) => {
        // Signed in..
        var user = userCredential.user;
        console.log(user);
        refUsers.child(user.uid).update({
            name: name
        })
        setTimeout(() => {
            window.location.href = "Choose your team.html"
        }, 1000)
    })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}

