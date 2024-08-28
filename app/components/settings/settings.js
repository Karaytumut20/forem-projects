import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, Typography, TextField, Button, Switch, FormControlLabel, Divider, Grid, Paper, MenuItem, Select, InputLabel, FormControl, Checkbox, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, onAuthStateChanged, updatePassword, sendPasswordResetEmail, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore, doc, updateDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import ResponsiveAppBar from '../navbar/navbar';

// Firebase configuration
const firebaseConfig = {
  // Firebase Config Here
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

const Settings = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userSurname, setUserSurname] = useState('');
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [billingAddress, setBillingAddress] = useState('');
  const [subscriptionPlan, setSubscriptionPlan] = useState('free');
  const [apiKey, setApiKey] = useState('');
  const [roles, setRoles] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

// settings sayfasında
useEffect(() => {
    const fetchUserData = async () => {
      try {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            setUserEmail(user.email);
  
            const userDocRef = doc(db, 'userTable', user.uid);
            const userDoc = await getDoc(userDocRef);
  
            if (userDoc.exists()) {
              const userData = userDoc.data();
              setUserName(userData.name || '');
              setUserSurname(userData.surname || '');
              setNotificationEnabled(userData.notificationEnabled || false);
              setSelectedLanguage(userData.language || 'en');
              setBillingAddress(userData.billingAddress || '');
              setSubscriptionPlan(userData.subscriptionPlan || 'free');
              setApiKey(userData.apiKey || '');
              setRoles(userData.roles || []);
            }
          }
          setLoading(false);
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, []);
  
  const handlePasswordChange = async () => {
    try {
      const user = auth.currentUser;
      if (user && newPassword) {
        await updatePassword(user, newPassword);
        alert('Password updated successfully');
      } else {
        alert('Please enter a new password');
      }
    } catch (error) {
      console.error('Error updating password: ', error);
      alert('Error updating password');
    }
  };

  const handlePasswordReset = async () => {
    try {
      if (userEmail) {
        await sendPasswordResetEmail(auth, userEmail);
        alert('Password reset email sent');
      } else {
        alert('Error: No email found');
      }
    } catch (error) {
      console.error('Error sending password reset email: ', error);
      alert('Error sending password reset email');
    }
  };

  const handleNotificationToggle = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'userTable', user.uid);
        await updateDoc(userDocRef, {
          notificationEnabled: !notificationEnabled
        });
        setNotificationEnabled(!notificationEnabled);
      }
    } catch (error) {
      console.error('Error updating notification preferences: ', error);
      alert('Error updating preferences');
    }
  };

  const handleLanguageChange = async (event) => {
    const newLanguage = event.target.value;
    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'userTable', user.uid);
        await updateDoc(userDocRef, {
          language: newLanguage
        });
        setSelectedLanguage(newLanguage);
      }
    } catch (error) {
      console.error('Error updating language: ', error);
      alert('Error updating language');
    }
  };

  const handleBillingAddressChange = async () => {
    try {
      const user = auth.currentUser;
      if (user && billingAddress) {
        const userDocRef = doc(db, 'userTable', user.uid);
        await updateDoc(userDocRef, {
          billingAddress
        });
        alert('Billing address updated successfully');
      } else {
        alert('Please enter a billing address');
      }
    } catch (error) {
      console.error('Error updating billing address: ', error);
      alert('Error updating billing address');
    }
  };

  const handleSubscriptionChange = async (event) => {
    const newPlan = event.target.value;
    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'userTable', user.uid);
        await updateDoc(userDocRef, {
          subscriptionPlan: newPlan
        });
        setSubscriptionPlan(newPlan);
      }
    } catch (error) {
      console.error('Error updating subscription plan: ', error);
      alert('Error updating subscription plan');
    }
  };

  const handleApiKeyRegenerate = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        // Yeni bir API anahtarı oluşturma (bu bir örnek)
        const newApiKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const userDocRef = doc(db, 'userTable', user.uid);
        await updateDoc(userDocRef, {
          apiKey: newApiKey
        });
        setApiKey(newApiKey);
        alert('API key regenerated successfully');
      }
    } catch (error) {
      console.error('Error regenerating API key: ', error);
      alert('Error regenerating API key');
    }
  };

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        setUserEmail('');
        window.location.href = '/signin';
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 0,
          ml: { xs: 0, lg: 35 },
        }}
      >
        <ResponsiveAppBar toggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)} />

        <Typography variant="h4" gutterBottom sx={{ color: 'black', mt: 2 }}>
          Account Settings
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6" sx={{ color: 'black' }}>User Information</Typography>
              <Typography variant="body1" sx={{ color: 'black' }}><strong>Name:</strong> {userName}</Typography>
              <Typography variant="body1" sx={{ color: 'black' }}><strong>Surname:</strong> {userSurname}</Typography>
              <Typography variant="body1" sx={{ color: 'black' }}><strong>Email:</strong> {userEmail}</Typography>

              <TextField
                label="New Password"
                type="password"
                fullWidth
                variant="outlined"
                margin="normal"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                sx={{ color: 'black' }}
              />
              <Button variant="contained" color="primary" onClick={handlePasswordChange} sx={{ mt: 2 }}>
                Update Password
              </Button>
              <Button variant="contained" color="warning" onClick={handlePasswordReset} sx={{ mt: 2 }}>
                Send Password Reset Email
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6" sx={{ color: 'black' }}>Preferences</Typography>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Language</InputLabel>
                <Select
                  value={selectedLanguage}
                  label="Language"
                  onChange={handleLanguageChange}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="tr">Turkish</MenuItem>
                  <MenuItem value="es">Spanish</MenuItem>
                  <MenuItem value="fr">French</MenuItem>
                </Select>
              </FormControl>

              <FormControlLabel
                control={<Switch checked={notificationEnabled} onChange={handleNotificationToggle} />}
                label="Enable Notifications"
                sx={{ mt: 2, color: 'black' }}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6" sx={{ color: 'black' }}>Billing Information</Typography>
              <TextField
                label="Billing Address"
                fullWidth
                variant="outlined"
                margin="normal"
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
                sx={{ color: 'black' }}
              />
              <Button variant="contained" color="primary" onClick={handleBillingAddressChange} sx={{ mt: 2 }}>
                Update Billing Address
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6" sx={{ color: 'black' }}>Subscription Plan</Typography>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Subscription Plan</InputLabel>
                <Select
                  value={subscriptionPlan}
                  label="Subscription Plan"
                  onChange={handleSubscriptionChange}
                >
                  <MenuItem value="free">Free</MenuItem>
                  <MenuItem value="basic">Basic</MenuItem>
                  <MenuItem value="premium">Premium</MenuItem>
                </Select>
              </FormControl>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6" sx={{ color: 'black' }}>API Key Management</Typography>
              <Typography variant="body1" sx={{ color: 'black', mt: 2 }}>
                Your API Key: <strong>{apiKey}</strong>
              </Typography>
              <Button variant="contained" color="primary" onClick={handleApiKeyRegenerate} sx={{ mt: 2 }}>
                Regenerate API Key
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6" sx={{ color: 'black' }}>User Roles & Permissions</Typography>
              <List>
                {roles.map((role, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={role.name} />
                    <ListItemSecondaryAction>
                      <Checkbox edge="end" checked={role.enabled} />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Manage Roles
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6" sx={{ color: 'black' }}>Audit Logs</Typography>
              <List>
                {auditLogs.map((log, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`${log.action} by ${log.user}`}
                      secondary={`Date: ${log.date} | IP: ${log.ip}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6" sx={{ color: 'black' }}>Data Export/Import</Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Export Data
              </Button>
              <Button variant="contained" color="secondary" sx={{ mt: 2, ml: 2 }}>
                Import Data
              </Button>
            </Paper>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 4, mb: 4 }} />

        <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Settings;
