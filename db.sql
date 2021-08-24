CREATE TABLE groups(
    id SERIAL PRIMARY KEY,
    name varchar(255) NOT NULL UNIQUE,
    subject varchar(255) NOT NULL,
    description varchar(255)
);


CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    userId integer REFERENCES users(id),
    image varchar(255),
    header varchar(255) NOT NULL,
    paragraph varchar(1000) NOT NULL,
    keywords text[],
    likes integer,
    commentby integer[],
    likedby integer[],
    username varchar(200) NOT NULL,
    uploadtime timestamp
);

CREATE TABLE comment(
    id SERIAL PRIMARY KEY,
    text varchar(500),
    userid integer,
    userImg  varchar(255),
    userName varchar(255)
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(20)  UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    following integer[],
    friendReq integer[],    
    followers integer[],
    isPublic boolean,
    groupID integer ARRAY, 
    role varchar(6),
    image varchar(255)
);


INSERT INTO users (name, email)
VALUES('samet', 'cimensamet338@gmail.com');

DROP TABLE users;
DROP TABLE groups;
DROP TABLE posts;

ALTER TABLE posts
ADD likedby integer[];

ALTER TABLE users   
ADD following integer[];

ALTER TABLE users
ADD followers integer[];

ALTER TABLE users
ADD ownimg boolean;


ALTER TABLE users
DROP test;

ALTER TABLE users
DROP friendnum;

DELETE FROM posts WHERE id = 1;
DELETE FROM users WHERE id = 1;