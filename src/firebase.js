import * as firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyCzHBPFlpXwbS6-nUMSPLQSInZgfexypq4",
    authDomain: "nba-full-stack-41a30.firebaseapp.com",
    databaseURL: "https://nba-full-stack-41a30.firebaseio.com",
    projectId: "nba-full-stack-41a30",
    storageBucket: "nba-full-stack-41a30.appspot.com",
    messagingSenderId: "280425119390",
    appId: "1:280425119390:web:8803106f4016ec57"
  };

  firebase.initializeApp(firebaseConfig)

  const firebaseDB = firebase.database();
  const firebaseArticles = firebaseDB.ref('articles');
  const firebaseTeams = firebaseDB.ref('teams');
  const firebaseVideos = firebaseDB.ref('videos');


  const firebaseLooper = (snapshot) => {
    const data = [];
    snapshot.forEach((childSnapshot)=>{
        data.push({
            ...childSnapshot.val(),
            id:childSnapshot.key
        })
    });
    return data
  }
  export {
      firebase,
      firebaseDB, 
      firebaseArticles,
      firebaseVideos,
      firebaseTeams,
      firebaseLooper
  }