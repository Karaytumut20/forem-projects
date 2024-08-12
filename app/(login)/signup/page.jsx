'use client';
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';  // Import the useRouter hook
import { auth, db } from '/app/firebase/config';
import { doc, setDoc } from 'firebase/firestore';

const SignUp = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertStyle, setAlertStyle] = useState('');

  const router = useRouter();  // Initialize the useRouter hook

  const handleSignUp = async () => {
    if (!name || !surname || !email || !password) {
      setAlertMessage('Please fill in all fields.');
      setAlertStyle('bg-red-500');
      setShowAlert(true);
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(email, password);
      console.log({ user });

      // Store user object and additional information in sessionStorage
      sessionStorage.setItem('user', JSON.stringify({
        ...user,
        displayName: `${name} ${surname}`
      }));

      // Create user document in Firestore 'userTable' collection
      await setDoc(doc(db, 'userTable', user.uid), {
        userId: user.uid,
        email: user.email,
        name: name,
        surname: surname,
        joinDate: new Date(user.metadata.creationTime).toISOString(), // Use creationTime from authentication metadata
      });

      // Reset form fields
      setName('');
      setSurname('');
      setEmail('');
      setPassword('');

      // Redirect to the domain-config page after successful signup
      router.push('/initialize/domain-config');

    } catch (e) {
      console.error(e);
      setAlertMessage('Sign-up failed. Please try again.');
      setAlertStyle('bg-red-500');
      setShowAlert(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white p-10 rounded-lg shadow-xl w-96 border border-gray-300">
        <h1 className="text-gray-900 text-2xl mb-5">Sign Up</h1>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="w-full p-3 mb-4 bg-white border border-gray-300 rounded outline-none text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500"
        />
        <input 
          type="text" 
          placeholder="Surname" 
          value={surname} 
          onChange={(e) => setSurname(e.target.value)} 
          className="w-full p-3 mb-4 bg-white border border-gray-300 rounded outline-none text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500"
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-3 mb-4 bg-white border border-gray-300 rounded outline-none text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full p-3 mb-4 bg-white border border-gray-300 rounded outline-none text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500"
        />
        <button 
          onClick={handleSignUp}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          Sign Up
        </button>
      </div>
      {showAlert && (
        <div className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 p-4 rounded text-white ${alertStyle}`}>
          {alertMessage}
        </div>
      )}
    </div>
  );
};

export default SignUp;
