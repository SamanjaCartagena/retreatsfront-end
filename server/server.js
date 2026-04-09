require('dotenv').config();
const express = require('express');
const path = require('path');
const app= express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'wanderlust-retreat-globe/dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'wanderlust-retreat-globe/dist', 'index.html'));
});
const cors = require('cors');

app.use(cors());



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 


