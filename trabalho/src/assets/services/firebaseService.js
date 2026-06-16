import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';

import { auth, db } from '../../firebaseConfig';

export async function registerUser(name, email, password) {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await setDoc(doc(db, 'users', credential.user.uid), {
    uid: credential.user.uid,
    name,
    email,
    createdAt: serverTimestamp(),
    lastViewedPost: null,
  });

  return credential.user;
}

export async function loginUser(email, password) {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

export async function logoutUser() {
  await signOut(auth);
}

export async function getUserProfile(uid) {
  const userRef = doc(db, 'users', uid);
  const snapshot = await getDoc(userRef);

  if (snapshot.exists()) {
    return snapshot.data();
  }

  return null;
}

export async function saveLastViewedPost(uid, post) {
  const userRef = doc(db, 'users', uid);

  await setDoc(
    userRef,
    {
      lastViewedPost: {
        id: post.id,
        title: post.title,
        viewedAt: new Date().toISOString(),
      },
    },
    { merge: true }
  );
}