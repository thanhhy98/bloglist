// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
const firebaseConfig = {
    apiKey: "AIzaSyAuDi5xoFjZr3c1sQQxIvqNWxypdyMBDOY",
    authDomain: "fir-react-upload-1f038.firebaseapp.com",
    projectId: "fir-react-upload-1f038",
    storageBucket: "fir-react-upload-1f038.appspot.com",
    messagingSenderId: "571527284225",
    appId: "1:571527284225:web:bd60579da428ff8a8b6200",
    measurementId: "G-QRDF4HFK0V"
  };

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export { storage, firebase as default}