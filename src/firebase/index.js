import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyAqH7E0MWtxsLjmdqbsnixrmZHPb9bLAl0",
    authDomain: "anivote-f8b22.firebaseapp.com",
    databaseURL: "https://anivote-f8b22.firebaseio.com",
    projectId: "anivote-f8b22",
    storageBucket: "anivote-f8b22.appspot.com",
    messagingSenderId: "680901941858",
    appId: "1:680901941858:web:64060833a99762a45d0f3b",
    measurementId: "G-GKZFNK5YDJ"
}

firebase.initializeApp(config)

const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export default {
    db,
    auth,
    storage
}