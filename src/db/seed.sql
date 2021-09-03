DROP DATABASE IF EXISTS "journal-app";
CREATE DATABASE "journal-app";

DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
    id SERIAL,
    postingDate DATE NOT NULL DEFAULT CURRENT_DATE,
    content VARCHAR(255)
);
    
INSERT INTO posts (content) VALUES ('This is my first Post');
INSERT INTO posts (content, postingDate) VALUES ('This is my second Post', '2022-09-02T07:00:00.000Z');