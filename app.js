const express = require("express");
const cors = require("cors");
const routes = require("./routes/calculate");

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3344;

app.use("/", routes.postRoute);

app.get("", (req, res) => {
  res.send("plz provide valid expression");
});

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
