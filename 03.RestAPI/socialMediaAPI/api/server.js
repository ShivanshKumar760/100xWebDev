import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
// const userRoute = require("./routes/users");
// const authRoute = require("./routes/auth");
// const postRoute = require("./routes/posts");

import authRoute from "./routes/auth.js";
import postRoute from "./routes/posts.js";
import  userRoute from "./routes/users.js";
import cloudinaryPkg from 'cloudinary';  // Default import for Cloudinary
import multer from "multer";
import cors from "cors";
import path from "path";
dotenv.config();
const app = express();
const { v2: cloudinary } = cloudinaryPkg;
const port=process.env.PORT||4000;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer(); 






//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(helmet());
app.use(morgan("common"));
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

// app.listen(8800, () => {
//   console.log("Backend server is running!");
// });

app.post('/api/upload', upload.single('file'), async (req, res) => {
    // Check if file is uploaded
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    console.log(req.file);  // Log the file information to debug

    try {
        // Convert the buffer to Base64 string (useful for binary data like images)
        const base64String = req.file.buffer.toString('base64');

        // Specify the folder where the file will be uploaded (e.g., "myFolder")
        const folder = 'public/images';  // Replace with your desired folder name

        // Upload the file as base64 string to Cloudinary, into a specific folder
        const result = await cloudinary.uploader.upload(
            `data:${req.file.mimetype};base64,${base64String}`,  // Base64-encoded data URI
            { 
                resource_type: "auto",  // Automatically detect the resource type (image, video, etc.)
                folder: folder          // Specify the folder where the file will be uploaded
            }
        );

        // Send the uploaded image URL as response
        res.send({ url: result.secure_url });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error uploading image: ' + error.message);
    }
});


mongoose.connect(process.env.MONGO_LOCAL)
.then(()=>{
    console.log("Connected to mongoDB");
}).then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running on :${port}`);
    })
}).catch((err)=>{console.log(err);console.log("Oops could not connect to db!try again")});