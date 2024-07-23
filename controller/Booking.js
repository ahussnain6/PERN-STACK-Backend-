const Book = require('../models/Book.js');
const Booking = async (req, res) => {
    const { name,
        contact,
        socialMedia,
        date,
        days,
        guests,
        occupation,
        address,
        age,
        userId } = req.body;
    try {
        console.log(req.body);
        const booker = await Book.create({
            name,
            contact,
            socialMedia,
            date,
            days,
            guests,
            occupation,
            address,
            age,
            userId
        });
        return res.status(200).send({ book: booker.toJSON() });
    } catch (error) {
        return res.status(400).send("Booking Error");
    }
}
const deleteBookings = async (req, res) => {
    const { id } = req.params;
    console.log(id,"id");
    try {
        await Book.destroy({ where: { id: id } });
        return res.status(201).send('User deleted');
    } catch (error) { return res.status(400).send('Error deleting user'); }
}
const getBook = async (req, res) => {
    const { email } = req.params;
    try {
        const books = await Book.findAll({ where: { socialMedia: email, }, });
        if (books) { return res.status(200).send({ bookings: books }) }
        return res.status(400).send("Bookings not Available");
    } catch (error) {
        return res.status(400).send("Bookings not Available");
    }
}
module.exports = { Booking, deleteBookings, getBook }