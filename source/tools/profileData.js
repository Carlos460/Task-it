const jwt = require('jsonwebtoken');
const User = require('../model/User');

async function getUserData(req, res, next) {
    //Gets cookie from user, redirects to login page if TastyCookie doesnt exist
    const cookie = await req.cookies.TastyCookie;
    if (!cookie) return res.status(302).redirect('profile/login');

    //Getting cookie data
    const userCookie = jwt.decode(cookie, process.env.TOKEN);
    //getting data 
    const user = await User.findOne({ _id: userCookie._id });
    req.userData = user;
    next();
};



module.exports.getUserData = getUserData;