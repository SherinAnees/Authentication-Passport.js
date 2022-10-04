const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
//Routes
app.use("/", require("./routes/index"));
app.use("/user", require("./routes/user"));
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
