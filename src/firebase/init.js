import firebase from 'firebase/app'
import 'firebase/auth'

// The configuration below is not sensitive data. You can serenely add your config here
const config = {
  apiKey: 'AIzaSyCXk00VBdZFAS8sFIwGjDSLrKak-n-Tlcs',
  authDomain: 'arhdnsur.firebaseapp.com',
  databaseURL: 'https://arhdnsur.firebaseio.com',
  projectId: 'arhdnsur',
  storageBucket: 'arhdnsur.appspot.com',
  messagingSenderId: '280623649482',
  appId: '1:280623649482:web:319a098e9e5bd3fd421a33',
  measurementId: 'G-HHX1HQMWZC'
}
firebase.initializeApp(config)
