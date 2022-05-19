const { sequelize } = require('sequelize');
const database = require('../db');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');


async function insertUser(req, res) {

    try { 
        let body = req.body;
        const salt  = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(body.password, salt);
        body.password = hash;
        const user = await User.create(body);
        res.status(201).json(user);   
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

    const offset = req.query.offset ? Number(req.query.offset) : null;
    const limit = req.query.limit ? Number(req.query.limit) : null;

    try {
        const users = await User.findAll({ offset: offset, limit : limit,  attributes: { exclude: ['password'] } });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }

}

async function getUser(req, res) {

    try {
        const user = await User.findByPk(req.params.userId, { attributes: { exclude: ['password'] } });
        const response = user != null ? user : { message: "User not found" };
        const status = user != null ? 200 : 404;
        res.status(status).json(response);
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }

}

async function updateUser(req, res) {

    try {
        const user = await User.findByPk(req.params.userId);
        let response;
        let status;

        if (user != null) {
            
            
            user.firstName = req.body.firstName ?? user.firstName;
            user.lastName = req.body.lastName ?? user.lastName;
            user.type = req.body.type ?? user.type;
            user.phone = req.body.phone ?? user.phone; 
            user.email = req.body.email ?? user.email;
            user.password = req.body.password ?? user.password;
            
            const newUser = await user.save();
            response = newUser;
            status =  200;
        } else {
            response = { message: "User not found" };
            status =  404;
        }
        
        res.status(status).json(response);
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }

}

async function deleteUser(req, res) {

    try {
        let result = await User.destroy({ where: { id: req.params.userId }});
        let response = result === 1 ? 'User deleted' : 'User not found';
        let status = result === 1 ? 200 : 404;
        res.status(status).json({ message: response});
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }

}

module.exports = {
    insertUser, 
    getUser,
    getUsers,
    deleteUser,
    updateUser
}