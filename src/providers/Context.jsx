import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext(null)
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const githubprovider = new GithubAuthProvider();

const Context = ({children}) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true)


    // create user using em and pass
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    
        // Update profile not neccessary
        const updateUserProfile = async (name, photo) => {
            setLoading(true)
         try {
           await updateProfile(auth.currentUser, {
                displayName: name, 
                photoURL: photo,
                })
                const currentUsers = auth.currentUser
                setUser(currentUsers)
                setLoading(false)
         } catch (error) {
            console.log(error)
            setLoading(false)
         }
        }

    // login new user
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // google login new user
    const signInWithGoogle = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    //  github login new user
    const githubLogin = () =>{
        setLoading(true);
        return signInWithPopup(auth, githubprovider)
    }

    // log out user
    const logOut = () =>{
        setLoading(true);
        return signOut(auth)
    }

    useEffect(() => {
       const unSubscribe =   onAuthStateChanged(auth, currentUser =>{
            console.log('user in the auth state changed' , currentUser)
            setUser(currentUser);
            setLoading(false)
        });
        return () => {
            unSubscribe();
        }
    } ,[])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        signInWithGoogle,
        githubLogin,
        updateUserProfile,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default Context;