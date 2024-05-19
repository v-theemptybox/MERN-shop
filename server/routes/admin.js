const express = require("express");
const adminController = require("../controller/admin");
const upload = require("../middleware/multerUpload");

const router = express.Router();

// Get orders
router.get("/getOrders", adminController.getOrders);

// Get reports
router.get("/getReports", adminController.getReports);

// Get products
router.get("/getProducts", adminController.getProducts);

// Create a product
router.post(
  "/postProduct",
  upload.array("uploadedImages", 4),
  adminController.postProduct
);

module.exports = router;
