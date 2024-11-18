# Lottery Number Generator

A simple React application that generates lottery numbers with optional bonus ball and color-coded numbers.

## Quick Start

### 1. Install Dependencies
```bash
# Install all required packages
npm install

# Install dev dependencies for Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
```

### 2. Run the Application
```bash
# Start the development server
npm run dev
```

The application will be available at `http://localhost:3000`

## Features
- Generate random lottery numbers (1-49)
- Toggle bonus ball on/off
- Color-coded numbers:
  - 1-9: Grey
  - 10-19: Blue
  - 20-29: Pink
  - 30-39: Green
  - 40-49: Yellow
- View previous results

## Production Build
```bash
# Build the application
npm run build

# Start the production server
npm start
```