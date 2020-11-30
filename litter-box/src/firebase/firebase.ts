import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgBHTaUhWTKTYnHj84a4VLD4DB6ShLeVc",
  authDomain: "litter-box-7bf9d.firebaseapp.com",
  databaseURL: "https://litter-box-7bf9d.firebaseio.com",
  projectId: "litter-box-7bf9d",
  storageBucket: "litter-box-7bf9d.appspot.com",
  messagingSenderId: "1024403828143",
  appId: "1:1024403828143:web:103c032cf4f05b93b0935a",
  measurementId: "G-824G8XQ02Y"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const useLoggedInUser = () => {
  const [user, setUser] = useState<firebase.User | null>();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(u => setUser(u));
  }, []);

  return user;
};

export const signUp = (email: string, password: string) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);

export const signIn = (email: string, password: string) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export const signOut = () => firebase.auth().signOut();

export type FavoriteFact = {
  by: Pick<firebase.User, 'uid'>;
  fact: Pick<CatFact, "_id">;
}

export const favoriteFactsCollection = db.collection('favoriteFacts') as firebase.firestore.CollectionReference<FavoriteFact>;