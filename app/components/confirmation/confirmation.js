
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from '../../firebase/config';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';

const Confirmation = () => {
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [freeDomain, setFreeDomain] = useState('0');
  const [location, setLocation] = useState('0');
  const [ownDomain, setOwnDomain] = useState('0');
  const [ownServerLocation, setOwnServerLocation] = useState('0');

  useEffect(() => {
    const storedFreeDomain = localStorage.getItem('freeDomain') || '0';
    const storedFreeLocation = localStorage.getItem('serverLocation') || '0';
    const storedOwnDomain = localStorage.getItem('ownDomain') || '0';
    const storedOwnLocation = localStorage.getItem('ownServerLocation') || '0';
    const selectedDomainType = localStorage.getItem('selectedDomainType') || 'free';

    if (selectedDomainType === 'free') {
      setFreeDomain(storedFreeDomain);
      setLocation(storedFreeLocation);
      setOwnDomain('0');  // Reset own domain to 0
      setOwnServerLocation('0');  // Reset own server location to 0
    } else if (selectedDomainType === 'own') {
      setFreeDomain('0');  // Reset free domain to 0
      setLocation('0');  // Reset free server location to 0
      setOwnDomain(storedOwnDomain);
      setOwnServerLocation(storedOwnLocation);
    }
  }, []);

  const adminEmail = localStorage.getItem('community_adminEmail') || '0';
  const adminPassword = localStorage.getItem('community_password') || '0';
  const communityName = localStorage.getItem('community_name') || '0';
  const communityDescription = localStorage.getItem('community_desc') || '0';
  const paymentStatus = localStorage.getItem('community_paymentStatus') || '0';
  const createdDate = localStorage.getItem('community_createdDate') || new Date().toISOString();
  const freeDomainID = localStorage.getItem('freeDomainID') || '0';
  let ownDomainID = localStorage.getItem('ownDomainID') || '0';
  const userID = localStorage.getItem('userID') || '0';

  const handleGoBack = () => {
    window.history.back();
  };

  const handleSaveToFirestore = async () => {
    try {
        let ownDomainID = localStorage.getItem('ownDomainID') || '0';
        let freeDomainID = localStorage.getItem('freeDomainID') || '0';

        if (ownDomain !== '0') {
            const ownDomainCollection = collection(db, 'ownDomainTable');
            const ownDomainSnapshot = await getDocs(ownDomainCollection);
            const ownDomainCount = ownDomainSnapshot.size;

            // Assign a new ownDomainID if it is '0'
            ownDomainID = (ownDomainCount + 1).toString();

            const ownDomainData = {
                ownDomainID: ownDomainID,
                Domain: ownDomain,
                userID: userID,
                location: ownServerLocation
            };
            await setDoc(doc(db, 'ownDomainTable', ownDomainID || 'default_ownDomainID'), ownDomainData);

            // Reset freeDomainID to 0
            freeDomainID = '0';
        }

        if (freeDomain !== '0') {
            const freeDomainCollection = collection(db, 'freeDomainTable');
            const freeDomainSnapshot = await getDocs(freeDomainCollection);
            const freeDomainCount = freeDomainSnapshot.size;

            // Assign a new freeDomainID if it is '0'
            freeDomainID = (freeDomainCount + 1).toString();

            const freeDomainData = {
                freeDomainID: freeDomainID,
                freeDomain: freeDomain,
                userID: userID,
                location: location
            };
            await setDoc(doc(db, 'freeDomainTable', freeDomainID || 'default_freeDomainID'), freeDomainData);

            // Reset ownDomainID to 0
            ownDomainID = '0';
        }

        const communityData = {
            AdminEmail: adminEmail,
            AdminPassword: adminPassword,
            CommunityDesc: communityDescription,
            CommunityID: '0',
            CommunityName: communityName,
            CreatedDate: createdDate,
            PaymentStatus: paymentStatus,
            SelectedPlan: selectedPlan,
            freeDomain: freeDomain,
            freeDomainID: freeDomainID,
            ownDomainID: ownDomainID,
            userID: userID
        };

        await setDoc(doc(db, 'communityTable', communityName || 'default_name'), communityData);

        console.log('Data saved to Firestore successfully');
    } catch (error) {
        console.error('Error saving data to Firestore:', error);
    }
};

  const handleContinue = async () => {
    if (selectedPlan) {
      const planDetails = {
        name: selectedPlan === 'basic' ? 'Basic Plan' : 'Standard Plan',
        price: selectedPlan === 'basic' ? '$59' : '$99'
      };
      localStorage.setItem('selectedPlan', JSON.stringify(planDetails));

      await handleSaveToFirestore(); // Save data to Firestore

      window.location.href = 'checkout'; // Redirect to checkout page
    }
  };

  const handlePlanChange = (event) => {
    setSelectedPlan(event.target.value);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="background.default"
      p={3}
    >
      <Typography variant="h4" gutterBottom>
        Review Your Details Before Proceeding to Payment
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        You're almost there! Let's make sure everything looks perfect before we move on to the payment page. Please review your information below:
      </Typography>
      <Box bgcolor="background.paper" p={3} borderRadius={2} boxShadow={3} mb={4}>
      <Typography variant="h6">
  Free Domain: {freeDomain !== '0' ? `${freeDomain}.forem2go.org` : 'N/A'}
</Typography>
        <Typography variant="h6">Free Domain Location: {location !== '0' ? location : 'N/A'}</Typography>
        <Typography variant="h6">Own Domain: {ownDomain !== '0' ? ownDomain : 'N/A'}</Typography>
        <Typography variant="h6">Own Domain Location: {ownServerLocation !== '0' ? ownServerLocation : 'N/A'}</Typography>
        <Typography variant="h6">Community Name: {communityName}</Typography>
        <Typography variant="h6">Admin Email: {adminEmail}</Typography>
        <Typography variant="h6">Admin Password: {adminPassword}</Typography>
        <Typography variant="h6">Community Description: {communityDescription}</Typography>
        <Typography variant="h6">Payment Status: {paymentStatus}</Typography>
        <Typography variant="h6">Created Date: {new Date(createdDate).toLocaleString()}</Typography>
      </Box>

      {/* Plan Cards Section with Radio Buttons */}
      <div className="card mb-3" style={{ maxWidth: '600px', border: '1px solid #ddd' }}>
        <div className="card-body d-flex align-items-center">
          <input
            type="radio"
            id="basic"
            name="plan"
            value="basic"
            checked={selectedPlan === 'basic'}
            onChange={handlePlanChange}
            className="me-3"
            style={{ transform: 'scale(1.5)' }}
          />
          <div>
            <h5 className="card-title mb-1">$59 <small className="text-muted">Per month</small></h5>
            <p className="card-text mb-1">Basic Plan</p>
            <ul className="list-unstyled" style={{ fontSize: '14px', lineHeight: '1.5' }}>
              <li>• Unlimited members</li>
              <li>• Unlimited staff</li>
              <li>• 50k monthly pageviews</li>
              <li>• community.heliotrops.org domain</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card mb-4" style={{ maxWidth: '600px', border: '1px solid #ddd' }}>
        <div className="card-body d-flex align-items-center">
          <input
            type="radio"
            id="standard"
            name="plan"
            value="standard"
            checked={selectedPlan === 'standard'}
            onChange={handlePlanChange}
            className="me-3"
            style={{ transform: 'scale(1.5)' }}
          />
          <div>
            <h5 className="card-title mb-1">$99 <small className="text-muted">Per month</small></h5>
            <p className="card-text mb-1">Standard Plan</p>
            <ul className="list-unstyled" style={{ fontSize: '14px', lineHeight: '1.5' }}>
              <li>• Unlimited members</li>
              <li>• Unlimited staff</li>
              <li>• 50k monthly pageviews</li>
              <li>• community.heliotrops.org domain</li>
            </ul>
          </div>
        </div>
      </div>

      <Box display="flex" justifyContent="space-between" width="100%" mt={3} style={{ maxWidth: '600px' }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleGoBack}
          sx={{ flex: 1, mr: 1 }}
        >
          Go back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleContinue}
          sx={{ flex: 1, ml: 1 }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default Confirmation;