
//setting up cloudinary
import { v2 as cloudinary } from "cloudinary";

import { config } from "dotenv";

config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    cloud_secree: process.env.CLOUDINARY_API_SECRET,
    cloudinary_key: process.env.CLOUDINARY_API_KEY
});

export default cloudinary;