import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAaF-chPfOY66-bP41HxxPZz8OkXsqliuk",
    authDomain: "let-s-chat-f5e3f.firebaseapp.com",
    projectId: "let-s-chat-f5e3f",
    storageBucket: "let-s-chat-f5e3f.appspot.com",
    messagingSenderId: "385592668661",
    appId: "1:385592668661:web:bf8ad175d47a0fe45a70bc"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();


export { auth, provider };
export default db;