const jwt = require("jsonwebtoken");
const asyncHandler = require('express-async-handler');
require('dotenv').config();

const User = require('../models/userModel');

const protectAdmin = asyncHandler(async (req, res, next) => {
    
    let token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.id, { attributes: { exclude: ['password'] } });
    
    console.log(req.user.id);

    if(req.user.type !== 'admin') {

        try {
            res.status(401).json({
                message: "Not Authorized"
            });
        } catch (e) {
            res.status(500).json({
                message: "Internal server error"
            });
        }
    } else {
        next();
    }

})

module.exports = {
        protectAdmin 
}