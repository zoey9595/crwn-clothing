import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAdNP9xlPT-olq9kJCfhvX3Y5LnUMamQ_8",
  authDomain: "crwn-db-5977b.firebaseapp.com",
  databaseURL: "https://crwn-db-5977b.firebaseio.com",
  projectId: "crwn-db-5977b",
  storageBucket: "crwn-db-5977b.appspot.com",
  messagingSenderId: "585544816684",
  appId: "1:585544816684:web:beca2cfd49cc1e1c9ed989",
  measurementId: "G-HW4JC79F8P",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
