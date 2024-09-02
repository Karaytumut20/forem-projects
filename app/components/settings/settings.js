import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, Typography, Button, TextField, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider } from '@mui/material';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import Firebase Authentication

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLCmASch8Tet2R1MDnt9skETz6s2ZiIY8",
  authDomain: "forem-c78dc.firebaseapp.com",
  projectId: "forem-c78dc",
  storageBucket: "forem-c78dc.appspot.com",
  messagingSenderId: "62561986265",
  appId: "1:62561986265:web:dd455856dba47ec90f00c8",
  measurementId: "G-9G3GJCB5GR"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // Initialize Firebase Authentication

const Settings = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userSurname, setUserSurname] = useState('');
  const [loading, setLoading] = useState(false);
  const [freeDomains, setFreeDomains] = useState([]);
  const [ownDomains, setOwnDomains] = useState([]);
  const [userID, setUserID] = useState(null); // State to store the current user's ID

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserID(user.uid); // Set the userID state with the logged-in user's ID
        setUserEmail(user.email); // Set the email if needed
        // Fetch user-related data once the userID is available
        fetchDomains(user.uid);
      } else {
        // Handle the case when no user is logged in
        setUserID(null);
        setFreeDomains([]);
        setOwnDomains([]);
      }
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);

  const fetchDomains = async (currentUserID) => {
    if (!currentUserID) return;
    setLoading(true);
    try {
      // Query for fetching free domains
      const freeDomainsQuery = query(collection(db, 'freeDomainTable'), where('userID', '==', currentUserID));
      // Query for fetching own domains
      const ownDomainsQuery = query(collection(db, 'ownDomainTable'), where('userID', '==', currentUserID));

      const [freeDomainsSnapshot, ownDomainsSnapshot] = await Promise.all([
        getDocs(freeDomainsQuery),
        getDocs(ownDomainsQuery),
      ]);

      // Mapping the data to state
      const freeDomainsData = freeDomainsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const ownDomainsData = ownDomainsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setFreeDomains(freeDomainsData);
      setOwnDomains(ownDomainsData);
    } catch (error) {
      console.error('Error fetching domains: ', error.message || error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUserEmail('');
    window.location.href = '/signin';
  };

  const handleSaveChanges = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Changes saved successfully!');
    }, 1000);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
      <CssBaseline />
      <Paper
        sx={{
          p: 4,
          maxWidth: 800,
          width: '100%',
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: 'black', textAlign: 'center' }}>
          Settings
        </Typography>
        <Grid container spacing={2}>
          {/* User Information */}
          <Grid item xs={12}>
            <Typography variant="h6">User Information</Typography>
            <TextField
              fullWidth
              label="First Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Last Name"
              value={userSurname}
              onChange={(e) => setUserSurname(e.target.value)}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </Grid>

          {/* Free Domains Table */}
          <Grid item xs={12}>
            <Typography variant="h6">Free Domains</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Free Domain</TableCell>
                    <TableCell>Location</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {freeDomains.map((domain) => (
                    <TableRow key={domain.id}>
                      <TableCell>{domain.freeDomain}</TableCell>
                      <TableCell>{domain.location}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* Own Domains Table */}
          <Grid item xs={12}>
            <Typography variant="h6">Own Domains</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Domain</TableCell>
                    <TableCell>Location</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ownDomains.map((domain) => (
                    <TableRow key={domain.id}>
                      <TableCell>{domain.Domain}</TableCell>
                      <TableCell>{domain.location}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Divider sx={{ my: 2 }} />

          {/* Save and Logout Buttons */}
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Settings;
