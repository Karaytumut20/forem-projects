// /components/DomainDetails.js

import React, { useState } from 'react';
import { Box, TextField, MenuItem, Button, Typography } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

const DomainDetails = () => {
  const [domain, setDomain] = useState('');
  const [serverLocation, setServerLocation] = useState('');
  const [error, setError] = useState(false);
  
  const serverLocations = [
    { value: 'us', label: 'United States' },
    { value: 'eu', label: 'Europe' },
    { value: 'asia', label: 'Asia' },
  ];

  const handleDomainChange = (event) => {
    setDomain(event.target.value);
  };

  const handleServerLocationChange = (event) => {
    setServerLocation(event.target.value);
    setError(false);
  };

  const handleContinue = () => {
    if (!serverLocation) {
      setError(true);
    } else {
      console.log("Domain:", domain);
      console.log("Server Location:", serverLocation);
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <Typography variant="h5" className="mb-3">Your are almost done</Typography>
      <Typography variant="body1" className="mb-4 text-center">You’ll be forwarded to the Stripe page to continue with payment.</Typography>
      <Form className="w-100" style={{ maxWidth: '400px' }}>
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

export default DomainDetails;
