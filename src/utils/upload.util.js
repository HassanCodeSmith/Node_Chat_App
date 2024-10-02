/** ____ Core Modules ____ */
import multer from "multer";
import fs from "fs";
import path from "path";

/**
 * Storage
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define base directory
    const baseDir = "public/uploads";

    // Create base directory if it doesn't exist
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir, { recursive: true });
    }

    // Determine file type and set directory
    const fileExtention = path.extname(file.originalname).toLowerCase();
    let folder = "";

    if ([".jpg", ".jpeg", ".png"].includes(fileExtention)) {
      folder = "images";
    } else if ([".mp4", ".mov", ".avi"].includes(fileExtention)) {
      folder = "videos";
    } else {
      return cb(
        new ApiError(
          "Only JPG, JPEG, PNG images, and MP4, MOV, AVI video files are allowed!"
        ),
        false
      );
    }

    const dir = path.join(baseDir, folder);

    // Create directory for file type if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    cb(null, dir);
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtention = path.extname(file.originalname);
    cb(null, `${file.originalname}_${uniqueSuffix}${fileExtention}`);
  },
});

/**
 * File Filter
 */
const fileFilter = (req, file, cb) => {
  const extention = path.extname(file.originalname).toLowerCase();

  // Allow only specified image and video formats
  if (![".jpg", ".jpeg", ".png", ".mp4", ".mov", ".avi"].includes(extention)) {
    return cb(
      new ApiError(
        "Only JPG, JPEG, PNG images, and MP4, MOV, AVI video files are allowed!"
      ),
      false
    );
  }

  cb(null, true);
};

const upload = multer({ storage, fileFilter });

export { upload };
