import React, { useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  }

    useEffect(() =>{
      const unsubcribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          const {uid, email, displayName, photoURL} = user;
          dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL}));
          navigate("/browse");
        } else {
          // User is signed out
          dispatch(removeUser());
          navigate("/");
        }
      });

      //Ubsubscribe when component unmounts
      return () => unsubcribe();
    }, []);    


  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
        <img className='w-45' src={LOGO}></img>
        {user && <div className='p-2'>
          {/* <img className='w-12 h-12' src={user.photoURL} alt="" /> */}
          <button onClick={handleSignOut} className='mt-2 cursor-pointer bg-red-600 p-2 font-bold text-white rounded-md'>Sign Out</button>
        </div>}
    </div>
  )
}

export default Header
