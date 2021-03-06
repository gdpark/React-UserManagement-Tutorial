const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();

const multer = require('multer');
const upload = multer({dest: './upload'})

// const multer = require('multer');
// const upload = multer({dist: './upload'});

app.use('/image', express.static('./upload'));
// 이미지 경로가 실제 서버의 upload 폴더와 매핑이 된다.

app.post('/api/customers',upload.single('image'), (req,res)=>{
    let sql = 'INSERT INTO customer VALUES (0,?,?,?,?,?,now(),null,0)';
    let image = '/image/'+req.file.filename;
    // multer 가 알아서 이름을 정해줌.
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;

    let params = [image, name, birthday, gender, job];

    console.log("run query");

    connection.query(sql,params, (err,rows,fields) =>{
        res.send(rows);
        if(err){
            console.log(err);
        }
        
    });

});

app.get('/api/customers', (req, res) => {
    connection.query(
        "SELECT * FROM CUSTOMER where isDeleted = 0",
        (err, rows, fields) => {
            res.send(rows);

            console.log("Reload List Query: ");

        }
    )
});

app.delete('/api/customers/:id',(req,res) => {
    let sql = 'UPDATE CUSTOMER SET isDeleted  = 1 WHERE  id = ?';
    let params = [req.params.id];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
            console.log("Delete List Query: "+err);
        })
});

app.listen(port, () => console.log(`Listening on port ${port}`));




/*

app.get('/api/customers', (req, res) => {
    res.send([
        {
            'id': 1,
            'image': 'https://placeimg.com/64/64/1',
            'name': '홍길동',
            'birthday': '961222',
            'gender': '남자',
            'job': '대학생'
        },
        {
            'id': 2,
            'image': 'https://placeimg.com/64/64/2',
            'name': '나동빈',
            'birthday': '960508',
            'gender': '남자',
            'job': '프로그래머'
        },
        {
            'id': 3,
            'image': 'https://placeimg.com/64/64/3',
            'name': '이순신',
            'birthday': '961127',
            'gender': '남자',
            'job': '디자이너'
        }
    ]);
});
*/