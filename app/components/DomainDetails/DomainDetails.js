"use client";
import React from 'react';
import { Box, TextField, MenuItem, Button, Typography } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

const DomainDetails = () => {
  const handleContinue = () => {
    window.location.href = '/PaymentDetailsForm';
  };

  const handleGoBack = () => {
    window.location.href = '/AboutYourSiteForm';
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <Typography variant="h5" className="mb-3">You are almost done</Typography>
      <Typography variant="body1" className="mb-4 text-center">
        You’ll be forwarded to the Stripe page to continue with payment.
      </Typography>
      <Form className="w-100" style={{ maxWidth: '400px' }}>
        <Row className="mt-3">
          <Col className="d-flex justify-content-between">
            <Button 
              variant="outlined" 
              className="btn btn-outline-secondary"
              onClick={handleGoBack}
            >
              Go back
            </Button>
            <Button 
              variant="contained" 
              className="btn btn-primary" 
              onClick={handleContinue}
            >
              Continue
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default DomainDetails;
