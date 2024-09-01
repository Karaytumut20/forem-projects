"use client";
import { Box, Typography, Grid } from '@mui/material';
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/config';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import './page.css'; // CSS dosyasını import et
import ResponsiveAppBarHome from './components/navbar-home/navbar-home';
import InfoWithButton from './components/ctn/ctn';
import CardComp from './components/card/card';
import CardGrid from './components/cardGrid/cardGrid';
import CardCopmonent from './components/carcComponent/cardComponenet';
import TextWithImageComponent from './components/TextWithImageComponent/TextWithImageComponent';
import FooterCard from './components/footer/footer';
import CubeCard from './components/cubeCard/cubeCard';

export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [userSession, setUserSession] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Tarayıcıda çalıştığımızı kontrol ediyoruz
      const storedUser = localStorage.getItem('user');

      if (user) {
        // Kullanıcı giriş yaptıysa, localStorage'a kaydedin
        localStorage.setItem('user', JSON.stringify(user));
        setUserSession(user);
      } else if (!storedUser) {
        // Oturum açmamışsa, yönlendirme yapın
        router.push('/signin');
      } else {
        // Oturum açık ise localStorage'dan kullanıcı bilgilerini al
        setUserSession(JSON.parse(storedUser));
      }
    }
  }, [user, router]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem('user');
        router.push('/signin');
      })
      .catch((error) => console.error('Error signing out: ', error));
  };

  return (
    <main>
      <ResponsiveAppBarHome />
      <Box className="relative w-full h-96">
        <Image
          src="/img1.png" // Resmin public klasöründeki yolu
          alt="Description of image"
          fill // 'layout' prop yerine 'fill' kullanıyoruz
          style={{ objectFit: 'cover' }} // Resmin kapsayıcı alanı tamamen doldurmasını sağlar
          priority // Add priority property
        />
      </Box>
      <InfoWithButton />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'auto',
          marginTop: '8%'
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: 'black',
            fontSize: '50px',
            textAlign: 'center',
            marginBottom: '10px' // Add spacing between texts
          }}
        >
          Get started with Forem2go today
        </Typography>
        <Typography
          variant="h3"
          sx={{
            color: 'black',
            fontSize: '30px',
            textAlign: 'center',
          }}
        >
          Start now and experience the best
        </Typography>
      </Box>
      <Grid container spacing={4} justifyContent="center" alignItems="center" style={{ marginTop: '50px' }}>
        <CardComp />
      </Grid>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'auto',
          marginTop: '8%'
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: 'black',
            fontSize: '50px',
            textAlign: 'center',
            marginBottom: '10px'
          }}
        >
          Features of Forem Cloud Hosting
        </Typography>
        <Typography
          variant="h3"
          sx={{
            color: 'black',
            fontSize: '30px',
            textAlign: 'center',
          }}
        >
          Discover our amazing features
        </Typography>
      </Box>
      <CardGrid />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'auto',
          marginTop: '8%'
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: 'black',
            fontSize: '50px',
            textAlign: 'center',
            marginBottom: '10px'
          }}
        >
          Try Forem hosting in 4 Steps
        </Typography>
        <Typography
          variant="h3"
          sx={{
            color: 'black',
            fontSize: '30px',
            textAlign: 'center',
          }}
        >
          Simple and easy setup
        </Typography>
      </Box>
      <CardCopmonent />
      <CubeCard />
      <TextWithImageComponent />
      <FooterCard />
    </main>
  );
}
