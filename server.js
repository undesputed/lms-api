require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: ["http://localhost:3000", "http://18.141.160.31"],
};

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to LMS application." });
});

require("./app/routes/department.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/subCategory.routes")(app);
require("./app/routes/category.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/requestFormLabTest.routes")(app);
require("./app/routes/requestForm.routes")(app);
require("./app/routes/receptionistNotification.routes")(app);
require("./app/routes/basicInfo.routes")(app);
require("./app/routes/payment.routes")(app);

const PORT = process.env.PORT || 1211;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
