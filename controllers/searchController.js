const { sequelize } = require('sequelize');
const jwt = require("jsonwebtoken");
const asyncHandler = require('express-async-handler');

const database = require('../db');
const Search = require('../models/searchModel');



async function insertSearch (req, res) {
    
    try { 
        const search = await Search.create({
            title: req.body.title,
            user_id: req.user.id
        });
        res.status(201).json(search.title);   
    } catch (e) {
        let message = e.message.split(' ');

        let status;
        let error;
        
        switch(message[0]) {
            case 'notNull': 
                status = 400; 
                error = `${ message[2] } cannot be null `;
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

async function searchList(req, res) {

    try {
        let search = await Search.findAll({ where: { user_id: req.params.userId }});
        res.status(200).json(search);
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }

}

module.exports = {
    insertSearch, 
    searchList
}