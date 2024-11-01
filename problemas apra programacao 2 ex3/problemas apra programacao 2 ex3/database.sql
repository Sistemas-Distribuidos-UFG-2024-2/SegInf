CREATE DATABASE xdr_example;

USE xdr_example;

CREATE TABLE Customer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

INSERT INTO Customer (name, email) VALUES
('a', 'a@example.com'),
('b', 'b@example.com');