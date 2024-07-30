import React, { useState } from 'react';
import { Box, TextField, Button, Typography, FormControlLabel, Checkbox, MenuItem } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

const PaymentDetailsForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [updatesSubscribed, setUpdatesSubscribed] = useState(false);

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleExpiryMonthChange = (event) => {
    setExpiryMonth(event.target.value);
  };

  const handleExpiryYearChange = (event) => {
    setExpiryYear(event.target.value);
  };

  const handleCvvChange = (event) => {
    setCvv(event.target.value);
  };

  const handleCardHolderChange = (event) => {
    setCardHolder(event.target.value);
  };

  const handleTermsChange = (event) => {
    setTermsAccepted(event.target.checked);
  };

  const handleUpdatesChange = (event) => {
    setUpdatesSubscribed(event.target.checked);
  };

  const handleSubmit = () => {
    window.location.href = '/SiteOnTheWay';
  };

  const handleCancel = () => {
    window.location.href = '/DomainDetails';
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <Typography variant="h5" className="mb-3">Payment Details</Typography>
      <Form className="w-100" style={{ maxWidth: '400px' }}>
        <FormGroup>
          <Label for="cardNumber">Card Number</Label>
          <Input
            type="text"
            name="cardNumber"
            id="cardNumber"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="Enter your card number"
          />
        </FormGroup>
        <FormGroup>
          <Row>
            <Col>
              <Label for="expiryMonth">Exp Month</Label>
              <Input
                type="select"
                name="expiryMonth"
                id="expiryMonth"
                value={expiryMonth}
                onChange={handleExpiryMonthChange}
              >
                <option value="" disabled>Select month</option>
                {[...Array(12).keys()].map((month) => (
                  <option key={month + 1} value={month + 1}>
                    {String(month + 1).padStart(2, '0')}
                  </option>
                ))}
              </Input>
            </Col>
            <Col>
              <Label for="expiryYear">Exp Year</Label>
              <Input
                type="select"
                name="expiryYear"
                id="expiryYear"
                value={expiryYear}
                onChange={handleExpiryYearChange}
              >
                <option value="" disabled>Select year</option>
                {[...Array(10).keys()].map((year) => (
                  <option key={year + new Date().getFullYear()} value={year + new Date().getFullYear()}>
                    {year + new Date().getFullYear()}
                  </option>
                ))}
              </Input>
            </Col>
            <Col>
              <Label for="cvv">CVV</Label>
              <Input
                type="password"
                name="cvv"
                id="cvv"
                value={cvv}
                onChange={handleCvvChange}
                placeholder="Enter CVV"
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Label for="cardHolder">Card Holder</Label>
          <Input
            type="text"
            name="cardHolder"
            id="cardHolder"
            value={cardHolder}
            onChange={handleCardHolderChange}
            placeholder="Enter card holder name"
          />
        </FormGroup>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={termsAccepted}
                onChange={handleTermsChange}
                color="primary"
              />
            }
            label="I agree to the Forem2go terms"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={updatesSubscribed}
                onChange={handleUpdatesChange}
                color="primary"
              />
            }
            label="Send me product and services updates by email"
          />
        </FormGroup>
        <Row className="mt-3">
          <Col className="d-flex justify-content-between">
            <Button 
              variant="outlined" 
              className="btn btn-outline-secondary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              className="btn btn-primary" 
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default PaymentDetailsForm;
