import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const Apps = () => {
  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log('User info:', decoded);
    // Save user info in state or context as needed
  };

  const handleError = () => {
    console.error('Login Failed');
  };

  return (
    <div>
      <h1>Sign in with Google</h1>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
};

export default Apps
