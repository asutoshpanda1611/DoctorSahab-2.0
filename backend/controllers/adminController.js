import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";

// API for admin doctor
const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
    const imageFile = req.file;

    // Checking for all required data
    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.json({
        success: false,
        message: "Missing Details"
      });
    }

    // Validating email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email address"
      });
    }

    // Validating password strength
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password"
      });
    }

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Uploading image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
    const imageUrl = imageUpload.secure_url;

    // Constructing the doctor data object
    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword, // Fixed typo here
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now()
    };

    // Creating a new doctor instance and saving to MongoDB
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    // Sending a success response
    return res.json({
      success: true,
      message: "Doctor Added"
    });

  } catch (error) {
    console.error(error);

    // Sending an error response back to the client
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export { addDoctor };
