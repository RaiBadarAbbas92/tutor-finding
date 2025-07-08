# API Setup Guide

## Current Issue
You're getting network errors because the API is trying to connect to `http://localhost:8000` but there's no backend server running.

## Solution Options

### Option 1: Set up a Backend Server (Recommended)

1. **Create a `.env.local` file** in your project root:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

2. **Set up a backend API server** (choose one):
   - **Django/FastAPI**: Python backend
   - **Express.js**: Node.js backend  
   - **Laravel**: PHP backend
   - **Spring Boot**: Java backend

3. **Ensure your backend has these endpoints**:
   ```
   POST /api/token - Login
   GET /api/users/users/me/ - Current user
   GET /api/teachers/teachers/profile - Teacher profile
   GET /api/teachers/teachers - All teachers
   GET /api/students/students - All students
   GET /api/messages/messages/inbox - Inbox messages
   GET /api/messages/messages/sent - Sent messages
   ```

### Option 2: Use a Mock API Service

1. **Create a `.env.local` file** in your project root:
   ```
   NEXT_PUBLIC_API_URL=https://jsonplaceholder.typicode.com
   ```

2. **Update your API endpoints** to work with the mock service

### Option 3: Disable API Calls Temporarily

The current code has error handling that will show helpful error messages instead of crashing.

## How to Create .env.local

1. In your project root directory, create a file named `.env.local`
2. Add the following content:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```
3. Restart your development server

## Testing the Setup

After setting up your backend server:

1. Start your backend server on port 8000
2. Start your Next.js development server
3. Check the browser console for API request logs
4. The network errors should be resolved

## Current Error Handling

The API now includes:
- ✅ Request/response logging for debugging
- ✅ Better error messages
- ✅ Timeout configuration (10 seconds)
- ✅ Network error detection

## Next Steps

1. Choose one of the setup options above
2. Create the `.env.local` file
3. Set up your backend server
4. Test the API endpoints 