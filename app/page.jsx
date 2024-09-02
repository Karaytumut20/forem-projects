"use client";
import { Box, Typography, Grid, Button } from '@mui/material';
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
      const storedUser = localStorage.getItem('user');

      if (user) {
        // Kullanıcı giriş yaptıysa, localStorage'a kaydedin ve state'i güncelleyin
        localStorage.setItem('user', JSON.stringify(user));
        setUserSession(user);
      } else if (storedUser) {
        // localStorage'da kullanıcı bilgileri varsa, onları kullan
        setUserSession(JSON.parse(storedUser));
      }
    }
  }, [user]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem('user');
        router.push('/signin');
      })
      .catch((error) => console.error('Error signing out: ', error));
  };

  const handleGetStarted = () => {
    if (!userSession) {
      // Kullanıcı giriş yapmadıysa yönlendir
      router.push('/signin');
    } else {
      // Giriş yaptıysa başka bir işlem yap veya yönlendir
      console.log('User is already logged in, proceed with the action.');
    }
  };

  return (
    <main>
      <ResponsiveAppBarHome />
      <Box className="relative w-full h-96">
        <Image
          src="/img1.png"
          alt="Description of image"
          fill
          style={{ objectFit: 'cover' }}
          priority
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
            marginBottom: '10px'
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleGetStarted}
          sx={{ marginTop: '20px' }}
        >
          Get Started Now
        </Button>
      </Box>

      <Grid container spacing={4} justifyContent="center" alignItems="center" style={{ marginTop: '50px' }}>
        <CardComp />
      </Grid>

      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 'auto', marginTop: '8%' }}>
        <Typography variant="h1" sx={{ color: 'black', fontSize: '50px', textAlign: 'center', marginBottom: '10px' }}>
          Features of Forem Cloud Hosting
        </Typography>
        <Typography variant="h3" sx={{ color: 'black', fontSize: '30px', textAlign: 'center' }}>
          Discover our amazing features
        </Typography>
      </Box>

      <CardGrid />
      <CubeCard />
      <TextWithImageComponent />
      <FooterCard />
    </main>
  );
}
