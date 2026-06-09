CREATE DATABASE IF NOT EXISTS store_rating;

USE store_rating;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(60) NOT NULL,

    email VARCHAR(100) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL,

    address VARCHAR(400),

    role ENUM('ADMIN','USER','STORE_OWNER')
    DEFAULT 'USER',

    created_at TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP
);

CREATE DATABASE IF NOT EXISTS store_rating;

USE store_rating;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(60) NOT NULL,

    email VARCHAR(100) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL,

    address VARCHAR(400),

    role ENUM('ADMIN','USER','STORE_OWNER')
    DEFAULT 'USER',

    created_at TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stores (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(100) NOT NULL,

    address VARCHAR(400),

    owner_id INT,

    created_at TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (owner_id)
    REFERENCES users(id)
    ON DELETE SET NULL
);

CREATE TABLE ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    store_id INT NOT NULL,

    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),

    created_at TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

    FOREIGN KEY (store_id)
    REFERENCES stores(id)
    ON DELETE CASCADE,

    UNIQUE(user_id, store_id)
);