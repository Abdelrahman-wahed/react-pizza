# React Pizza - AI Agent Instructions

## Project Overview
This is a React pizza ordering application built with modern React practices. The app allows users to browse a menu, create orders, and track their delivery status.

## Architecture

### Core Technologies
- React 18 with Vite
- Redux Toolkit for state management
- React Router for navigation
- Formik + Yup for form handling
- Tailwind CSS for styling
- Material UI components
- External API integration via Axios

### Project Structure
```
src/
├── features/      # Feature-based organization (cart, menu, order, user)
├── services/      # API and external service integrations
├── ui/           # Shared UI components
└── utils/        # Helper functions and utilities
```

### Key Patterns

1. **Feature-First Organization**
   - Each feature (cart, menu, order, user) contains all related components and logic
   - Redux slice files (`*Slice.js`) contain feature-specific state management
   - Example: See `src/features/cart/` for reference implementation

2. **State Management**
   - Redux store configuration in `src/Store.jsx`
   - Features manage state through Redux slices (see `cartSlice.js`, `orderSlice.js`)
   - Local UI state uses React hooks where appropriate

3. **API Integration**
   - External API calls centralized in `services/apiRestaurant.js`
   - Base API URL: https://react-fast-pizza-api.onrender.com/api
   - Error handling pattern includes custom error messages and loading states

## Development Workflow

### Setup
```bash
npm install
npm run dev  # Start development server
```

### Available Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Common Tasks

1. **Adding a New Feature**
   - Create new directory in `src/features/`
   - Add Redux slice if state management needed
   - Register slice in `src/Store.jsx`
   - Add route in main app router if needed

2. **API Integration**
   - Add new API methods to `services/apiRestaurant.js`
   - Follow existing error handling pattern with custom messages
   - Use loading states for better UX

3. **Form Implementation**
   - Use Formik for form handling
   - Add Yup validation schema
   - See `features/order/CreateOrder.jsx` as reference

## Best Practices

1. **Error Handling**
   ```javascript
   if (!res.ok) throw Error("Custom error message");
   ```

2. **State Updates**
   - Use Redux for cross-component state
   - Use local state for UI-specific concerns
   - Follow immutable update patterns in reducers

3. **Component Organization**
   - UI components in `src/ui/`
   - Feature-specific components within feature directories
   - Shared utilities in `src/utils/`

4. **API Calls**
   - Handle loading states
   - Implement error boundaries
   - Use consistent response handling pattern

## Common Pitfalls
- Remember to register new slices in `Store.jsx`
- Handle loading and error states for API calls
- Follow existing folder structure for new features
- Use Material UI components consistently