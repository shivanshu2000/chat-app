import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDKrHVQarNZ447hMQAj66kJX5fDs8Atgl4',
  authDomain: 'chat-app-7ca55.firebaseapp.com',
  projectId: 'chat-app-7ca55',
  storageBucket: 'chat-app-7ca55.appspot.com',
  messagingSenderId: '1043377757619',
  appId: '1:1043377757619:web:0d3b56c50be092d7ad3fc6',
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { firestore, timestamp };
