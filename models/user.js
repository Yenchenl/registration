//------ 加密使用者密碼和將資料放入資料庫------//
// using database and bcrypt model
const db = require('../utils/database');
const bcrypt = require('bcrypt')

const User = {
    create: async function(userData){
        const {username, email, password} = userData;
        const hashedPassword = await bcrypt.hash(password, 10);

        const insertQuery = 'INSERT INTO users (username, email, password)'

    }
}