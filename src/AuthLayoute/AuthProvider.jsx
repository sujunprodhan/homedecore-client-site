import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';

const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register User
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign In User
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
// update User Profile
const updateUserProfile=(profile)=>{
  return updateProfile(auth.currentUser, profile)
}

  // Google Sign In
  const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  // SignOut
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };



  // Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    signInGoogle,
    logOut,
    updateUserProfile,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
