# JAMB Quiz App

The JAMB Quiz App is a mobile application built with React Native and Expo for the frontend, and MongoDB with Node.js for the backend. It provides an interactive quiz experience for JAMB (Joint Admissions and Matriculation Board) subjects.

## Features

- Create, retrieve, update, and delete JAMB subjects, questions, and answers via the backend branch (`backend`).
- Secure user authentication and authorization using JSON Web Tokens (JWT) implemented with Nest.js and MongoDB in the `jamb-auth` branch.
- Mobile app frontend built with React Native and Expo available on the `main` branch.

## How to Run

To run the different parts of the JAMB Quiz App project, follow the instructions below:

### Backend Branch (`backend`)

1. Clone the repository:
   git clone https://github.com/AP-DAVID/Jamb-quiz-app.git
   
2. Switch to the `backend` branch:

cd Jamb-quiz-app, then 
git checkout backend

3. Install the dependencies: npm install
   
4. Set up a MongoDB database and configure the connection in the `.env` file.

5. Start the server: npm run dev

### JAMB Authentication Branch (`jamb-auth`)

1. Clone the repository (if not already done): git clone https://github.com/AP-DAVID/Jamb-quiz-app.git
2. Switch to the `jamb-auth` branch:

cd Jamb-quiz-App, then 
git checkout jamb-auth

3. Install the dependencies: npm install 
4. Set up a MongoDB database and configure the connection in the `.env` file.

5. Start the server: npm run dev

### React Native Frontend (`main`)

1. Clone the repository (if not already done): git clone https://github.com/AP-DAVID/Jamb-quiz-app.git
2. Install the dependencies: cd Jamb-quiz-app, then
expo install
3. Make sure you have the necessary tools set up for React Native development.

4. Start the Expo development server: expo start
5. Follow the instructions in the console to open the app on a connected device or emulator.

Please note that additional configuration steps might be required depending on your development environment.

Feel free to explore the respective branches for more details on each component of the JAMB Quiz App project.


















