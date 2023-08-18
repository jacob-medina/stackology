const User = require('./User.js');
const BlogPost = require('./BlogPost.js');

User.hasMany(BlogPost, {
    onDelete: 'CASCADE',
    foreignKey: 'user_id'
});

BlogPost.belongsTo(User);

module.exports = { User, BlogPost };