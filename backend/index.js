const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.post('/api/clickup', async (req, res) => {
    try {
        const response = await axios({
            method: req.body.method || 'GET',
            url: req.body.url,
            headers: {
                'Authorization': `Bearer ${process.env.CLICKUP_API_KEY}`,
                ...req.body.headers,
            },
            data: req.body.data,
        });
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});