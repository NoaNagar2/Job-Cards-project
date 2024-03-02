import { Router } from "express";
import multer from "multer";
import path from "path";

const router = Router();

// apload file
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Set a file size limit if needed
}).single("myCV");

router.post("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    upload(req, res, (err) => {
      if (err) {
        console.error(err);
        res.send("Error uploading file.");
      } else {
        if (req.body == undefined) {
          res.send("No file selected.");
        } else {
          res.send("File uploaded successfully.");
        }
      }
    });
  } catch (e) {
    next(e);
  }
});

// get file by userId
router.get("/:id", (req, res, next) => {
  try {
    const id = req.params;
  } catch (e) {
    next(e);
  }
});

export { router as cvRouter };
