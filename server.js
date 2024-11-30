const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(cors()); // 모든 출처에서의 요청 허용
app.use(bodyParser.json());

app.post('/save-coordinates', (req, res) => {
    const { lat, lng } = req.body;
    console.log('수신된 좌표:', lat, lng);

    // 좌표를 데이터베이스나 파일에 저장할 수 있는 로직 추가
    res.status(200).send('좌표 저장 완료');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
