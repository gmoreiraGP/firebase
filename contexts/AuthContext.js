import { createContext, useEffect, useState } from "react";
import Router from "next/router";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
// import { auth } from "firebase-admin";
import { app } from "../lib/firebase";

const authFirebase = getAuth(app);
// const auth = admin.auth(app);

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const isAuthenticated = !!user;

  const formatUser = async (user) => ({
    uid: user?.uid,
    email: user.email,
    name: user.displayName,
    idToken: user.getIdToken,
    token: user.accessToken,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
  });

  async function handleUser(currentUser) {
    if (currentUser) {
      const formatedUser = await formatUser(currentUser);
      setUser(currentUser);
    }

    setUser(null);
    return false;
  }

  async function signInRequest({ email, password }) {
    signInWithEmailAndPassword(auth, email, password)
      .then(function (response) {
        setUser(response.user);
        console.log(response.user.getIdToken);
        setCookie(undefined, "pmp.tk", response.user.accessToken, {
          maxAge: 60 * 60 * 1, // 1 hour
        });
        Router.push("/dashboard");
      })
      .catch(function (err) {
        console.log("auth.js", err);
      });
  }

  async function signOutRequest() {
    destroyCookie(undefined, "pmp.tk");
    setUser(null);
    signOut(authFirebase);
    Router.push("/");
  }

  useEffect(() => {
    const { "pmp.tk": token } = parseCookies();
    // if (token) {
    //   const verify = "";
    //   return verify;
    // }

    // onAuthStateChanged(auth, (user) => {
    //   console.log(user, uid);
    // });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signInRequest, signOutRequest }}>
      {children}
    </AuthContext.Provider>
  );
}
