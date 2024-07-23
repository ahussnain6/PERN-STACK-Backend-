const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('./index'); 
const User = require('./user');
class Booking extends Model { }
Booking.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    contact:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    socialMedia:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    date:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    days:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    guests:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    occupation:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    address:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    age:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: "Users",
            key: 'id',},
            onDelete: 'CASCADE',
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
},
},
    {
        sequelize,
        modelName: 'Bookings',
        schema: 'public',  // Specify schema
        timestamps: false,
    });
// Define relationships
User.hasMany(Booking,{ foreignKey: 'userId'});
Booking.belongsTo(User, { foreignKey: 'userId' });
module.exports = Booking;
