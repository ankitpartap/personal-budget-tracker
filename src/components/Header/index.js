import React, { useEffect } from 'react'
import "./style.css"
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';

function Header() {

  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");

    }
  }, [user, loading])


  function logoutFnc() {
    try {
      signOut(auth)
        .then(() => {
          navigate("/");
          toast.success("Logged out Successfully!");
      })
        .catch((error) => {
        toast.error(error.messaage);
      })
    } catch (e) {
      toast.error(e.messaage);
    }
    // alert("Logout")
  }
  return (
    <div className='navbar'>
      <p className='logo'>Budget Tracker</p>
      {user && (
        <p className='logo link' onClick={logoutFnc}>Logout</p>

      )}
    </div>
  )
}

export default Header