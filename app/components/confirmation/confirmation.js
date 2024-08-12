import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

const CombinedComponent = () => {
  const [selectedPlan, setSelectedPlan] = useState('basic');

  const communityDomain = localStorage.getItem('community_domain');
  const serverLocation = localStorage.getItem('community_serverLocation');
  const adminEmail = localStorage.getItem('community_adminEmail');
  const adminPassword = localStorage.getItem('community_password');
  const communityName = localStorage.getItem('community_name');
  const communityDescription = localStorage.getItem('community_desc');
  const paymentStatus = localStorage.getItem('community_paymentStatus');
  const createdDate = localStorage.getItem('community_createdDate');

  const handleGoBack = () => {
    window.history.back();
  };
  const handleContinue = () => {
    if (selectedPlan) {
      const planDetails = {
        name: selectedPlan === 'basic' ? 'Basic Plan' : 'Standard Plan',
        price: selectedPlan === 'basic' ? '$59' : '$99'
      };
      localStorage.setItem('selectedPlan', JSON.stringify(planDetails));
      window.location.href = 'checkout';
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
        <Typography variant="h6">Domain: {communityDomain}.forem2go.org</Typography>
        <Typography variant="h6">Server Location: {serverLocation}</Typography>
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

export default CombinedComponent;
