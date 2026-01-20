import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs";
import multer from "multer";
// import { v2 as cloudinary } from 'cloudinary';
import cloudinaryPkg from 'cloudinary';  // Default import for Cloudinary
import multerCloudinary from "multer-cloudinary";
import multerStorageCloudinary from 'multer-storage-cloudinary';  // Default import for multer-storage-cloudinary
import formidable from 'formidable'
dotenv.config();

const app=express();
const { v2: cloudinary } = cloudinaryPkg;
const openai=new OpenAI({apiKey:process.env.OPENAI_KEY});
const port=process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
const { CloudinaryStorage } = multerStorageCloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


// const storage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"./public");
//     },

//     filename:(req,file,cb)=>{
//         cb(null,Date.now()+"-"+file.originalname);
//     }
// });


// Set up multer storage for Cloudinary
// const storage = multerCloudinary({
//     cloudinary: cloudinary,
//     folder: "uploads", // Optional: specify the folder in Cloudinary
//     allowedFormats: ["jpg", "jpeg", "png", "gif"], // Allowed file formats
//     transformation: [
//       { width: 500, height: 500, crop: "limit" }, // Optional: Resize the image
//     ],
//   });


// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,  // Pass the configured cloudinary instance here
//     params: {
//       folder: "snapalyze_images",  // Folder name on Cloudinary (optional)
//       allowedFormats: ["jpg", "jpeg", "png", "gif"],  // Allowed file formats
//     },
//   });

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,  // Pass the configured cloudinary instance
    params: {
      folder: 'snapalyze_images',  // Cloudinary folder
      format: async (req, file) => {
        // Determine the file format based on MIME type
        const fileExtension = file.mimetype.split('/')[1];  // Get file extension from MIME type
        
        // Return 'jpg' for jpeg or jpg formats, otherwise png
        if (fileExtension === 'jpeg' || fileExtension === 'jpg') {
          return 'jpg';
        } else if (fileExtension === 'png') {
          return 'png';
        } else {
          return 'jpg';  // Default to 'jpg' if the file type is not recognized
        }
      },
      public_id: (req, file) => `computed-filename-${Date.now()}`,  // Generate unique public_id
    },
  });
  

const upload= multer({ storage: storage }).single("file");

// let filePath;
// app.post("/upload",(req,res)=>{
//     upload(req,res,(err)=>{
//         if(err)
//         {
//             res.status(500).json(err);
//         }
//         filePath=req.file.path;
//     });
// });


// Upload image to Cloudinary
// app.post("/upload",(req, res) => {
//     console.log("Upload request incoming");
//     upload(req, res, (err) => {//this upload function which is triggred by
//         //multer adds the req.file property to request object
//       if (err) {
//          console.log("Error")
//         return res.status(500).json(err);
//       }
//       // Return the Cloudinary URL
//       res.status(200).json({ imageUrl: req.file.secure_url });
//     });

//   });


// app.post('/upload', (req, res) => {
//     console.log(req);
//     const form = formidable({
//         // Define the upload directory where the files are temporarily stored
//         uploadDir: './public', //Make sure this directory exists
//         keepExtensions: true, // Keep the file extension
//         maxFileSize: 10 * 1024 * 1024, // Optional: Limit the file size to 10MB
//         filename: (name, ext) => Date.now() + ext, // Custom filename for uploaded files
//       });
//     form.parse(req, (err, fields, files) => {
//       if (err) {
//         return res.status(500).json({ error: 'Error parsing file.' });
//       }
//       console.log("Incoming file",files);
//       // Access the uploaded file
//       const file = files.file[0];  // Assuming the field name is 'file'
//       console.log("other",file);
//       const filePath = file.filepath;
//       console.log("file path is ",filePath);
  
//       // Upload the file to Cloudinary
//       cloudinary.uploader.upload(filePath, {timeout: 120000, folder: 'snapalyze_images' }, (error, result) => {
//         console.log(error);
//         if (error) {
//             console.log(error);
//           return res.status(500).json({ error: 'Error uploading to Cloudinary.' });
//         }
        
//         // Send the uploaded image URL back
//         res.status(200).json({ imageUrl: result.secure_url });
//       });
//     });
//   });
  


app.post("/upload", (req, res) => {
    // Create an instance of formidable form
    const form = formidable({
      multiples: true, // allow multiple files (if needed)
      keepExtensions: true, // keep file extensions
    });
  
    // Parse incoming request
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error("Error parsing the file:", err);
        return res.status(500).json({ error: "Error parsing file." });
      }
  
      // Get the file from the formidable result (files is an object with the field name as key)
      const file = files.file[0]; // Assuming the field name is 'file'
  
      if (!file) {
        return res.status(400).json({ error: "No file uploaded." });
      }
  
      // Create a read stream from the uploaded file
      const fileStream = fs.createReadStream(file.filepath);
  
      // Upload directly to Cloudinary using the stream
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "snapalyze_images", // specify the folder in Cloudinary
          resource_type: "auto", // Automatically detect the file type
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            return res.status(500).json({ error: "Error uploading to Cloudinary." });
          }
  
          // Send the Cloudinary image URL back as the response
          res.status(200).json({ imageUrl: result.secure_url });
        }
      );
  
      // Pipe the file stream to Cloudinary's upload stream
      fileStream.pipe(uploadStream); // This is the key fix
    });
  });
  
  


// app.post("/openai",async (req,res)=>{
//     try {
//         const prompt=req.body.message;
//         console.log("User Prompt is:",prompt);
//         const imageAsBase6=fs.readFileSync(filePath,"base64");
//         const response = await openai.chat.completions.create({
//             model: "gpt-4o-mini",
//             messages:[
//                 {
//                  role:"user",
//                  content:[
//                     {type:"text",text:prompt},
//                     {type:"image_url",image_url:{url:`data:image/jpeg;base64,${imageAsBase6}`}
//                 }
//             ]
    
//                 }
            
//             ]
//         });
    
//         console.log(response.choices[0].message);
//         res.send(response.choices[0].message.content);
//     } catch (error) {
//        console.log(error); 
//     }
// });



// OpenAI interaction route
app.post("/openai", async (req, res) => {
    try {
      const prompt = req.body.message;
      const imageUrl = req.body.imageUrl; // Get the image URL from the request body
  
      console.log("User Prompt is:", prompt);
  
      // Call OpenAI API with image URL
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              {
                type: "image_url",
                image_url: { url: imageUrl }, // Send the Cloudinary image URL to OpenAI
              },
            ],
          },
        ],
      });
  
      console.log(response.choices[0].message);
      res.send(response.choices[0].message.content);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  });


app.listen(port,()=>{
    console.log(`Server is running ${port}!`);
});