import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyBGiN7CRBIwv5pfbgl9q4jopeOd50576IA",
    authDomain: "hexagono-559d1.firebaseapp.com",
    projectId: "hexagono-559d1",
    storageBucket: "hexagono-559d1.appspot.com",
    messagingSenderId: "859407763947",
    appId: "1:859407763947:web:a176ed480653a5f40ff1ae"}

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


  export default firebase