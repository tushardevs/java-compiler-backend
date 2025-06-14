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
  fs.writeFileSync('Main.java', code);

  const command = `
    docker run --rm -v "$PWD":/usr/src/myapp -w /usr/src/myapp openjdk \
    bash -c "javac Main.java && java Main"
  `;

  exec(command, (error, stdout, stderr) => {
    if (error) return res.json({ error: stderr });
    res.json({ output: stdout });
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
