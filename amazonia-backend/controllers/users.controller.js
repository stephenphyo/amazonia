const path = require('path');
const mysqlPool = require(path.join(__basedir, '/database/mysqldb.js'));
const { v4: uuid } = require('uuid');
const bcrypt = require('bcryptjs');
const generateJWT = require(path.join(__basedir, '/utils/jwt'));

const usersCtrl = {
    /* Temp Start */
    getUsers: (req, res) => {
        mysqlPool.getConnection((err, conn) => {
            conn.query(`SELECT * FROM Users`, (err, rows) => {
                if (!err) {
                    res.status(200).send(rows);
                } else {
                    res.status(500).send(err.message);
                }
            })
            console.log(`Connection Limit: ${mysqlPool.config.connectionLimit}`);
            console.log(`Free Connections: ${mysqlPool._freeConnections.length}`);
            console.log(`Used Connections: ${mysqlPool._allConnections.length}`);
            console.log(`Acquiring Connections: ${mysqlPool._acquiringConnections.length}`);
        })
    },

    /* Temp End */

    SignIn: (req, res) => {
        mysqlPool.getConnection((err, conn) => {
            if (!err) {
                const query = `
                    SELECT Users.id AS user_id, Users.email, Users.first_name, Users.last_name,
                        Users.gender, Passwords.password
                    FROM Users
                    INNER JOIN Passwords
                    ON Users.id = Passwords.user_id
                    WHERE email="${req.body.email}";`
                conn.query(query, (err, rows) => {
                    if (!err) {
                        if (rows.length !== 0) {
                            let user = rows[0];
                            // bcrypt.compare(Plaintext Password, Password Hash, Callback)
                            bcrypt.compare(req.body.password, user.password, (err, success) => {
                                if (success) {
                                    res.status(200).send({
                                        userId: user.user_id,
                                        firstName: user.first_name,
                                        lastName: user.last_name,
                                        email: user.email,
                                        // isAdmin: user.isAdmin,
                                        jwt: generateJWT({ user })
                                    })
                                } else {
                                    res.status(401).send({ message: "Invalid Email or Password" });
                                }
                            })
                        } else {
                            res.status(404).send({ message: "Invalid Email or Password" });
                        }
                    } else {
                        res.status(403).send({ error: err.message });
                    }
                });
                conn.release();
            } else {
                res.status(500).send({ error: err.message });
            }
        })
        console.log(`Connection Limit: ${mysqlPool.config.connectionLimit}`);
            console.log(`Free Connections: ${mysqlPool._freeConnections.length}`);
            console.log(`Used Connections: ${mysqlPool._allConnections.length}`);
            console.log(`Acquiring Connections: ${mysqlPool._acquiringConnections.length}`);
    },

    SignUp: (req, res) => {
        mysqlPool.getConnection((err, conn) => {
            if (!err) {
                let r = req.body;
                /* Generating Salt */
                const salt = bcrypt.genSaltSync(10);
                /*
                Hashing Password with Salt
                Salt Length = 29
                Encrypted Password Length = 60
                */
                const password = bcrypt.hashSync(r.password, salt);
                const user_id = uuid();

                const query =
                `INSERT INTO Users (
                    id, email, first_name, last_name, gender
                ) VALUES ?;
                INSERT INTO Passwords (
                    user_id, password
                ) VALUES ?`;
                var values1 = [[user_id,  r.email, r.fname, r.lname, r.gender]];
                var values2 = [[user_id, password]];

                // 'values'  is an array of parameters wrapped in an array
                conn.query(query, [values1, values2], (err, rows) => {
                    if (!err) {
                        res.status(201).send(`User account: ${r.email} has been created successfully`);
                    } else {
                        res.status(403).send({
                            message: `User account: ${r.email} failed`,
                            error: err.message
                        });
                    }
                });
                conn.release();
            } else {
                res.status(500).send({ error: err.message });
            }
        });
    },

    SignInMSAL: (req, res) => {
        mysqlPool.getConnection((err, conn) => {
            if (!err) {
                const r = req.body;
                const query1 =
                    `SELECT id, email, first_name, last_name
                    FROM UsersMsal
                    WHERE id='${r.userId}'`;
                conn.query(query1, (err, rows) => {
                    if (!err) {
                        if (rows.length !== 0) {
                            /* Existing User */
                            let user = rows[0];
                            if (r.firstName !== user.first_name ||
                                r.lastName !== user.last_name) {
                                const query2 =
                                `UPDATE UsersMsal
                                SET first_name=?, last_name=?
                                WHERE id=?;`;
                                values = [r.firstName, r.lastName, r.userId];
                                conn.query(query2, values, (err, rows) => {
                                    if (!err) {
                                        res.status(200).send({
                                            userId: r.id,
                                            firstName: r.first_name,
                                            lastName: r.last_name,
                                            email: r.email,
                                            jwt: generateJWT({ r })
                                        });
                                    } else {
                                        res.status(403).send({ error: err.message });
                                    }
                                })
                            }
                        } else {
                            /* New User */
                            const query2 =
                                `INSERT INTO UsersMsal (
                                    id, email, first_name, last_name
                                ) VALUES ?`;
                            const values = [[r.userId, r.email, r.firstName, r.lastName]];
                            conn.query(query2, [values], (err, rows) => {
                                if (!err) {
                                    res.status(200).send({
                                        userId: r.id,
                                        firstName: r.first_name,
                                        lastName: r.last_name,
                                        email: r.email,
                                        jwt: generateJWT({ r })
                                    });
                                } else {
                                    res.status(403).send({ error: err.message });
                                }
                            })
                        }
                    } else {
                        res.status(403).send({ error: err.message });
                    }
                })
            } else {
                res.status(500).send({ error: err.message });
            }
        })
    }
}

module.exports = usersCtrl;