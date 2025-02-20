import React from 'react';
import { useNavigate } from 'react-router-dom';
// require('dotenv').config();
const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate('/');
  };
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Thank You for Your Order!</h1>
        <p style={styles.message}>
          Your order has been placed successfully. A confirmation email has been sent to your registered email address.
        </p>
        <button style={styles.button} onClick={handleGoBack}>
          Go to Homepage
        </button>
      </div>
    </div>
  );
};
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
    margin: 0,
  },
  card: {
    textAlign: 'center',
    backgroundColor: '#fff',
    padding: '20px 30px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '24px',
    margin: '10px 0',
    color: '#333',
  },
  message: {
    fontSize: '16px',
    color: '#666',
    margin: '20px 0',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};
export default CheckoutSuccess;