require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
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
require("./app/routes/requestFormLabTest")(app);
require("./app/routes/requestForm")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
