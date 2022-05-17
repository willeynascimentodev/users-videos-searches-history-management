const { sequelize } = require('sequelize');
const database = require('../db');
const User = require('../models/userModel');


async function insertUser(req, res) {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);   
    } catch (e) {
        let message = e.message.split(' ');

        let status;
        let error;
        
        switch(message[0]) {
            case 'notNull': 
                status = 400; 
                error = `${ message[2] } cannot be null `;
                break;
            case 'Validation': 
                status = 422; 
                error = 'Email already in use';
                break;
            default: 
                status = 500;
                error = 'Internal server error';
        }

        res.status(status).json({
            message: error
        });   
    }
}

async function getUsers(req, res) {
    console.log('oi');
}

function getUser() {
    es.status(200).json({
        message: "oi"
    });   
}

function updateUser() {
    
}

function deleteUser() {
    
}

module.exports = {
    insertUser, 
    getUser,
    getUsers,
    deleteUser,
    updateUser
}