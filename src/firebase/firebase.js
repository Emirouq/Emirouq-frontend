import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDViXHVROUmujwaZMtdt_IzcKstb0s5mv0',
  authDomain: 'emirouq-8fb39.firebaseapp.com',
  projectId: 'emirouq-8fb39',
  storageBucket: 'emirouq-8fb39.firebasestorage.app',
  messagingSenderId: '752001348681',
  appId: '1:752001348681:web:16642933f6f682609bbb98',
  measurementId: 'G-LPYWEX28D8',
}

firebase.initializeApp(firebaseConfig)

export default firebase
