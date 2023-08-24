const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Comment extends Model {};

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    blog_post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'blogPost',
            key: 'id'
        }
    },
}, {
    sequelize,
    modelName: 'comment',
    underscored: true,
    timestamps: false
}
);

module.exports = Comment;