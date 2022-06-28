
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use(cors({
    origin: 'http://localhost:3000', //アクセス許可するオリジン
    credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
    optionsSuccessStatus: 200 //レスポンスstatusを200に設定
}))

app.get("/map", (req, res) => {
  console.log(req)
  const data = {"location":[
    { lat: 51.506, lng:-0.06 },
    { lat: 51.507, lng:-0.06 },
    { lat: 51.508, lng:-0.06 },
    { lat: 51.509, lng:-0.06 },
    { lat: 51.510, lng:-0.06 },
    { lat: 51.511, lng:-0.06 },
    { lat: 51.512, lng:-0.06 },
    { lat: 51.513, lng:-0.06 }
  ]}
  res.json(data);
  // res.json({ lat: 51.506, lng:-0.06 });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'../frontend/build/index.html'));
});

app.listen(port, () => {
  console.log(`listening on *:${port}`);
})