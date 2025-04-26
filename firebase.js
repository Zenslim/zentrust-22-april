import { initializeApp } from 'firebase/app';
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInWithPopup,
  signInAnonymously,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  OAuthProvider
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// 🔐 Firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyCCGnzc1tNWcwinLnqQXKZCbcvqNn2vFfU',
  authDomain: 'zentrust-e647d.firebaseapp.com',
  projectId: 'zentrust-e647d',
  storageBucket: 'zentrust-e647d.appspot.com',
  messagingSenderId: '423431319301',
  appId: '1:423431319301:web:918835e910f35d5be3916c',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Make login persist across PWA sessions
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error('❌ Firebase persistence failed:', error);
});

const db = getFirestore(app);

// 🔑 Providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();
const appleProvider = new OAuthProvider('apple.com'); // ✅ This was missing before

export {
  app,
  auth,
  db,
  setPersistence,
  browserLocalPersistence,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInWithPopup,
  signInAnonymously,
  googleProvider,
  githubProvider,
  facebookProvider,
  twitterProvider,
  appleProvider, // ✅ Exported properly
};
