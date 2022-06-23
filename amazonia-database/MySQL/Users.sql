CREATE TABLE IF NOT EXISTS users
VALUES
    (
        userid varchar(36),
        email varchar(50),
        firstname varchar(30),
        lastname varchar(30),
        password varchar(60),
        gender varchar(1),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );