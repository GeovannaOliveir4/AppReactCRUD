const express = require("express");
const cors = require("cors");
const userController = require("./controllers/user")
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("teste de rota");
});

app.use("/", userController)

app.listen(8800, () => {
  console.log("Server is running on port 8800");
});
