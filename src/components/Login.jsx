import React, { useRef, useState } from 'react';
import Header from './Header';
import {CheckValidData} from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from "../utils/firebase";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_URL } from '../utils/constants';

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();

    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);

    const toggleSignInForm = () => {  
        setIsSignInForm(!isSignInForm);
    };

    const handleButtonClick = () =>{
        //validate the form data
        let message = CheckValidData(email.current.value, password.current.value);
        setErrorMessage(message);

        if(message) return message;

        //SignIn-SignUp
        if(!isSignInForm){
            //SignUp logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    //Update a user's profile
                    updateProfile(user, {
                        displayName: name.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
                        }).then(() => {
                        // Profile updated!
                        const {uid, email, displayName, photoURL} = auth.currentUser;
                        dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL}));
                        }).catch((error) => {
                            setErrorMessage(error.message);
                        });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        }
        else{
            //SignIn logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        }
    }

  return (
    <div>
        <Header/>
        <div className='absolute'>
            <img src={BG_URL}></img>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="w-4/12 absolute p-12 bg-black mt-36 mx-auto right-0 left-0 text-white rounded-lg">
            <h1 className='font-bold text-3xl pb-4'>
                {isSignInForm ? "Sign In" : "Sign Up"}
            </h1>
            {!isSignInForm && <input ref={name} className='bg-[#1f1f1f] rounded-sm p-3 my-2 text-white w-full ' 
                   type="text" 
                   placeholder='Full name' 
            />}
            <input ref={email}
                   className='bg-[#1f1f1f] rounded-sm p-3 my-2 text-white w-full ' 
                   type="text" 
                   placeholder='Email or mobile number' 
            />
            <input ref={password}
                   className='bg-[#1f1f1f] rounded-sm p-3 my-2 text-white w-full' 
                   type="password" 
                   placeholder='Password' 
            />
            <p className='text-red-500 font-bold'>{errorMessage}</p>
            <button onClick={handleButtonClick} className=' cursor-pointer font-bold text-l p-4 my-4 bg-[#e50914] rounded-sm w-full'>
                {isSignInForm ? "Sign In" : "Sign Up"}
            </button>

            <p className='font-bold cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign up now" : "Already registered? Sign in now"}</p>
        </form>
    </div>
  )
}

export default Login
