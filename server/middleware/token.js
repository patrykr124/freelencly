const jwt = require('jsonwebtoken');


const generateTokken = (userId,res) => {
 const tokken = jwt.sign({ id:userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
 res.cookie('tokken', tokken, {
     httpOnly: true,
     secure: process.env.NODE_ENV !== 'development',
     sameSite: 'strict',
     maxAge: 7 * 24 * 60 * 60 * 1000
 });
 return tokken
}

module.exports = {generateTokken}