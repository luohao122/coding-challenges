# vue3-token-swap

## About Swappy

Swappy is a Vue 3-based token swap management application that demonstrates modern web development practices using Vite, Tailwind CSS, Pinia, and json-server. It allows users to manage their token swaps and adjust global settings such as dark mode.

---

## About Me

I am an engineer with over 10 years of experience who loves coding, mentoring young developers, and sharing knowledge through my projects at codingwithhao.

---

## Project Setup

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Database Setup:**

   This app uses a local JSON database for simulating an API using json-server.
   
   - A sample file `db.example.json` is provided as a template.
   - Copy the file to the project root as `db.json`:
     
     ```sh
     cp db.example.json db.json
     ```

   - **Important:** You must run json-server **before** running the Vue app. Start the server with:

     ```sh
     npx json-server db.json
     ```

3. **Run Development Server:**

   ```sh
   npm run dev
   ```

---

## Building, Testing, and Linting

- **Build for Production:**

  ```sh
  npm run build
  ```

- **Run Unit Tests with Vitest:**

  ```sh
  npm run test:unit
  ```

- **Run End-to-End Tests with Cypress:**

  For development:
  ```sh
  npm run test:e2e:dev
  ```

  For production (recommended in CI):
  ```sh
  npm run build
  npm run test:e2e
  ```

- **Lint with ESLint:**

  ```sh
  npm run lint
  ```

---

## Libraries and Tools Used

- **Vue 3** – The framework for building the user interface.
- **Vite** – A fast build tool and development server.
- **Tailwind CSS** – Utility-first CSS framework for styling.
- **Pinia** – State management library for Vue 3.
- **json-server** – A fake REST API for rapid prototyping.
- **Cypress** – End-to-end testing framework.
- **Vitest** – Unit testing framework for Vue 3.

---

## Pinia Stores

- **tokenPrices:**  
  Manages the token prices data. It handles fetching the price of tokens from json-server.

- **settingsStore:**  
  Manages global application settings such as dark mode. The setting are used throughout the app to control UI themes.

---

## Additional Notes

- **Database:**  
  Ensure that you have a `db.json` file in the project root. Refer to the provided `db.example.json` for the structure. The app expects json-server to be running (`npx json-server db.json`) before launching the Vue application.

