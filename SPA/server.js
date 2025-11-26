const express = require('express');
const path = require('path');
const app = express();

// Azure'un verdiği portu kullan
const port = process.env.PORT || 8080;

// React 'build' klasöründeki statik dosyaları sun
app.use(express.static(path.join(__dirname, 'build')));

// Diğer tüm istekleri React'in index.html'ine yönlendir (SPA için şart)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatılıyor...`);
});