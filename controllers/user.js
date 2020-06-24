const http_status_codes = require('http-status-codes');
const hashedpassword = require("password-hash");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");
const Op = sequelize.Op;

const {
    User,
    Follower,
    Following,
    Friend,
    Friendship,
    Conversation
} = require('../database/database');

module.exports = {

    async createUser(req, res, next) {
        try {
            const {
                name,
                email,
                password,
                gender,
                description,
                isArtist,
                profile_pic,
                cover_pic
            } = req.body;
            User.findOne({
                where: {
                    email: email
                }
            }).then(isUserExist => {
                if (isUserExist) {
                    res.json({
                        message: "Email is already taken! Please choose another one"
                    });
                } else {
                    User.create({
                            name: name,
                            email: email,
                            password: hashedpassword.generate(password),
                            gender: gender,
                            description: description,
                            isArtist: isArtist,
                            profile_pic: profile_pic,
                            cover_pic: cover_pic
                        })
                        .then((createdUser) => {
                            const token = jwt.sign({
                                    email: req.body.email,
                                    userId: createdUser.id
                                },
                                "very-long-string-for-secret", {
                                    expiresIn: 3000
                                });

                            res.json({
                                message: "AutoSigin successfully",
                                token: token,
                                user: createdUser
                            })
                            return res.status(http_status_codes.CREATED).json(user);
                        })
                        .catch((err) => {
                            console.log(err)
                        });
                }
            })
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating User"
            });
        }
    },

    signinUser(req, res, next) {

        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(isUserExist => {
            if (isUserExist) {
                const verify_password = hashedpassword.verify(
                    req.body.password, isUserExist.password
                );
                if (verify_password) {
                    const token = jwt.sign({
                            email: req.body.email,
                            userId: isUserExist.id
                        },
                        "very-long-string-for-secret", {
                            expiresIn: 3000
                        });

                    res.json({
                        message: "Sigin successfully",
                        token: token,
                        user: isUserExist
                    })
                } else {
                    res.json({
                        message: 'unauthorized'
                    })
                }
            } else {
                res.json({
                    message: 'user does not exist'
                })
            }
        })
    },

    async getById(req, res, next) {
        try {
            const user = await User.findOne({
                where: {
                    id: req.params.id
                }
            });
            return res.status(http_status_codes.OK).json(user);
        } catch (error) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error occured in fetching single user"
            })
        }
    },

    async getAll(req, res, next) {
        try {
            const user = await User.findAll();
            return res.status(http_status_codes.OK).json(user);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Users"
            });
        }
    },


    async updateUser(req, res, next) {
        try {
            id = req.params.id;

            const {
                name,
                gender,
                description,
                isArtist,
                profile_pic,
                cover_pic
            } = req.body

            User.update({
                name: name,
                gender: gender,
                description: description,
                isArtist: isArtist,
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

            User.update({
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
            const userId = req.params.id;
            const oldpassword = req.body.oldpassword;
            const newpassword = req.body.newpassword;

            User.findOne({
                    where: {
                        id: userId
                    }
                })
                .then((userRes) => {
                    const isAuth = hashedpassword.verify(
                        oldpassword,
                        userRes.password
                    );

                    if (isAuth) {
                        userRes.update({
                                password: hashedpassword.generate(newpassword)
                            })
                            .then(() => {

                                res.json({
                                    message: 'Password update successfully'
                                });
                            })

                    } else if (!isAuth) {

                        res.json({
                            message: 'Oops Password not updated'
                        });
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
        User.findOne({
            where: {
                email: reqData.email
            }
        }).then(isUser => {
            if (isUser) {
                // send email
                var usermail = req.body.email;
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'Testermail018@gmail.com',
                        pass: 'imrankamboh'
                    }
                });
                var mailOptions = {
                    from: ' ', // sender address
                    to: usermail, // list of receivers
                    subject: 'User Password Verification Code', // Subject line
                    text: 'Here is a code to setup your password again', // plain text body
                    html: 'Hi Dear User <br>Please verify your email using the link below and get back your password! <b style="font-size:24px;margin-left:30px"> Your code - ' + (isUser.id) * 109786 + '<b>' // html body

                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        res.json({
                            user: isUser,
                            verificationCode: (isUser.id) * 109786
                        });
                    }
                });

            } else {
                res.json({
                    message: "Email does not exit"
                });
            }
        }).catch(err => {
            console.log(err);
            res.json("Some Error Occured!");
        });
    },


    async socailLogin(req, res, next) {
        const reqData = req.body;
        console.log(req.body, '=======================')
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(isUser => {
            if (isUser === null) {
                User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedpassword.generate(req.body.password)
                }).then((z) => {
                    res.json({
                        data: z,
                        message: 'New'
                    })
                })
            } else {

                res.json({
                    data: isUser,
                    message: 'old'
                })

            }
        }).catch(err => {
            console.log(err);
            res.json("Some Error Occured!");
        });
    },


};