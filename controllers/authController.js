require('dotenv').config();
const { sequelize } = require('sequelize');
const database = require('../db');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

async function login(req, res) {
    
    try {
        let user = await User.findOne({ where: { email: req.body.email }  });
        let passwordMatch;
        if ( user ) {
            passwordMatch = await bcrypt.compare(req.body.password, user.password);
        } else {
            res.status(404).json({ message: "User not found" });
        }
        
        if (user && passwordMatch) {
            user.token = generateToken(user.id);
            user.password = null;
            const token = user.token;
            res.status(200).json({user: user, token: token});
        } else if (user && !passwordMatch) { 
            res.status(401).json({ message: "Inválid credentials" });
        } 

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }

}

function generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 7200
    });
}

module.exports = {
    login
}