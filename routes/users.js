var express = require('express');
var router = express.Router();
const req = require('express/lib/request');
const res = require('express/lib/response');
var users = require('../data/users');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', function(req, res, next) {
  // status = deactive => chi deactive thoi
  // status = all => trả hết
  // mac dinh chỉ trả active
  const status = req.query.status;
  
  if(status == 'deactive') {
    returnUsers = users.filter(u=> u.active == false)
  } else if (status == 'all')
  {
    returnUsers = users
  }
  else {
    returnUsers = users.filter(u => u.active==true)
  }
  res.json(returnUsers);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const user = users.find(u => u.id == id);
  res.json({'user': user});
});

// router.post('/', (req, res) => {
//   // res.json(req.body)
//   const newUser = {
//     id: new Date().getTime(),
//     name: req.body.name,
//     active: req.body.active == 'true' ? true : false
//   }
//   users.push(newUser);
//   res.json(newUser);
// })

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const active = req.body.active == 'true' ? true : false
  res.json({id: id, active: active})
})

router.post('/', (req, res) => {
  // res.json(req.body)
  const newUser = {
    id: new Date().getTime(),
    name: req.body.name,
    active: req.body.active == 'true' ? true : false
  }
  users.push(newUser);
  res.json(newUser);
})



module.exports = router;
