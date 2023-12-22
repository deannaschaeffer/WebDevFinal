import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth"
import withFirebaseAuth from 'react-with-firebase-auth';

const firebaseConfig = {
  apiKey: "AIzaSyAmjz1-Wsfxc69ymQHN8Lv3_PLDSSjDstA",
  authDomain: "workout-69d3c.firebaseapp.com",
  projectId: "workout-69d3c",
  storageBucket: "workout-69d3c.appspot.com",
  messagingSenderId: "858814311056",
  appId: "1:858814311056:web:57ae9dbd74da2280988615"
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

const db = getFirestore(app)
const auth = getAuth(app)

const providers = {
  googleProvider: new GoogleAuthProvider(),
}

const createComponentWithAuth = withFirebaseAuth({
  providers,
  firebaseAppAuth: auth,
})

const signInWithGoogle = () => {
  signInWithPopup(auth, providers.googleProvider)
}

const signOutFirebase = () => {
  signOut(auth)
}

export {
  db,
  auth,
  createComponentWithAuth,
  signInWithGoogle,
  signOutFirebase as signOut,
}
