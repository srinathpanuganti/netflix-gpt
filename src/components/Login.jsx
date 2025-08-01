import React, { useRef, useState } from 'react';
import Header from './Header';
import {CheckValidData} from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../utils/firebase";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const email = useRef(null);
    const password = useRef(null);

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
                    console.log(user);
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
                    console.log(user);
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
            <img src='https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/IN-en-20250721-TRIFECTA-perspective_cadc8408-df6e-4313-a05d-daa9dcac139f_large.jpg'></img>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="w-4/12 absolute p-12 bg-black mt-36 mx-auto right-0 left-0 text-white rounded-lg">
            <h1 className='font-bold text-3xl pb-4'>
                {isSignInForm ? "Sign In" : "Sign Up"}
            </h1>
            {!isSignInForm && <input className='bg-[#1f1f1f] rounded-sm p-3 my-2 text-white w-full ' 
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
