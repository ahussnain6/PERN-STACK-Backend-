require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const userrouter = require("./routes/userroutes");
const custrouter = require("./routes/productroute");
const corsOptions = {
  origin: "*",
  methods: "GET, POST, PUT, DELETE, PATCH",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/user", userrouter);
app.use("/customer",custrouter);
app.get("/", (req, res) => {
 return res.status(200).send("Home");
})
app.listen(PORT, () => {
  console.log(`PORT is running at ${PORT}`);
})
