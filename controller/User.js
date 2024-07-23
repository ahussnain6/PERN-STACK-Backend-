const User = require('../models/user');
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({
            name: name,
            email: email,
            password: password,
        });
        
        return res.status(200).json({ data: user.toJSON() });
    } catch (error) {
        

        if (error.name === 'SequelizeValidationError') {

            const errors = error.errors.map(err => ({
                field: err.path,
                message: err.message,
            }));
            let arror = errors[0].message;
            return res.status(400).json({ error: 'Validation Error', arror });
        } else if (error.name === 'SequelizeUniqueConstraintError') {
            let arror = error.errors[0].message;
            return res.status(400).json({ err: 'Unique Error', arror });
        }
        else {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Server Error' });
        }
    }
}

const authenticateUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).send('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            return res.status(200).json({ user: user })
        } else { return res.status(400).send("Invalid Password"); }
    } catch (error) { return res.status(400).send("Error authenticating user"); }
}
const sendMail = async (req, res) => {
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
        var transporter = nodemailer.createTransport({
            service: "gmail", host: "smtp.gmail.com", port: 587, secure: false, auth: {
                user: process.env.email,
                pass: process.env.password
            },
        });
        var mailOptions = {
            from: process.env.email,
            to: `${socialMedia}`,
            subject: "ALI'S-TRAVEL.COM Administration",
            html: `<p>Hi,</p>
            <p>Dear ${name},</p>
            <p>Thank you for choosing our services. We are delighted to confirm your booking based on the details provided. You will be staying with us from ${date} for ${days} days, accommodating ${guests} guests. Your booking ID is ${userId}.</p>
            <p>We have recorded your contact details as ${contact}. Additionally, we have noted your occupation as ${occupation}, residing at ${address}, and aged ${age}.</p>
            <p>Your booking has been successfully processed, and we are excited to welcome you on ${date}. If you have any further inquiries or require assistance, please do not hesitate to reach out to us at <a href="mailto:alisgroup70@gmail.com">alisgroup70@gmail.com</a>.</p>
            <p>Looking forward to your visit.</p>
            <p>Best Regards,<br>ALI'S-TRAVEL.COM</p>` };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error, "error");
            } else {
                return res.status(200).send(`Booking Confirmation Email sent at ${socialMedia}`);
            }
        });
    } catch (error) {
        console.log("error", error);
    }
}
module.exports = { authenticateUser, createUser, sendMail };