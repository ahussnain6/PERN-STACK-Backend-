const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('./index');
const bcrypt = require("bcryptjs");
class User extends Model {}
User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
              msg: 'Name is required',
          },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
          msg: 'Email address already in use',
      },
      validate: {
          notNull: {
              msg: 'Email is required',
          },
          isEmail: {
              msg: 'Invalid email format',
          },
      },
  },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required'
        },
        len: {
          args: [6, 255],
          msg: 'Password must be at least 6 characters long'
        },
        isStrongPassword(value) {
          if (!/[a-z]/.test(value)) {
            throw new Error('Password must contain at least one lowercase letter');
          }
          if (!/[A-Z]/.test(value)) {
            throw new Error('Password must contain at least one uppercase letter');
          }
          if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            throw new Error('Password must contain at least one special character');
          }
        }
      }
  },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: 'User',
    schema: 'public',  // Specify schema, e.g., 'public', 'my_schema'
    timestamps: false,  // Set to true to automatically manage createdAt and updatedAt fields
}   )   ;
User.beforeCreate(async (user) => {
    if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt); }  }  );
module.exports = User;