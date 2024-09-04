import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, Typography, Button, TextField, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider, CircularProgress, Card, CardContent } from '@mui/material';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; 

const firebaseConfig = {
  apiKey: "AIzaSyDLCmASch8Tet2R1MDnt9skETz6s2ZiIY8",
  authDomain: "forem-c78dc.firebaseapp.com",
  projectId: "forem-c78dc",
  storageBucket: "forem-c78dc.appspot.com",
  messagingSenderId: "62561986265",
  appId: "1:62561986265:web:dd455856dba47ec90f00c8",
  measurementId: "G-9G3GJCB5GR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); 

const Settings = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userSurname, setUserSurname] = useState('');
  const [loading, setLoading] = useState(false);
  const [freeDomains, setFreeDomains] = useState([]);
  const [ownDomains, setOwnDomains] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserID(user.uid);
        setUserEmail(user.email);
        fetchData(user.uid);
      } else {
        setUserID(null);
        setFreeDomains([]);
        setOwnDomains([]);
        setCommunities([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchData = async (currentUserID) => {
    if (!currentUserID) return;
    setLoading(true);
    
    try {
      const userQuery = query(collection(db, 'userTable'), where('userId', '==', currentUserID));
      const userSnapshot = await getDocs(userQuery);
      
      if (!userSnapshot.empty) {
        const userData = userSnapshot.docs[0].data();
        setUserName(userData.name || '');
        setUserSurname(userData.surname || '');
        setUserEmail(userData.email || '');
      }

      const freeDomainsQuery = query(collection(db, 'freeDomainTable'), where('userID', '==', currentUserID));
      const ownDomainsQuery = query(collection(db, 'ownDomainTable'), where('userID', '==', currentUserID));
      const communitiesQuery = query(collection(db, 'communityTable'), where('userID', '==', currentUserID));

      const [freeDomainsSnapshot, ownDomainsSnapshot, communitiesSnapshot] = await Promise.all([
        getDocs(freeDomainsQuery),
        getDocs(ownDomainsQuery),
        getDocs(communitiesQuery),
      ]);

      setFreeDomains(freeDomainsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setOwnDomains(ownDomainsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setCommunities(communitiesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

    } catch (error) {
      console.error('Error fetching data: ', error.message || error);
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
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'start', padding: 4 }}>
      <CssBaseline />
      <Card sx={{ maxWidth: 1450, width: '100%', borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ color: 'black', textAlign: 'center', mb: 3 }}>
            Settings
          </Typography>

          <Grid container spacing={3}>
            {/* User Information */}
            <Grid item xs={12} md={12}>
              <Typography variant="h6" gutterBottom>User Information</Typography>
              <TextField
                fullWidth
                label="First Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                sx={{ mb: 3 }}
              />
              <TextField
                fullWidth
                label="Last Name"
                value={userSurname}
                onChange={(e) => setUserSurname(e.target.value)}
                sx={{ mb: 3 }}
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                sx={{ mb: 3 }}
              />
            </Grid>

            {/* Free Domains */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Free Domains</Typography>
              <TableContainer component={Paper} sx={{ mt: 2 }}>
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

            {/* Own Domains */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Own Domains</Typography>
              <TableContainer component={Paper} sx={{ mt: 2 }}>
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

            {/* Communities */}
            <Grid item xs={12}>
              <Typography variant="h6">Communities</Typography>
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Community Name</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Created Date</TableCell>
                      <TableCell>Payment Status</TableCell>
                      <TableCell>Selected Plan</TableCell>
                      <TableCell>Free Domain</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {communities.map((community) => (
                      <TableRow key={community.id}>
                        <TableCell>{community.CommunityName}</TableCell>
                        <TableCell>{community.CommunityDesc}</TableCell>
                        <TableCell>{community.CreatedDate}</TableCell>
                        <TableCell>{community.PaymentStatus}</TableCell>
                        <TableCell>{community.SelectedPlan}</TableCell>
                        <TableCell>{community.freeDomain}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Save and Logout Buttons */}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                Save Changes
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Settings;
