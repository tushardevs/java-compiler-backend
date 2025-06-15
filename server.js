const express = require("express");
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const JAVA_FILE = "Main.java";
const CLASS_NAME = "Main";

app.use(cors());
app.use(express.json());

app.post("/run-java", (req, res) => {
  const code = req.body.code;
  const filePath = path.join(__dirname, JAVA_FILE);

  if (!code) {
    return res.status(400).json({ output: "❌ Error: No code provided." });
  }

  try {
    fs.writeFileSync(filePath, code);
  } catch (err) {
    return res.status(500).json({ output: "❌ File write error: " + err.message });
  }

  const compileCmd = `javac ${JAVA_FILE}`;
  const runCmd = `java -cp . ${CLASS_NAME}`;
  const fullCmd = `${compileCmd} && ${runCmd}`;

  exec(fullCmd, { cwd: __dirname, timeout: 5000 }, (err, stdout, stderr) => {
    if (err) {
      console.error("⚠️ Error:", stderr || err.message);
      return res.status(400).json({ output: stderr || err.message });
    }

    res.json({ output: stdout });
  });
});

app.get("/", (req, res) => {
  res.send("Java IDE Backend is running ✅");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
