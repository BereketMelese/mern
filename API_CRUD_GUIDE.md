# API CRUD Operations & Data Fetching Integration

## Overview

Complete CRUD operations integrated with React Query for efficient data fetching, caching, and management. Form validation using Zod with real-time error feedback.

## API Endpoints

### Users

- `GET /users` - Fetch all users (protected)
- `GET /users/:id` - Fetch user by ID (protected)
- `PATCH /users/:id` - Update user profile (protected, own profile only)
- `DELETE /users/:id` - Delete user account (protected, own account only)

### Products

- `GET /products` - Fetch all products (public)
- `GET /products/:id` - Fetch product by ID (public)
- `POST /products` - Create new product (protected)
- `PATCH /products/:id` - Update product (protected, owner only)
- `DELETE /products/:id` - Delete product (protected, owner only)

### Auth (Existing)

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user

## Backend Implementation (@mern/api)

### CRUD Endpoints Details

**Users Routes** (`src/routes/users.ts`)

```typescript
// GET /users - List all users
// Returns array of User objects (without passwords)
// Requires: Valid JWT token

// GET /users/:id - Get single user
// Returns: User object (without password)
// Requires: Valid JWT token

// PATCH /users/:id - Update user
// Body: { name?: string, role?: string }
// Updates: name and/or role
// Requires: Valid JWT token, ownership or admin
// Returns: Updated User object

// DELETE /users/:id - Delete user account
// Deletes: User and all their products
// Requires: Valid JWT token, ownership
// Returns: Success message
```

**Products Routes** (`src/routes/products.ts`)

```typescript
// GET /products - List all products
// Returns: Array of Product objects
// Requires: None (public)

// GET /products/:id - Get single product
// Returns: Product object
// Requires: None (public)
// Errors: 404 if not found

// POST /products - Create product
// Body: { name, description?, price, category?, stock }
// Validation: name and price required
// Returns: Created Product object
// Requires: Valid JWT token
// Auto-sets: ownerId to authenticated user

// PATCH /products/:id - Update product
// Body: { name?, description?, price?, category?, stock? }
// Updates: Only provided fields
// Requires: Valid JWT token, product ownership
// Returns: Updated Product object
// Errors: 404 not found, 403 not owner

// DELETE /products/:id - Delete product
// Requires: Valid JWT token, product ownership
// Returns: Success message
// Errors: 404 not found, 403 not owner
```

## Frontend Implementation (@mern/web)

### React Query Setup

**QueryProvider** (`src/providers/QueryProvider.tsx`)

```typescript
// Wraps app with QueryClientProvider
// Configuration:
// - staleTime: 5 minutes
// - gcTime (cache): 10 minutes
// - Retry: 1 time on failure
// - refetchOnWindowFocus: disabled
```

### React Query Hooks (`src/hooks/useQueries.ts`)

**User Queries**

```typescript
// useFetchUsers()
// Fetches all users
// Returns: { data, isLoading, error }
// Query key: ["users"]

// useFetchUser(id: string)
// Fetches single user by ID
// Returns: { data, isLoading, error }
// Query key: ["users", id]
// Enabled: only when id provided

// useUpdateUser()
// Updates user profile
// Mutation: PATCH /users/:id
// OnSuccess: Invalidates user queries
// Returns: { mutateAsync, isPending, error }

// useDeleteUser()
// Deletes user account
// Mutation: DELETE /users/:id
// OnSuccess: Removes user from cache
// Returns: { mutateAsync, isPending, error }
```

**Product Queries**

```typescript
// useFetchProducts()
// Fetches all products
// Returns: { data, isLoading, error }
// Query key: ["products"]
// Used by: Products page, Dashboard

// useFetchProduct(id: string)
// Fetches single product by ID
// Returns: { data, isLoading, error }
// Query key: ["products", id]
// Enabled: only when id provided

// useCreateProduct()
// Creates new product
// Mutation: POST /products
// OnSuccess: Invalidates products list
// Returns: { mutateAsync, isPending, error }

// useUpdateProduct()
// Updates product
// Mutation: PATCH /products/:id
// OnSuccess: Updates cache and invalidates list
// Returns: { mutateAsync, isPending, error }

// useDeleteProduct()
// Deletes product
// Mutation: DELETE /products/:id
// OnSuccess: Removes from cache and invalidates list
// Returns: { mutateAsync, isPending, error }
```

### Form Validation with Zod

**Shared Validators** (`packages/shared/src/validators/index.ts`)

```typescript
// UserSchema - Validates User object structure
// ProductSchema - Validates Product object
// CreateProductSchema - Validates new product input
// UpdateProductSchema - Partial updates allowed
// AuthUserSchema - Validates auth user response

// Usage:
import { CreateProductSchema } from "@shared/utils";
const validatedData = CreateProductSchema.parse(formData);
```

### Pages & Components

**Products Page** (`src/pages/Products.tsx`)

Features:

- Display all products in grid layout
- Filter by category
- Show stock status
- Loading and error states
- Public page (no auth required)
- Links to product details
- Add to cart placeholder

States:

- Loading: "Loading products..."
- Error: "Failed to load products"
- Empty: "No products found"
- Success: Product grid with filters

**Dashboard Page** (`src/pages/Dashboard.tsx`)

Features:

- User list table (protected route)
- Product list with full details
- Add product form with validation
- Real-time error display
- Success feedback after add
- Loading states for all sections
- Separate error handling per section

Form Validation:

- Zod schema validation on submit
- Real-time error clearing on input
- Field-level error messages
- Submit error tracking

States:

- Loading: Skeleton/spinner
- Error: Red error boxes
- Success: Green success message
- Idle: Normal form display

**Header Component** (`src/components/Header.tsx`)

Updates:

- Added Products link (public)
- User info display when authenticated
- Logout button (only when authenticated)

## Data Flow

### Create Product Flow

```
User Input → Form Validation (Zod)
→ API Call (apiClient.post)
→ Auth Interceptor (add JWT)
→ Backend Validation
→ Database Save
→ React Query Cache Update
→ UI Update
→ Success Message
```

### Fetch Data Flow

```
Component Mount
→ React Query Hook
→ Check Cache (stale?)
→ API Call (if needed)
→ Auth Interceptor (add JWT)
→ Background Fetch
→ Cache Update
→ Component Re-render
```

### Error Handling Flow

```
API Error (500, 404, etc.)
→ Response Interceptor
→ Check 401 (unauthorized)
→ If 401: Clear token, redirect to login
→ If other: Display error message
→ Retry Logic (1 attempt)
→ Show UI error state
```

## Validation Rules

### CreateProductSchema

```typescript
- name: string, min 3 chars, required
- description: string, optional
- price: number, positive only
- category: string, optional
- stock: number, non-negative integer
```

### UpdateProductSchema

```typescript
- All fields from CreateProductSchema
- All fields optional (partial)
```

## Error Handling

**Client-Side**

- Zod validation errors (before submit)
- Network errors (timeout, connection)
- API validation errors (400, 422)
- Authorization errors (401, 403)
- Not found errors (404)

**Error Display**

- Field-level validation errors
- Form-level submit errors
- Toast/banner errors
- Auto-dismiss after 3 seconds
- Manual dismiss on input change

**Server-Side**

- Type validation (Zod if added)
- Authorization checks
- Ownership verification
- Business logic validation
- Database constraints

## Loading States

**Queries**

- `isLoading`: First fetch or refetch
- `isError`: Fetch failed
- `data`: Result cached/available

**Mutations**

- `isPending`: Request in progress
- `isError`: Request failed
- Form disabled during submit

## Caching Strategy

**Cache Times**

- Products: 5 minutes stale
- Users: 5 minutes stale
- Max cache: 10 minutes

**Invalidation**

- Create: Invalidate products list
- Update: Invalidate product + list
- Delete: Remove from cache + invalidate list

**Manual Triggers**

- Logout: Clear all queries
- Auth change: Refetch user queries

## API Client Integration

**Axios Interceptors**

Request:

- Add Authorization header with JWT
- Format: `Authorization: Bearer {token}`

Response:

- Check for 401 (unauthorized)
- If 401: Clear token, redirect to login
- Preserve other errors for component handling

## Testing Endpoints

### Manual Testing

**Create Product (requires login)**

```bash
curl -X POST http://localhost:4000/products \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Widget",
    "description": "A cool widget",
    "price": 29.99,
    "category": "Electronics",
    "stock": 100
  }'
```

**Get Products (public)**

```bash
curl http://localhost:4000/products
```

**Update Product (owner only)**

```bash
curl -X PATCH http://localhost:4000/products/{id} \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{ "stock": 50 }'
```

**Delete Product (owner only)**

```bash
curl -X DELETE http://localhost:4000/products/{id} \
  -H "Authorization: Bearer {token}"
```

## Performance Considerations

1. **Query Caching**: Reduces API calls for frequently accessed data
2. **Stale While Revalidate**: Shows cached data while fetching fresh
3. **Retry Logic**: Handles transient network failures
4. **Error Boundaries**: Prevents entire app crash on errors
5. **Loading States**: Better UX with clear feedback
6. **Validation**: Client-side catches errors before API call

## Next Steps

1. **Pagination**: Add limit/offset to product/user lists
2. **Search**: Implement product search functionality
3. **Sorting**: Add sort options (price, name, date)
4. **Filtering**: Advanced filters by category, price range
5. **Optimistic Updates**: Update UI before server confirmation
6. **Offline Support**: Cache data for offline access
7. **Real-time**: WebSocket updates for live data
8. **File Uploads**: Product images with multipart form
