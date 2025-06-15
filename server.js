const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const clientId = 'YOUR_CLIENT_ID';
const clientSecret = 'YOUR_CLIENT_SECRET';

app.post('/compile', async (req, res) => {
  try {
    const { code } = req.body;

    const response = await axios.post('https://api.jdoodle.com/v1/execute', {
      script: code,
      language: "java",
      versionIndex: "3",
      clientId,
      clientSecret
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to execute code' });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
