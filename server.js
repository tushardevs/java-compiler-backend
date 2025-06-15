const express = require("express");
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/run-java", (req, res) => {
  const code = req.body.code;
  const javaFile = "Main.java";

  fs.writeFileSync(javaFile, code);

  const compileAndRunCmd = 'javac Main.java && java Main';

  exec(compileAndRunCmd, { timeout: 5000 }, (err, stdout, stderr) => {
    if (err) {
      res.json({ output: stderr || err.message });
    } else {
      res.json({ output: stdout });
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
