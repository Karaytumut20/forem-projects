import React, { useState } from 'react';
import { Box, CssBaseline, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Grid, TextField, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';

const Profile = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userSurname, setUserSurname] = useState('');
  const [domains, setDomains] = useState([]);
  const [ownedDomains, setOwnedDomains] = useState([]);

  const handleAddDomain = () => {
    // Yeni domain ekleme işlemi
    alert('Add Domain functionality');
  };

  const handleEditDomain = (domain) => {
    // Domain düzenleme işlemi
    alert(`Edit Domain: ${domain}`);
  };

  const handleDeleteDomain = (domain) => {
    // Domain silme işlemi
    alert(`Delete Domain: ${domain}`);
  };

  const handleLogout = () => {
    // Çıkış işlemi
    setUserEmail('');
    window.location.href = '/signin';
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 0,
          ml: { xs: 0, lg: 4 },
        }}
      >

        <Typography variant="h4" gutterBottom sx={{ color: 'black', mt: 2 }}>
          Profile
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6" sx={{ color: 'black' }}>User Information</Typography>
              <TextField
                label="Name"
                fullWidth
                variant="outlined"
                margin="normal"
                value={userName}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ color: 'black' }}
              />
              <TextField
                label="Surname"
                fullWidth
                variant="outlined"
                margin="normal"
                value={userSurname}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ color: 'black' }}
              />
              <TextField
                label="Email"
                fullWidth
                variant="outlined"
                margin="normal"
                value={userEmail}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ color: 'black' }}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6" sx={{ color: 'black' }}>Account Overview</Typography>
              <Typography variant="body1" sx={{ color: 'black' }}><strong>Total Domains:</strong> {domains.length + ownedDomains.length}</Typography>
              <Typography variant="body1" sx={{ color: 'black' }}><strong>Subscription Plan:</strong> Premium</Typography>
              <Typography variant="body1" sx={{ color: 'black' }}><strong>Account Created:</strong> January 1, 2023</Typography>
              <Typography variant="body1" sx={{ color: 'black' }}><strong>Last Login:</strong> August 27, 2024</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 4, mb: 4 }} />

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'black' }}>
            Free Domains
          </Typography>
          
          <Button variant="contained" color="primary" startIcon={<AddCircleIcon />} onClick={handleAddDomain} sx={{ mb: 2 }}>
            Add New Free Domain
          </Button>

          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Domain Name</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {domains.map((domain, index) => (
                  <TableRow key={index}>
                    <TableCell>{domain}</TableCell>
                    <TableCell>Free Domain</TableCell>
                    <TableCell>
                      <IconButton edge="end" aria-label="edit" onClick={() => handleEditDomain(domain)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteDomain(domain)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'black' }}>
            Owned Domains
          </Typography>
          
          <Button variant="contained" color="primary" startIcon={<AddCircleIcon />} onClick={handleAddDomain} sx={{ mb: 2 }}>
            Add New Owned Domain
          </Button>

          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Domain Name</strong></TableCell>
                  <TableCell><strong>Expiration Date</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ownedDomains.map((domain, index) => (
                  <TableRow key={index}>
                    <TableCell>{domain}</TableCell>
                    <TableCell>December 31, 2024</TableCell>
                    <TableCell>
                      <IconButton edge="end" aria-label="edit" onClick={() => handleEditDomain(domain)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteDomain(domain)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'black' }}>
            Account Statistics
          </Typography>
          
          <Paper sx={{ width: '100%', overflow: 'hidden', mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Statistic</strong></TableCell>
                  <TableCell><strong>Value</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Total Forms Created</TableCell>
                  <TableCell>120</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Responses Collected</TableCell>
                  <TableCell>3,450</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Submissions This Month</TableCell>
                  <TableCell>560</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Average Response Time</TableCell>
                  <TableCell>2 mins</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
