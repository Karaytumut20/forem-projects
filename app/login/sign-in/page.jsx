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
  const [showPassword, setShowPassword] = useState(false);
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

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-4xl font-bold mb-6">Sign in</h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-3 mb-4 border border-gray-300 rounded outline-none text-black placeholder-gray-500"
        />
        <div className="relative w-full mb-4">
          <input 
            type={showPassword ? 'text' : 'password'} 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded outline-none text-black placeholder-gray-500"
          />
          <span 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>
        <div className="flex justify-between mt-4">
          <button 
            onClick={() => router.back()}
            className="bg-white border border-gray-300 rounded px-4 py-2 text-black"
          >
            Go back
          </button>
          <button 
            onClick={handleSignIn}
            className="bg-black text-white rounded px-4 py-2"
          >
            Continue
          </button>
        </div>
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