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

  if (!code) {
    return res.status(400).json({ output: "Error: No code provided." });
  }

  // Define file paths
  const filePath = path.join(__dirname, "Main.java");

  // Save the Java code to Main.java
  try {
    fs.writeFileSync(filePath, code);
  } catch (err) {
    return res.status(500).json({ output: "File write error: " + err.message });
  }

  // Compile and run the Java code
  const compileAndRun = "javac Main.java && java Main";

  exec(compileAndRun, { timeout: 5000 }, (err, stdout, stderr) => {
    if (err) {
      console.error("Compilation/Execution error:", stderr || err.message);
      return res.json({ output: stderr || err.message });
    }

    res.json({ output: stdout });
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
