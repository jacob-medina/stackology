const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class BlogPost extends Model {};

BlogPost.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    thumbnail: {
        type: DataTypes.STRING,
        allowNull: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date_created: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    }
}, {
    hooks: {
        beforeCreate: (post) => {
            if (post.thumbnail) return post;

            post.thumbnail = '/images/thumbnail.jpg';
            return post;
        },
        beforeUpdate: (post) => {
            if (post.thumbnail) return post;

            post.thumbnail = '/images/thumbnail.jpg';
            return post;
        }
    },
    sequelize,
    modelName: 'blogPost',
    underscored: true,
    timestamps: false
}
);

module.exports = BlogPost;