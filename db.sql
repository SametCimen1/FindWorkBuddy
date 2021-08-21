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
    keyword varchar(100) NOT NULL,
    likes integer,
    commentby integer[],
    likedby integer[],
    uploadtime timestamp
);

CREATE TABLE comment(
    id SERIAL PRIMARY KEY,
    text varchar(500),
    userid integer
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(20)  UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    friends integer ARRAY,
    friendReq integer ARRAY,    
    friendNum integer,
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


DELETE FROM posts WHERE id = 1;