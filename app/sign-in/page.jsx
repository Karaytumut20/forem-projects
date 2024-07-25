'use client';
import { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '/app/firebase/config';
import { useRouter } from 'next/navigation';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = MuiAlert;

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const router = useRouter();

  const handleSignIn = async () => {
    if (!email || !password) {
      setAlertMessage('Please enter both email and password.');
      setSeverity('error');
      setOpen(true);
      return;
    }

    try {
      const { user } = await signInWithEmailAndPassword(email, password);
      console.log({ user });
      sessionStorage.setItem('user', JSON.stringify(user)); // Store user object as JSON string
      setEmail('');
      setPassword('');
      router.push('/');
      setAlertMessage('Sign-in successful!');
      setSeverity('success');
      setOpen(true);
    } catch (e) {
      console.error(e);
      setAlertMessage('Sign-in failed. Please check your email and password.');
      setSeverity('error');
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Sign In</h1>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <button 
          onClick={handleSignIn}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          Sign In
        </button>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SignIn;
