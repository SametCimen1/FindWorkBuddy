CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(20)  UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    friends integer ARRAY,
    role varchar(6),
    image varchar(255) UNIQUE
);

INSERT INTO users (name, email)
VALUES('samet', 'cimensamet338@gmail.com');