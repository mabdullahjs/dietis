const express = require("express");
const { qrcodeGenterator, scanQRCode } = require("../controllers/qrcode");
const router = express.Router();

router.route("/qr/generate").post(qrcodeGenterator);
router.route("/qr/scan").post(scanQRCode);

module.exports = router;