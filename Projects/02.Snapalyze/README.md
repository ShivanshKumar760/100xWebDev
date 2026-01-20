![Snapalyzer Logo](https://github.com/ShivanshKumar760/Snapalyze/blob/master/Snapalyzer.png)
# Snapalyzer: Image-based Question Answering with GPT

**Snapalyzer** is a web application that leverages the power of GPT models to answer questions about images. Upload an image, ask your questions, and receive insightful and informative answers.

**Key Features:**

* **Image Upload:** Easily upload images from your device.
* **GPT-powered Analysis:** Utilizes advanced GPT models to understand and interpret image content.
* **Question Answering:** Ask a wide range of questions about the image, such as:
    * "Describe the image."
    * "What objects are present in the image?"
    * "What colors are dominant in the image?"
    * "What is the mood or atmosphere of the image?"
* **User-friendly Interface:** Intuitive and easy-to-use interface for seamless interaction.

**Technology Stack:**

* **Frontend:** React.js 
* **Backend:** Node.js, Express.js
* **Cloud Storage:** Cloudinary for secure and efficient image storage.
* **GPT Integration:** Seamless integration with a chosen GPT model (e.g., OpenAI's GPT-3, Google's Bard).

**Getting Started:**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ShivanshKumar760/Snapalyze.git
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
      GPT_API=YPUR_API_KEY
      PORT=3000
      CLOUDINARY_CLOUD_NAME=YOUR_CLOUD_NAME
      CLOUDINARY_API_KEY=YOUR_API_KEY
      CLOUDINARY_API_SECRET=YOUR_API_SECRET
4. Run the express server:
   ```bash
   node server.js
