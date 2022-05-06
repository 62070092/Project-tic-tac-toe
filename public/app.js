const firebaseConfig = {
  apiKey: "AIzaSyCEsRc86y9JCq_TyUKSOL0tuZSY36rHIy0",
  authDomain: "project-tic-tac-toe-group-03.firebaseapp.com",
  databaseURL: "https://project-tic-tac-toe-group-03-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "project-tic-tac-toe-group-03",
  storageBucket: "project-tic-tac-toe-group-03.appspot.com",
  messagingSenderId: "335715806584",
  appId: "1:335715806584:web:c7ff78c009f127e1e6ec8d",
  measurementId: "G-8HDTT6MJY3",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const refUsers = firebase.database().ref("users")

refUsers.on("value", (data) => {
    data = data.val()
    const currentUser = firebase.auth().currentUser

    const name = document.querySelector("#username-name");
    const team = document.querySelector("#username-team");

    if (name) {
      document.querySelector("#username-name").innerHTML = data[currentUser.uid].name
    }
    if (team){
      document.querySelector("#username-team").innerHTML = data[currentUser.uid].team
    }
})