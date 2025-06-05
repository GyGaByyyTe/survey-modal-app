# Survey Modal Application

A React application that displays a survey in a modal window, with multistep form validation and responsive design.

### Demo

You can see the working project here: [Demo Survey Modal Application](https://andrei.does.cool/apps/form/)

### Technologies Used

- React with TypeScript
- Webpack 5 for bundling
- Babel for transpilation
- CSS Modules for styling

### Setup and Installation

1. Clone the repository:

   ```
   git clone https://github.com/GyGaByyyTe/survey-modal-app.git survey-modal-app
   cd survey-modal-app
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   npm start
   ```

4. Build for production:
   ```
   npm run build
   ```

### Development

- The application uses Webpack Dev Server with Hot Module Replacement for development.
- CSS Modules are used for component styling to avoid style conflicts.
- TypeScript is configured for type checking.
- Prettier is configured with default settings for code formatting.

### Features

- Modal window with a survey form
- Multistep form with validation
- Responsive design for mobile and desktop
- Different form control types (select, checkbox, radio, textarea, text)
- Form validation with error messages
- Confirmation dialog when closing the form with unsaved changes