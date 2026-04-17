# JWT Authentication Implementation Guide

## Overview

This MERN monorepo now includes complete JWT authentication with bcrypt password hashing, secure token management, and protected routes.

## Architecture

### Shared Types (@shared/utils)
```typescript
interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  role: "admin" | "user" | "guest";
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

interface AuthResponse {
  user: AuthUser;
  token: string;
}
```

## Backend Implementation (@mern/api)

### Auth Middleware (`src/middleware/auth.ts`)
- `verifyToken`: Express middleware that validates JWT tokens
- `generateToken`: Creates JWT tokens with 24-hour expiration
- `AuthRequest`: Extended Express Request with userId

### Auth Routes (`src/routes/auth.ts`)

**POST /auth/register**
- Creates new user account
- Validates input (email, password, name required)
- Hashes password with bcrypt
- Returns JWT token and user data

**POST /auth/login**
- Authenticates user with email and password
- Validates password against bcrypt hash
- Returns JWT token on success
- Returns 401 on invalid credentials

**POST /auth/logout**
- Handles logout (token removal happens client-side)

### Protected Routes
- `GET /users` - Requires authentication
- `POST /products` - Requires authentication (auto-assigns ownerId)

### Database Schema Update
- Added `password: String` field to User model
- Migration: `20260505233706_add_password_to_users`

## Frontend Implementation (@mern/web)

### Auth Context (`src/context/AuthContext.tsx`)
- Manages global authentication state
- Provides `useAuth()` hook for consuming components
- Methods: `login()`, `register()`, `logout()`
- Stores token in `sessionStorage`

### API Client (`src/utils/apiClient.ts`)
- Axios instance with base URL configuration
- Request interceptor: Automatically adds token to all requests
  ```
  Authorization: Bearer {token}
  ```
- Response interceptor: Redirects to /login on 401 (unauthorized)

### Protected Route Component (`src/components/ProtectedRoute.tsx`)
- Wraps routes that require authentication
- Shows loading state while checking auth
- Redirects unauthenticated users to /login

### Auth Pages

**Login Page** (`src/pages/Login.tsx`)
- Email and password inputs
- Error handling and feedback
- Loading state during submission
- Link to register page

**Register Page** (`src/pages/Register.tsx`)
- Email, password, confirm password, name inputs
- Password validation (min 6 characters)
- Password match verification
- Error handling and feedback
- Link to login page

### Updated Components

**Header** (`src/components/Header.tsx`)
- Shows user email/name when authenticated
- Logout button for authenticated users
- Login button for unauthenticated users
- Dashboard link only visible when authenticated

**Home** (`src/pages/Home.tsx`)
- Updated CTA to "Get Started" -> Register when not authenticated
- Shows registration link

**Dashboard** (`src/pages/Dashboard.tsx`)
- Uses `apiClient` instead of raw axios
- Protected route ensures only authenticated users access

## Usage Flow

### Registration
1. User clicks "Get Started" on home page
2. Navigates to `/register`
3. Enters email, password, name
4. Form validates and submits to POST /auth/register
5. Token stored in sessionStorage
6. User automatically logged in and redirected to /dashboard

### Login
1. User clicks "Login" in header or navigates to `/login`
2. Enters email and password
3. Form submits to POST /auth/login
4. Token stored in sessionStorage
5. User redirected to /dashboard

### Protected Access
1. Dashboard route is wrapped with `<ProtectedRoute>`
2. Check if token exists in sessionStorage
3. If no token, redirect to /login
4. If token exists, render Dashboard
5. API requests automatically include token in Authorization header

### Logout
1. User clicks "Logout" in header
2. API call to POST /auth/logout
3. Token removed from sessionStorage
4. User state cleared
5. Redirect to /login

## Environment Variables

For production, add to `.env`:
```
JWT_SECRET=your-long-random-secret-key
```

Default in development: `"your-secret-key-change-in-production"`

## Security Features

- ✅ Passwords hashed with bcrypt (salt rounds: 10)
- ✅ JWT tokens with 24-hour expiration
- ✅ Token stored in sessionStorage (cleared on tab close)
- ✅ Automatic token injection on all API requests
- ✅ Automatic 401 handling and redirect to login
- ✅ Protected routes prevent unauthorized access
- ✅ Password validation on client and server

## Testing

### Register a New User
```bash
curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

### Login
```bash
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Access Protected Route
```bash
curl -X GET http://localhost:4000/users \
  -H "Authorization: Bearer {token}"
```

## Next Steps

1. **Deploy**: Move JWT_SECRET to production environment
2. **Token Refresh**: Implement refresh token rotation
3. **Email Verification**: Add email confirmation on registration
4. **Password Reset**: Implement forgot password flow
5. **Rate Limiting**: Add rate limiting to auth endpoints
6. **Audit Logging**: Log all auth events for security
7. **Social Login**: Add OAuth providers (Google, GitHub, etc.)

## File Structure

```
apps/
  api/
    src/
      middleware/auth.ts          # JWT middleware
      routes/auth.ts              # Auth endpoints
      routes/users.ts             # Updated with auth
      routes/products.ts          # Updated with auth
    prisma/
      schema.prisma               # Updated with password field
      migrations/                 # Contains add_password migration
  web/
    src/
      context/AuthContext.tsx     # Auth state management
      utils/apiClient.ts          # Axios with interceptors
      components/
        ProtectedRoute.tsx         # Route protection component
        Header.tsx                 # Updated with auth UI
      pages/
        Login.tsx                  # Login page
        Register.tsx               # Register page
        Home.tsx                   # Updated CTA
        Dashboard.tsx              # Uses apiClient
        About.tsx                  # Updated docs
packages/
  shared/
    src/
      types/index.ts              # Auth types added
```

## Troubleshooting

### "Invalid token" on protected routes
- Check token is valid in sessionStorage
- Verify API is using verifyToken middleware
- Check JWT_SECRET matches on API

### 401 Unauthorized redirect
- Session may have expired (24-hour token)
- Re-login required
- Check API response interceptor

### CORS errors on auth requests
- API running on port 4000
- Web running on port 5173
- Ensure API is started first

