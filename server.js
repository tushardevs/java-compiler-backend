const express = require('express');
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/compile', (req, res) => {
  const code = req.body.code;
  const filePath = path.join(__dirname, 'Main.java');
  fs.writeFileSync(filePath, code);

  // Compile and run using system-installed Java
  const command = `javac Main.java && java Main`;

  exec(command, { cwd: __dirname }, (error, stdout, stderr) => {
    if (error) {
      return res.json({ error: stderr || 'Compilation or Runtime Error' });
    }
    res.json({ output: stdout });
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
