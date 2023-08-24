const fs = require('fs');
const path = require('path');

const sequelize = require('../config/connection.js');
const { User, BlogPost, Comment } = require('../models');

async function createUsers() {
    return new Promise(async (resolve, reject) => {
        let userSeedData = await fs.promises.readFile(path.join(__dirname, '/userSeed.json'), 'utf-8');
        userSeedData = JSON.parse(userSeedData);
        
        await User.bulkCreate(userSeedData, { returning: true, individualHooks: true });

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
        
        await BlogPost.bulkCreate(blogSeedData, { returning: true, individualHooks: true });

        resolve(blogSeedData);
    });
}

async function createComments(userData, blogPostData) {
    return new Promise(async (resolve, reject) => {
        let commentSeedData = await fs.promises.readFile(path.join(__dirname, '/commentSeed.json'), 'utf-8');
        commentSeedData = JSON.parse(commentSeedData);
        commentSeedData = commentSeedData.map(comment => {
            comment.user_id = Math.floor(Math.random() * userData.length) + 1;
            comment.blog_post_id = Math.floor(Math.random() * blogPostData.length) + 1;
            return comment;
        });
        
        await Comment.bulkCreate(commentSeedData, { returning: true, individualHooks: true });

        resolve(commentSeedData);
    });
}

async function seedData() {
    await sequelize.sync({ force: true });

    const userData = await createUsers();
    const blogPostData = await createBlogPosts(userData);

    await createComments(userData, blogPostData);

    sequelize.close();
}

seedData();