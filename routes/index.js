var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');


const secret = 'asffwdbiuj3blf90214kdq2asfgg';
const refreshSecret = 'dsg5g6d56wahr5nf23v5m4uio6532s';


function makeAccessToken(email) {
  return jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60),
    payload: {
      email: email,
    }
  }, secret);
}
//refresh token 발급방법
function makeRefreshToken(email) {
  return jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60),
    payload: {
      email: email,
    }
  }, refreshSecret);
}

function verify(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, secret);
    req.user = {
      email: decoded.payload.email
    }
    next()
  } catch (err) {
    res.status(401).json({ "message": "인증실패" })
  }


}

//비지니스 로직 수행하고 다음으로 넘기면 아래 제이슨으로 뿌려줌
router.post('/auth/sign-in', function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (email === 'linda3328@naver.com' && password === '111111') {
    res.json({
      accessToken: makeAccessToken(email)
    })
  } else {
    res.status(401).json({ "message": "유저를 찾을수 없습니다." })
  }

});
router.post('/auth/sign-up', function (req, res, next) {
  //email & password
  const email = req.body.email;
  const password = req.body.password;

  if (email === 'linda3328@naver.com' && password === '111111') {
    res.json({
      accessToken: makeAccessToken(email)
    })
  } else {
    res.status(401).json({ "message": "유저를 찾을수 없습니다." })
  }

  // res.json({
  //   email: email,
  //   password: password,

  // })
});
router.post('/auth/refresh', function (req, res, next) {
  //accessToken 
  //refreshToken
  res.json({})
});


router.get('/users', verify, function (req, res, next) {
  //accessToken 

  res.json({ "request": "success" })
});

module.exports = router;
