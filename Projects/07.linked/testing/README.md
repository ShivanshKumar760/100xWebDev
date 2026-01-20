
![Linked Logo](https://github.com/ShivanshKumar760/linked/blob/master/client/src/images/logoDark.png)


# **Linked**

Linked is a social networking platform that allows users to connect, follow/unfollow friends, and share images and videos. Built with a modern tech stack, Linked provides real-time communication and a secure, user-friendly experience.

## **Features**
- **Follow/Unfollow System**: Users can follow or unfollow friends to personalize their network.
- **Media Sharing**: Post and manage images and videos efficiently with cloud storage.
- **Real-Time Communication**: Seamless real-time updates using **Socket.IO**.
- **Secure Authentication**: User accounts are protected with **JWT (JSON Web Tokens)** for secure session management.
- **Modern UI**: Designed with **React.js** and styled using **TailwindCSS** for responsiveness and elegance.
- **Optimized Performance**: Improved page load speeds by 30% for enhanced user experience and retention.

---

## **Tech Stack**
### **Frontend**
- **React.js**: For building dynamic and responsive user interfaces.
- **TailwindCSS**: For modern, responsive styling.

### **Backend**
- **Express.js**: RESTful API server for managing backend logic.
- **Socket.IO**: Enables real-time communication features.
- **Cloudinary SDK**: For efficient media storage and management.
- **JWT**: Secure user authentication and session management.

### **Hosting and Deployment**
- **Frontend**: Deployed on **Netlify** for fast, secure, and scalable hosting.
- **Backend**: Hosted on **AWS EC2** with:
  - **Nginx** as a reverse proxy.
  - **Certbot** for SSL certificate configuration, ensuring secure communication.

---

## **Setup Instructions**
### **1. Prerequisites**
- Node.js and npm installed.
- MongoDB instance for user and post data storage.
- AWS EC2 instance or local server.

### **2. Clone the Repository**
```bash
git clone https://github.com/ShivanshKumar760/linked.git
cd linked
```

### **3. Install Dependencies**
- **Backend**:
  ```bash
  cd backend(server+socket)
  npm install
  ```
- **Frontend**:
  ```bash
  cd client
  pnpm install or npm install
  ```

### **4. Configure Environment Variables**
Create `.env` files in both the backend and frontend directories with the following:

**Backend `.env`:**
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=3000
MONGO_LOCAL=your_mongodb_connection_string
```

**Frontend `.env`:**
```env
VITE_PUBLIC_FOLDER=http://localhost:3000/images/
VITE_BACKEND_API=http://localhost:3000/api
```

### **5. Run the Application**
- **Backend**:
  ```bash
  cd backend(server+socket)
  node social.api.js
  ```
- **Frontend**:
  ```bash
  cd client
  npm start
  ```

---

## **Live Project**
- **Frontend**: [Visit Linked](https://linnked.netlify.app/)
- **GitHub Repository**: [Linked Code](https://github.com/ShivanshKumar760/linked.git)

---

## **Key Highlights**
- **Real-Time Communication**: Enabled using Socket.IO for seamless updates.
- **Cloud-Based Media Management**: Integrated with Cloudinary for efficient storage.
- **Secure Hosting**: Backend secured with SSL using Certbot on AWS EC2.

---

## **License**
This project is licensed under the MIT License.

---
