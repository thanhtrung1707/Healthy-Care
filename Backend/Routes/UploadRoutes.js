import express from "express";
import asyncHandler from "express-async-handler";
import cloudinary from "cloudinary";
import { protect, admin } from "../Middleware/AuthMiddleware.js";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();
const uploadRouter = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const uploadImage = async (req, res) => {
    try {
        const { file } = req.files;
        if (!file) {
            return res.status(400).json({ msg: "No files were uploaded." });
        }

        if (file.size > 1024 * 1024) {
            removeTmp(file.tempFilePath);
            return res.status(400).json({ msg: "Size too large." });
        }

        if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
            removeTmp(file.tempFilePath);
            return res.status(400).json({ msg: "File format is incorrect." });
        }

        // Bắt lỗi ở đây
        const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
            folder: "ShoeShop",
        });

        removeTmp(file.tempFilePath);
        res.json({
            public_id: result.public_id,
            url: result.secure_url,
        });
    } catch (err) {
        console.error("Error uploading image:", err);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

const deleteImage = async (req, res) => {
    try {
        const { public_id } = req.body;
        if (!public_id) {
            return res.status(400).json({ msg: "No images selected" });
        }

        // Bắt lỗi ở đây
        const result = await cloudinary.v2.uploader.destroy(public_id);

        if (result.result !== "ok") {
            return res.status(500).json({ msg: "Failed to delete image" });
        }

        res.json({ msg: "Deleted Image" });
    } catch (err) {
        console.error("Error deleting image:", err);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

const removeTmp = (path) => {
    fs.unlink(path, (err) => {
        if (err) {
            console.error("Error removing temporary file:", err);
        }
    });
};

uploadRouter.post("/", protect, admin, asyncHandler(uploadImage));
uploadRouter.post("/destroy", protect, admin, asyncHandler(deleteImage));

export default uploadRouter;
