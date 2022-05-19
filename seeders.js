const User = require('./models/userModel');
const bcrypt = require('bcrypt');



async function seeders() {
    const newUser = {
        firstName: "Admin",
        lastName: "Sistema",
        type: "admin",
        phone: "75000000000",
        email: "admin@sistema.com",
        password: "admin123"
    }

    const salt  = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newUser.password, salt);
    newUser.password = hash;
    
    try {
        await User.create(newUser);
    } catch (error) {
        console.log('seeder error');
    }

}

module.exports = {
    seeders
}
