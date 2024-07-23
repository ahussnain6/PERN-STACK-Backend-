const express = require("express");
const { Booking,deleteBookings,getBook } = require("../controller/Booking");
const router = express.Router();
router.route("/booking").post(Booking);
router.route("/booking/:id").delete(deleteBookings);
router.route("/getbooking/:email").get(getBook);
module.exports = router;