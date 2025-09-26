import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';

const GoogleLoginWithValidation = ({ 
  onSuccess, 
  onError, 
  isLoginActive, 
  selectedRole, 
  disabled = false,
  ...props 
}) => {
  const [showValidationMessage, setShowValidationMessage] = useState(false);

  const handleValidationClick = () => {
    if (!isLoginActive && !selectedRole) {
      toast.error('Please select a role before continuing with Google');
      setShowValidationMessage(true);
      // Hide the message after 3 seconds
      setTimeout(() => setShowValidationMessage(false), 3000);
      return;
    }
  };

  // For login, always show the Google button
  if (isLoginActive) {
    return (
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
        disabled={disabled}
        {...props}
      />
    );
  }

  // For registration, show validation message or Google button based on role selection
  if (!selectedRole) {
    return (
      <div>
        <div 
          onClick={handleValidationClick}
          style={{
            width: '100%',
            height: '40px',
            border: '1px solid #dadce0',
            borderRadius: '4px',
            backgroundColor: '#ffffff',
            color: '#3c4043',
            padding: '10px',
            cursor: 'pointer',
            fontSize: '14px',
            fontFamily: 'Roboto, sans-serif',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#f8f9fa';
            e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#ffffff';
            e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
          }}
        >
          {/* Google Logo */}
          <div style={{
            width: '18px',
            height: '18px',
            marginRight: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </div>
          Continue with Google
        </div>
        {showValidationMessage && (
          <div style={{
            color: '#d93025',
            fontSize: '12px',
            marginTop: '4px',
            textAlign: 'center'
          }}>
            Please select a role first
          </div>
        )}
      </div>
    );
  }

  // Role is selected, show the actual Google button
  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onError={onError}
      disabled={disabled}
      {...props}
    />
  );
};

export default GoogleLoginWithValidation;
