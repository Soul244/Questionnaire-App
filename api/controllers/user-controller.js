const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const generator = require('generate-password');
const nodemailer = require('nodemailer');
const User = require('../models/user');

exports.Post_Signup = (req, res) => {
  User.find({ email: req.body.email }).exec().then((user) => {
    if (user.length >= 1) {
      return res.status(201).json({
        message: 'bu mail adresiyle başka bir kayıt var',
      });
    }
    bcrypt.hash(req.body.password, 10, (error, hash) => {
      if (error) {
        return res.status(500).json({
          error,
        });
      }
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: hash,
      });
      user.save().then((user) => {
        res.status(200).json({
          user,
          message: 'kullanıcı oluşturuldu',
        });
      }).catch((error) => {
        res.status(500).json({
          error,
        });
      });
    });
  })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
};

exports.Token_Control = (req, res) => {
  try {
    jwt.verify(req.body.token, process.env.JWT_KEY, null);
    res.status(200).json({
      isTokenValid: true,
    });
  } catch (error) {
    res.status(500).json({
      isTokenValid: false,
    });
  }
};

exports.Reset_Password = (req, res) => {
  const { email } = req.body;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bilemezsinquestionnaire@gmail.com',
      pass: '142536Xx',
    },
  });

  User.find({ email }).exec().then((user) => {
    if (user === null) {
      return res.status(201).json({
        message: 'Mail adresi bulunamadı',
      });
    }
    const newPassword = generator.generate({
      length: 8,
      numbers: true,
    });
    const mailOptions = {
      from: 'bilemezsinquestionnaire@gmail.co',
      to: email,
      subject: 'Bilemezsin Questionnaire Şifre Sıfırlama',
      text: `Merhaba, işte yeni şifreniz:${newPassword}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
    bcrypt.hash(newPassword, 10, (error, hash) => {
      if (error) {
        return res.status(500).json({
          error,
        });
      }
      User.update({ email }, {
        $set: {
          password: hash,
        },
      }).exec()
        .then((result) => {
          res.status(200).json({
            message: 'Yeni şifreniz mail adresinize gönderildi.',
          });
        });
    });
  }).catch((error) => {
    res.status(500).json({
      error,
    });
  });
};

exports.Post_Login = (req, res) => {
  User.findOne({ email: req.body.email }).exec().then((user) => {
    if (user === null) {
      return res.status(201).json({
        message: 'Mail adresi bulunamadı',
      });
    }
    bcrypt.compare(req.body.password, user.password, (error, result) => {
      if (error) {
        return res.status(201).json({
          message: 'Şifre geçersiz (Hata Kodu 0x01)',
        });
      }
      if (result) {
        const token = jwt.sign({
          id: user._id,
          email: user.email,
        },
        process.env.JWT_KEY,
        {
          expiresIn: '30 days',
        });
        return res.status(200).json({
          id: user._id,
          email: user.email,
          token,
          isTokenValid: true,
          message: 'Başarıyla giriş yaptınız.',
        });
      }
      res.status(201).json({
        message: 'Şifre geçersiz (Hata Kodu 0x02)',
        isTokenValid: false,
      });
    });
  })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
};

exports.Delete_User = (req, res) => {
  User.remove({
    _id: req.params.userId,
  })
    .exec()
    .then(user => res.status(201).json({
      message: 'kullanıcı silindi',
      user,
    })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      }));
};

exports.Get_User = (req, res) => {
  User.find({ _id: req.params.userId })
    .exec()
    .then((user) => {
      res.status(201).json({
        user,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
};
