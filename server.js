const express = require('express');
const bodyParser = require('body-parser');
const app =express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/api/customers', (req, res) => {
    res.send([
        {
        'id':1,
        'image':'http://placeimg.com/64/64/1',
        'name': '가길동',
        'birthday': '2019-11-11',
        'gender': '남자',
        'job': '대학생1'
        },
        {
          'id':2,
          'image':'http://placeimg.com/64/64/2',
          'name': '나길동',
          'birthday': '2019-11-10',
          'gender': '여자',
          'job': '대학생2'
          },
          {
            'id':3,
            'image':'http://placeimg.com/64/64/3',
            'name': '다길동',
            'birthday': '2019-11-9',
            'gender': '남자',
            'job': '대학생3'
            }
      ]
    )
})

app.listen(port, () => console.log(`Listening on port ${port}`));