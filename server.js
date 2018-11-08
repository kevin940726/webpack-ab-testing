const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();

const indexA = fs.readFileSync("./dist/index.a.html");
const indexB = fs.readFileSync("./dist/index.b.html");

app.use(express.static("dist"));

app.get("*", function(req, res) {
  const variant = Math.random() > 0.5 ? "b" : "a";

  if (variant === "a") {
    res.sendFile(path.resolve(process.cwd(), "./dist/index.a.html"));
  } else if (variant === "b") {
    res.sendFile(path.resolve(process.cwd(), "./dist/index.b.html"));
  }
});

app.listen(5000, function() {
  console.log("Example app listening on port 5000!");
});
