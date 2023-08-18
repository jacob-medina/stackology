const fs = require('fs');
const path = require('path');

const sequelize = require('../config/connection.js');
const { User, BlogPost } = require('../models');

async function createUsers() {
    return new Promise(async (resolve, reject) => {
        let userSeedData = await fs.promises.readFile(path.join(__dirname, '/userSeed.json'), 'utf-8');
        userSeedData = JSON.parse(userSeedData);
        const users = await User.bulkCreate(userSeedData, { returning: true, individualHooks: true });

        resolve(userSeedData);
    });
}

async function createBlogPosts(userData) {
    return new Promise(async (resolve, reject) => {
        let blogSeedData = await fs.promises.readFile(path.join(__dirname, '/blogPostSeed.json'), 'utf-8');
        blogSeedData = JSON.parse(blogSeedData);
        blogSeedData = blogSeedData.map(blogPost => {
            blogPost.user_id = Math.floor(Math.random() * userData.length) + 1;
            return blogPost;
        });
        const users = await BlogPost.bulkCreate(blogSeedData, { returning: true, individualHooks: true });

        resolve(blogSeedData);
    });
}

async function seedData() {
    await sequelize.sync({ force: true });

    const userData = await createUsers();
    await createBlogPosts(userData);

    sequelize.close();
}

seedData();