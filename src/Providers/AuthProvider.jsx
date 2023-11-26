import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../Firebase/firebase.config";


export const AuthContext = createContext(null);

const auth = getAuth(app);




const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);

    const [loading , setLoading] = useState(true);


     // for sign up 

     const createUser = (email , password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth ,email , password)
    }



     // for sign in 

     const signIn = (email , password) =>{
        setLoading(true);
        return signInWithEmailAndPassword( auth , email , password);
    }

    // for google signIn 

    const googleProvider = new GoogleAuthProvider()

    const googleSignIn =() =>{
        setLoading(true);
        return signInWithPopup(auth , googleProvider)
    }



    // for logout

    const logOut  = () =>{
        setLoading(true);
        return signOut(auth);
    }


    const updateUserProfile = (name , photo) =>{
        return updateProfile(auth.currentUser , {
            displayName : name , photoURL : photo 
        })
    }


    useEffect( ()=>{

        const unSubscribe =onAuthStateChanged(auth , currentUser =>{
            setUser(currentUser);
            console.log('current user', currentUser);
            setLoading(false);
        });

        return () =>{
            return unSubscribe();
        }



    } , [])





    const authInfo = {

        user,
        loading,
        createUser,
        signIn,
        logOut,
        updateUserProfile,
        googleSignIn

    }
    return (
        <AuthContext.Provider value={authInfo} >
            {children}
        </AuthContext.Provider  >
    );
};

export default AuthProvider;
