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
      <Typography variant="h5" className="mb-3">Your own domain</Typography>
      <Form className="w-100" style={{ maxWidth: '400px' }}>
        <FormGroup>
          <TextField
            label="Your own domain"
            variant="outlined"
            fullWidth
            value={domain}
            onChange={handleDomainChange}
            helperText="For example: mydomain.com or community.mydomain.com"
            margin="normal"
          />
        </FormGroup>
        <FormGroup>
          <Label for="serverLocation">Server location</Label>
          <Input
            type="select"
            name="serverLocation"
            id="serverLocation"
            value={serverLocation}
            onChange={handleServerLocationChange}
          >
            <option value="" disabled>Select server location</option>
            {serverLocations.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Input>
          {error && (
            <Typography color="error" className="mt-2">Please choose your location</Typography>
          )}
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

export default DomainDetails;
