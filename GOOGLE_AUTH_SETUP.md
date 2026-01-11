# Google Authentication Setup Guide

## Overview
This project uses `@react-oauth/google` for Google OAuth authentication, which is specifically designed for React frontend applications.

## Setup Steps

### 1. Google Cloud Console Configuration

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**
2. **Select your project** (or create a new one)
3. **Enable Google Identity API:**
   - Go to "APIs & Services" → "Library"
   - Search for "Google Identity" or "Google+ API"
   - Click "Enable"

4. **Create OAuth 2.0 Credentials:**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Give it a name (e.g., "Lands India Web Client")

5. **Configure Authorized Origins:**
   Add these to "Authorized JavaScript origins":
   ```
   http://localhost:3000
   http://localhost:5173
   http://localhost:5174
   http://localhost:5175
   http://127.0.0.1:3000
   http://127.0.0.1:5173
   http://127.0.0.1:5174
   http://127.0.0.1:5175
   https://www.propertystores.in
   ```

6. **Configure Redirect URIs:**
   Add these to "Authorized redirect URIs":
   ```
   http://localhost:3000
   http://localhost:5173
   http://localhost:5174
   http://localhost:5175
   https://www.propertystores.in
   ```

7. **Copy the Client ID:**
   - Copy the generated Client ID
   - Current Client ID: `323586385293-qnisvm6k975gsc8g6q85up9b80k5m1bg.apps.googleusercontent.com`

### 2. Update Configuration

1. **Update the Client ID:**
   - Open `src/config/googleAuth.js`
   - Replace the current Client ID with your actual Client ID from Google Cloud Console

2. **Update Production Domain:**
   - In the same file, update `PRODUCTION_DOMAIN` with your actual domain

### 3. Backend Requirements

Make sure your backend has the following endpoints:

**For Login:**
- Endpoint: `/login`
- Method: POST
- Expects JSON with `credential` field
- Verifies the Google JWT token
- Returns user data and success status

**For Registration:**
- Endpoint: `/registration/new-user`
- Method: POST
- Expects JSON with the following format:
  ```json
  {
    "fullName": "",
    "phone": "",
    "email": "",
    "password": "",
    "type": "Buyer|Seller|Agent|B2B",
    "credential": "google-jwt-token"
  }
  ```
- Verifies the Google JWT token
- Creates new user with selected role (type)
- Returns user data and success status

### 4. Testing

1. **Start your development server:**
   ```bash
   npm start
   # or
   yarn start
   ```

2. **Test the flow:**
   - Open your app in browser
   - Try to login/register with Google
   - Check browser console for any errors
   - Check network tab for API calls

## How It Works

### For Login:
1. User clicks "Continue with Google" button
2. Google Sign-In popup appears
3. User authenticates with Google
4. System calls `GoogleAuth()` function
5. Sends credential to `/login` endpoint
6. Backend finds existing user and returns their data
7. User is logged in and redirected

### For Registration:
1. User fills out registration form and selects a role
2. User clicks "Continue with Google" button
3. System checks if role is selected
4. If no role selected: Shows error toast
5. If role selected: Google Sign-In popup appears
6. User authenticates with Google
7. System calls `GoogleRegister()` function
8. Sends payload to `/registration/new-user` endpoint
9. Backend creates new user with selected role
10. User is logged in and redirected

## Features

- ✅ Uses @react-oauth/google for reliable React authentication
- ✅ Role validation with toast messages
- ✅ Direct Google Sign-In for login
- ✅ Role validation for registration
- ✅ Error handling with toast notifications
- ✅ Loading states
- ✅ Responsive design
- ✅ Works on both login and register forms

## Troubleshooting

**Issue: "Failed to load Google Sign-In"**
- Solution: Check your internet connection and Google API availability

**Issue: "No credential received from Google"**
- Solution: Make sure your domain is authorized in Google Cloud Console

**Issue: Backend authentication failed**
- Solution: Check that your backend `/auth/google` endpoint is working

**Issue: CORS errors**
- Solution: Make sure your backend allows requests from your frontend domain

## Files Modified

- `src/main.jsx` - Added GoogleOAuthProvider wrapper
- `src/components/headers/Header1.jsx` - Updated to use GoogleLogin component
- `src/config/googleAuth.js` - Configuration file with proper client ID
