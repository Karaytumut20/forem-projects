// /components/AboutYourSiteForm.js

import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormGroup, Container, Row, Col } from 'reactstrap';

const AboutYourSiteForm = () => {
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [communityName, setCommunityName] = useState('');
  const [communityDescription, setCommunityDescription] = useState('');

  const handleAdminEmailChange = (event) => {
    setAdminEmail(event.target.value);
  };

  const handleAdminPasswordChange = (event) => {
    setAdminPassword(event.target.value);
  };

  const handleCommunityNameChange = (event) => {
    setCommunityName(event.target.value);
  };

  const handleCommunityDescriptionChange = (event) => {
    setCommunityDescription(event.target.value);
  };

  const handleContinue = () => {
    // Handle the continue action
    console.log("Admin Email:", adminEmail);
    console.log("Admin Password:", adminPassword);
    console.log("Community Name:", communityName);
    console.log("Community Description:", communityDescription);
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <Typography variant="h5" className="mb-3">About Your Site</Typography>
      <Form className="w-100" style={{ maxWidth: '400px' }}>
        <FormGroup>
          <TextField
            label="Admin Email"
            value={adminEmail}
            onChange={handleAdminEmailChange}
            fullWidth
            margin="normal"
            type="email"
          />
        </FormGroup>
        <FormGroup>
          <TextField
            label="Admin Password"
            value={adminPassword}
            onChange={handleAdminPasswordChange}
            fullWidth
            margin="normal"
            type="password"
          />
        </FormGroup>
        <FormGroup>
          <TextField
            label="Community Name"
            value={communityName}
            onChange={handleCommunityNameChange}
            fullWidth
            margin="normal"
          />
        </FormGroup>
        <FormGroup>
          <TextField
            label="Describe your community in a sentence"
            value={communityDescription}
            onChange={handleCommunityDescriptionChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
        </FormGroup>
        <Row className="mt-3">
          <Col className="d-flex justify-content-between">
            <Button variant="outlined" className="btn btn-outline-secondary">Go back</Button>
            <Button variant="contained" className="btn btn-primary" onClick={handleContinue}>
              Continue
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default AboutYourSiteForm;
