const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

const dataStore = require('nedb');
const db = {};
db.user = new dataStore({ filename: '.data/user.json', autoload: true });
db.toko = new dataStore({ filename: '.data/toko.json', autoload: true });
const dummyData = {
  name: 'Warung enak',
  image: 'kosong',
  address: 'semarang kota',
  foods: [
    {
      name: 'soto',
      price: 5000,
      image: 'kosong',
      pilih: 'false'
    },
    {
      name: 'bakso',
      price: 500,
      image: 'ada',
      pilih: 'false'
    }
  ],
  _id: 'CPABT8KxSzzDgoaA'
};

const usEr = {
  name: 'mohammad saifoelloh noor',
  userName: 'saifoelloh',
  phone: '085868473809',
  email: 'saifoelloh@gmail.com',
  address: 'jl. majapahit 101, kimar 3, pandeanlamper, semarang',
  login: false,
  token: 'ladjf',
  order: []
};

app.get('/', (req, res) => {
  res.send('Database konek');
});

//================USERS=================

//=============SIGN UP===================

app.get('/api/user', (req, res) => {
  db.user.find({}, (err, done) => {
    if (err) {
      res.send(err);
    }
    res.send(done);
  });
});

app.post('/api/user', (req, res) => {
  const data = {
    name: req.body.name,
    userName: req.body.userName,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    login: false,
    token: 'skdssds',
    order: []
  };
  db.user.insert(data, (err, done) => {
    if (err) {
      res.send(err);
    }
    res.send(done);
  });
});

app.put('/api/user/:id', (req, res) => {
  const data = {
    name: req.body.name,
    userName: req.body.userName,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    login: false,
    token: 'skdssds',
    order: []
  };
  db.user.update({ _id: req.params.id }, data, {}, (err, done) => {
    if (err) {
      res.send('error input');
    }
    res.send('oke');
  });
});

app.delete('/api/user/:id', (req, res) => {
  db.user.remove({ _id: req.params.id }, {}, (err, done) => {
    if (err) {
      res.send('Error delete');
      return;
    }
    res.send('oke berhasil delete');
  });
});
//===============END SIGN UP==============

//==================LOGIN====================

//===============END LOGIN===================

//==============END USERS==============

//===============TOKO=======================

app.get('/api/restaurant', (req, res) => {
  db.toko.find({}, (err, done) => {
    if (err) {
      res.send('error ambil data');
      return;
    }
    res.send(done);
  });
});

app.get('/api/restaurant/:id', (req, res) => {
  db.toko.find({ _id: req.params.id }, (err, done) => {
    if (err) {
      res.send('error ambil data');
      return;
    }
    res.send(done);
  });
});

app.post('/api/restaurant', (req, res) => {
  const data = {
    name: req.body.name,
    image: req.body.image,
    address: req.body.address,
    foods: []
  };
  db.toko.insert(data, (err, done) => {
    if (err) {
      res.send('Error Post');
      return;
    }
    res.send(done);
  });
});

app.put('/api/restaurant/:name', (req, res) => {
  const data = {
    name: req.body.name,
    image: req.body.image,
    address: req.body.address
  };
  db.toko.update({ name: req.params.name }, data, {}, (err, done) => {
    if (err) {
      res.send('Error Put');
      return;
    }
    res.send('oke berhasil');
  });
});

app.delete('/api/restaurant/:id', (req, res) => {
  db.toko.remove({ _id: req.params.id }, {}, (err, done) => {
    if (err) {
      res.send('Error delete');
      return;
    }
    res.send('oke berhasil delete');
  });
});

//===============END TOKO=======================

//===============makanan=======================
//search by foods name
app.get('/api/restaurant/:name', (req, res) => {
  db.toko.find(
    { foods: { $elemMatch: { name: req.params.name } } },
    (err, done) => {
      if (err) {
        res.send('error ambil data');
        return;
      }
      res.send(done);
    }
  );
});

app.post('/api/restaurant/:id/foods', (req, res) => {
  console.log(req.body);
  const data = {
    name: req.body.name,
    price: req.body.price,
    image: req.body.image
  };
  db.toko.update(
    { _id: req.params.id },
    { $push: { foods: data } },
    (err, done) => {
      if (err) {
        res.send('Error Post');
        return;
      }
      res.send('oke');
    }
  );
});

//===============end makanan=======================

var listener = app.listen(8000, function() {
  console.log('server di ' + listener.address().port);
});
