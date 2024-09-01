// hooks/useAuth.js
import { useEffect } from 'react';
import { auth } from '../firebase/config'; // Firebase config'inizi doğru şekilde import ettiğinizden emin olun
import { useAuthState } from 'react-firebase-hooks/auth';

const useAuth = () => {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (!loading) {
      if (user) {
        // Kullanıcı oturum açmışsa, bilgileri localStorage'a kaydediyoruz
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        // Kullanıcı çıkış yapmışsa, localStorage'dan bilgileri kaldırıyoruz
        localStorage.removeItem('user');
      }
    }
  }, [user, loading]);

  return user;
};

export default useAuth;
