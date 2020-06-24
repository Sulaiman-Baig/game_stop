const http_status_codes = require('http-status-codes');
const hashedpassword = require("password-hash");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");
const Op = sequelize.Op;

const {
    Admin

} = require('../database/database');

module.exports = {

    async createAdmin(req, res, next) {
        try {
            const {
                name,
                email,
                password,
                gender,
                description,
                profile_pic,
                cover_pic
            } = req.body;
            Admin.findOne({
                where: {
                    email: email
                }
            }).then(isAdminExist => {
                if (isAdminExist) {
                    res.json({ message: "Email is already taken! Please choose another one" });
                } else {
                    Admin.create({
                        name: name,
                        email: email,
                        password: hashedpassword.generate(password),
                        gender: gender,
                        description: description,
                        profile_pic: profile_pic,
                        cover_pic: cover_pic
                    })
                        .then((createdAdmin) => {
                            const token = jwt.sign({
                                email: req.body.email,
                                AdminId: createdAdmin.id
                            },
                                "very-long-string-for-secret", {
                                expiresIn: 3000
                            });

                            res.json({
                                message: "AutoSigin successfully",
                                token: token,
                                Admin: createdAdmin
                            })
                            return res.status(http_status_codes.CREATED).json(Admin);
                        })
                        .catch((err) => { console.log(err) });
                }
            })
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating Admin"
            });
        }
    },

    signinAdmin(req, res, next) {

        Admin.findOne({
            where: {
                email: req.body.email
            }
        }).then(isAdminExist => {
            if (isAdminExist) {
                const verify_password = hashedpassword.verify(
                    req.body.password, isAdminExist.password
                );
                if (req.body.password === isAdminExist.password) {
                    const token = jwt.sign({
                        email: req.body.email,
                        adminId: isAdminExist.id
                    },
                        "very-long-string-for-secret", {
                        expiresIn: 3000
                    });

                    res.json({
                        message: "Sigin successfully",
                        token: token,
                        admin: isAdminExist
                    })
                } else {
                    res.json({
                        message: 'unauthorized'
                    })
                }
            } else {
                res.json({
                    message: 'Admin does not exist'
                })
            }
        })
    },

    async getById(req, res, next) {
        try {
            const admin = await Admin.findOne({ where: { id: req.params.id } });
            return res.status(http_status_codes.OK).json(admin);
        } catch (error) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error occured in fetching single Admin"
            })
        }
    },

    async getAll(req, res, next) {
        try {
            const admins = await Admin.findAll();
            return res.status(http_status_codes.OK).json(admins);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Admins"
            });
        }
    },

    async updateAdmin(req, res, next) {
        try {
            id = req.params.id;

            const {
                name,
                gender,
                description,
                profile_pic,
                cover_pic
            } = req.body

            Admin.update({
                name: name,
                gender: gender,
                description: description,
                profile_pic: profile_pic,
                cover_pic: cover_pic
            }, {
                where: {
                    id: id
                }
            })
            return res.status(http_status_codes.OK).json({
                message: "Updated sussessfully"
            })
        } catch (error) {

            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "an error occured"
            })
        }
    },

    async updatePassword(req, res, next) {
        try {

            id = req.params.id;

            const {
                password
            } = req.body

            Admin.update({
                password: hashedpassword.generate(password)
            }, {
                where: {
                    id: id
                }
            })

            return res.status(http_status_codes.OK).json({
                message: "Updated sussessfully"
            })

        } catch (error) {

            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "An error occured"
            })
        }
    },

    async resetPassword(req, res, next) {
        try {
            const adminId = req.params.id;
            const oldpassword = req.body.oldpassword;
            const newpassword = req.body.newpassword;

            Admin.findOne({
                where: { id: adminId }
            })
                .then((adminRes) => {
                    const isAuth = hashedpassword.verify(
                        oldpassword,
                        adminRes.password
                    );

                    if (isAuth) {
                        adminRes.update({
                            password: hashedpassword.generate(newpassword)
                        })
                            .then(() => {

                                res.json({ message: 'Password update successfully' });
                            })

                    } else if (!isAuth) {

                        res.json({ message: 'Oops Password not updated' });
                    }
                })

        } catch (error) {

            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Approved"
            });
        }
    },

    async forgotPassword(req, res, next) {
        const reqData = req.body;
        Admin.findOne({
            where: { email: reqData.email }
        }).then(isAdmin => {
            if (isAdmin) {
                // send email
                var adminmail = req.body.email;
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        admin: 'Testermail018@gmail.com',
                        pass: 'imrankamboh'
                    }
                });
                var mailOptions = {
                    from: ' ', // sender address
                    to: Adminmail, // list of receivers
                    subject: 'Admin Password Verification Code', // Subject line
                    text: 'Here is a code to setup your password again', // plain text body
                    html: 'Hi Dear Admin <br>Please verify your email using the link below and get back your password! <b style="font-size:24px;margin-left:30px"> Your code - ' + (isAdmin.id) * 109786 + '<b>' // html body

                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        res.json({
                            admin: isAdmin,
                            verificationCode: (isAdmin.id) * 109786
                        });
                    }
                });

            } else {
                res.json({ message: "Email does not exit" });
            }
        }).catch(err => {
            console.log(err);
            res.json("Some Error Occured!");
        });
    },



};