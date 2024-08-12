'use client';
import { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '/app/firebase/config';
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertStyle, setAlertStyle] = useState('');

  const router = useRouter();

  const handleSignIn = async () => {
    if (!email || !password) {
      setAlertMessage('Please enter both email and password.');
      setAlertStyle('bg-red-500');
      setShowAlert(true);
      return;
    }

    try {
      const { user } = await signInWithEmailAndPassword(email, password);
      console.log({ user });
      sessionStorage.setItem('user', JSON.stringify(user)); // Store user object as JSON string
      setEmail('');
      setPassword('');
      router.push('/dashboard');
      setAlertMessage('Sign-in successful!');
      setAlertStyle('bg-green-500');
      setShowAlert(true);
    } catch (e) {
      console.error(e);
      setAlertMessage('Sign-in failed. Please check your email and password.');
      setAlertStyle('bg-red-500');
      setShowAlert(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-4xl font-bold mb-6 text-black">Sign in</h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-96 border border-black">
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-3 mb-4 bg-white border border-black rounded outline-none text-black placeholder-black focus:ring-2 focus:ring-indigo-500"
        />
        <div className="relative w-full mb-4">
          <input 
            type={showPassword ? 'text' : 'password'} 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full p-3 bg-white border border-black rounded outline-none text-black placeholder-black focus:ring-2 focus:ring-indigo-500"
          />
          <span 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-black"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>
        <div className="flex justify-between mt-4">
          <button 
            onClick={() => router.back()}
            className="bg-white border border-black rounded px-4 py-2 text-black hover:bg-black hover:text-white transition duration-300"
          >
            Go back
          </button>
          <button 
            onClick={handleSignIn}
            className="bg-black text-white rounded px-4 py-2 hover:bg-white hover:text-black border border-black transition duration-300"
          >
            Continue
          </button>
        </div>
      </div>
      {showAlert && (
        <div className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 p-4 rounded text-white ${alertStyle}`}>
          {alertMessage}
        </div>
      )}
    </div>
  );
};

export default SignIn;
