import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type ActionCodeSettings, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'

const firebase = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  appOrigin: import.meta.env.VITE_APP_ORIGIN,
}

const APP: FirebaseApp = initializeApp(firebase)
const AUTH: Auth = getAuth(APP)
const DB: Firestore = getFirestore(APP)
const CODE: ActionCodeSettings = {
  url: `${firebase.appOrigin}/callback`,
  handleCodeInApp: true,
}

export { APP, AUTH, CODE, DB }
