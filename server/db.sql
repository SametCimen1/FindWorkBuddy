CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(20)  UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO users (name, email)
VALUES('samet', 'cimensamet338@gmail.com');