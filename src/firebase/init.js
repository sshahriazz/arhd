import firebase from 'firebase/app'
import 'firebase/auth'

// The configuration below is not sensitive data. You can serenely add your config here
const config = {
  apiKey: 'AIzaSyCfvEWpXho20C0uYesb-G7MQ97M1j7Zysg',
  authDomain: 'arhd-db534.firebaseapp.com',
  databaseURL: 'https://arhd-db534.firebaseio.com',
  projectId: 'arhd-db534',
  storageBucket: 'arhd-db534.appspot.com',
  messagingSenderId: '187560847647',
  appId: '1:187560847647:web:0645a0a2cf875596caa82a',
  measurementId: 'G-LY3PKQMLCS'
}
firebase.initializeApp(config)
