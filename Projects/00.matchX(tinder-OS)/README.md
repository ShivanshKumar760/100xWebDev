![MatchX Logo](https://github.com/ShivanshKumar760/matchX/blob/master/client/src/images/app-readme.png)
# MatchX - Open Source Tinder-like Platform

MatchX is an open-source dating platform that mimics the core features of Tinder. Users can swipe right to express interest and left to reject. When two users swipe right on each other, they are matched and can start chatting. MatchX is built with modern technologies to provide a smooth and interactive user experience.

### Features:
- **Swipe to Match**: Users can swipe right to like someone and left to reject.
- **Match and Chat**: If both users swipe right on each other, they are matched and can start chatting.
- **User Profiles**: Users can create and update their profiles with a photo, bio, and more.
- **Authentication**: JWT-based authentication for secure login and session management.


---

## Tech Stack:

- **Frontend**: React.js
  - UI built using React for dynamic and responsive interactions.
- **Backend**: Node.js with Express
  - Server-side logic and API for managing users, authentication, and messaging.
- **Database**: MongoDB with Mongoose
  - NoSQL database for storing user data, messages, and matches.
- **Authentication**: JSON Web Tokens (JWT)
  - For user authentication and maintaining secure sessions.

  
---

## Features and Functionality:

- **User Authentication**:
  - Users can sign up and log in using their email and password.
  - JWT is used to authenticate and authorize users.
  
- **Swipe Cards**:
  - Users are presented with profiles of other users to swipe left (reject) or right (like).
  
- **Matching**:
  - If both users swipe right on each other, a match is created, and they can chat.
  
- **Real-Time Messaging**:
  - After a match, users can message each other in real-time.

- **User Profile**:
  - Users can update their personal details, upload images, and provide a brief bio.

---

## Installation

### Prerequisites:

- **Node.js** (v14.x or higher)
- **MongoDB** (Local or a MongoDB Atlas account for cloud database)

---

## Frontend Setup:

1. Navigate to the `frontend` directory:
   ```bash
   cd client
2. Install dependencies:
   ```bash
   npm install or npm i or pnpm install
3. Run the React server:
   ```bash
   npm run dev or pnpm run dev

## Backend Setup:

1. Navigate to the `frontend` directory:
   ```bash
   cd server
2. Install dependencies:
   ```bash
   npm install or npm i or pnpm install
3. Populate the .env file for mongodb connection:
   ```bash
     MONGO_URI=<Your MongoDB URI>
    JWT_SECRET=<Your JWT Secret Key>
    PORT=8000
4. Run the express server:
   ```bash
   node index.js
