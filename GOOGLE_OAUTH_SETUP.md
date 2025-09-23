# Google OAuth Setup Instructions

## Overview
This project now includes Google OAuth authentication with role selection. Users must select their role (Buyer, Seller, Agent, or B2B) before proceeding with Google authentication.

## Setup Steps

### 1. Get Google OAuth Client ID
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add your domain to authorized origins:
   - For development: `http://localhost:3000`, `http://localhost:5173`
   - For production: `https://yourdomain.com`
7. Copy the Client ID

### 2. Update Configuration
1. Open `src/main.jsx`
2. Replace `YOUR_GOOGLE_CLIENT_ID_HERE` with your actual Google OAuth Client ID:

```javascript
const GOOGLE_CLIENT_ID = "your-actual-client-id-here.apps.googleusercontent.com";
```

### 3. Backend API Endpoint
Make sure your backend has an endpoint at `/auth/google` that accepts:
```json
{
  "credential": "google-jwt-token",
  "role": "Buyer|Seller|Agent|B2B"
}
```

The endpoint should:
- Verify the Google JWT token
- Extract user information (name, email, etc.)
- Create or update user with the selected role
- Return user data and success status

## How It Works

### For Login:
1. User clicks "Continue with Google" button
2. Google OAuth popup appears directly
3. User authenticates with Google
4. System sends credential (no role needed) to backend
5. Backend finds existing user and returns their data
6. User is logged in and redirected

### For Registration:
1. User fills out registration form and selects a role
2. User clicks "Continue with Google" button
3. System checks if role is selected
4. If no role selected: Shows error toast "Please select a role before continuing with Google"
5. If role selected: Google OAuth popup appears
6. User authenticates with Google
7. System sends credential + role to backend
8. Backend creates new user with selected role
9. User is logged in and redirected

## Features

- ✅ Simple role validation with toast messages (no popup)
- ✅ Direct Google OAuth for login (no role needed)
- ✅ Role validation for registration (must select role first)
- ✅ Error handling with toast notifications
- ✅ Loading states
- ✅ Responsive design
- ✅ Works on both login and register forms
- ✅ Clean, modern UI

## Error Handling

The system handles various error scenarios:
- No role selected: Shows error toast
- Google authentication failed: Shows error toast
- Backend API errors: Shows error toast
- Network errors: Shows error toast

## Customization

You can customize:
- Button styling in `Header1.jsx`
- Modal appearance in `RoleSelectionModal.jsx`
- Error messages throughout the components
- Role options (add/remove roles as needed)
