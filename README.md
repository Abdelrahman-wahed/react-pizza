# React Pizza

A modern React pizza ordering application that allows users to browse a menu, create orders, and track delivery status.

## Features

- 🍕 Browse pizza menu with real-time updates
- 🛒 Shopping cart with quantity management
- 📝 Order creation with address lookup
- 🚚 Order tracking and status updates
- 👤 User management with persistent state

## Tech Stack

- React 18 with Vite
- Redux Toolkit for state management
- React Router for navigation
- Formik + Yup for form validation
- Tailwind CSS for styling
- Material UI components
- Axios for API integration

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── features/      # Feature-based modules
│   ├── cart/     # Shopping cart functionality
│   ├── menu/     # Menu display and management
│   ├── order/    # Order creation and tracking
│   └── user/     # User management
├── services/     # API integrations
├── ui/          # Shared UI components
└── utils/       # Helper functions
```

## API Integration

The app integrates with the React Fast Pizza API:
- Base URL: https://react-fast-pizza-api.onrender.com/api
- Endpoints for menu, orders, and address lookup

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Key Features Implementation

- **Cart Management**: Redux-based cart with persistent state
- **Order Processing**: Form handling with Formik and Yup validation
- **Geolocation**: Address lookup with browser geolocation API
- **Real-time Updates**: Order status tracking and updates

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
