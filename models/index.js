const User = require('./User.js');
const BlogPost = require('./BlogPost.js');
const Comment = require('./Comment.js');

User.hasMany(BlogPost, {
    onDelete: 'CASCADE',
    foreignKey: 'user_id'
});

BlogPost.belongsTo(User);

BlogPost.hasMany(Comment, {
    onDelete: 'CASCADE',
    foreignKey: 'blog_post_id'
});

Comment.belongsTo(BlogPost);

User.hasMany(Comment, {
    onDelete: 'CASCADE',
    foreignKey: 'user_id'
});

Comment.belongsTo(User);

module.exports = { User, BlogPost, Comment };