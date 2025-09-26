# Google OAuth Fix Guide

## Current Issues
- Error 401: invalid_client
- 404 error on redirect
- "no registered origin" error

## Step-by-Step Fix

### 1. Google Cloud Console Setup

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**
2. **Select your project** (or create a new one)
3. **Enable APIs:**
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API" or "Google Identity API"
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
   http://127.0.0.1:3000
   http://127.0.0.1:5173
   https://yourdomain.com (replace with your actual domain)
   ```

6. **Configure Redirect URIs:**
   Add these to "Authorized redirect URIs":
   ```
   http://localhost:3000
   http://localhost:5173
   https://yourdomain.com (replace with your actual domain)
   ```

7. **Copy the Client ID:**
   - Copy the generated Client ID
   - It should look like: `123456789-abcdefghijklmnop.apps.googleusercontent.com`

### 2. Update Your Code

1. **Update the Client ID:**
   - Open `src/config/googleAuth.js`
   - Replace `YOUR_GOOGLE_CLIENT_ID_HERE.apps.googleusercontent.com` with your actual Client ID

2. **Update Production Domain:**
   - In the same file, replace `https://yourdomain.com` with your actual domain

### 3. Backend Verification

Make sure your backend has the `/auth/google` endpoint that:
- Accepts POST requests
- Expects JSON with `credential` and `role` fields
- Verifies the Google JWT token
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

### 5. Common Issues & Solutions

**Issue: "invalid_client" error**
- Solution: Double-check your Client ID is correct
- Make sure you're using the right project in Google Cloud Console

**Issue: "no registered origin" error**
- Solution: Add your current domain to Authorized JavaScript origins
- For localhost, make sure you're using the exact port (3000, 5173, etc.)

**Issue: 404 error**
- Solution: Check that your backend `/auth/google` endpoint is working
- Test the endpoint directly with Postman or curl

**Issue: CORS errors**
- Solution: Make sure your backend allows requests from your frontend domain

### 6. Environment Variables (Optional)

For better security, you can use environment variables:

1. Create `.env.local` file:
   ```
   REACT_APP_GOOGLE_CLIENT_ID=your-actual-client-id.apps.googleusercontent.com
   ```

2. Update `src/main.jsx`:
   ```javascript
   const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "fallback-client-id";
   ```

## Debugging Tips

1. **Check browser console** for JavaScript errors
2. **Check network tab** for failed API calls
3. **Verify Google Cloud Console** settings match your domain
4. **Test backend endpoint** independently
5. **Check CORS settings** on your backend

## Production Deployment

When deploying to production:
1. Add your production domain to Google Cloud Console
2. Update the Client ID if needed
3. Make sure your backend is accessible from your frontend domain
4. Test the complete flow in production environment
