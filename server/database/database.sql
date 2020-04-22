DROP DATABASE IF EXISTS remote;

CREATE DATABASE remote;

\c remote


CREATE TABLE genres
(
    id SERIAL PRIMARY KEY,
    name VARCHAR
);

CREATE TABLE videos
(
    id SERIAL PRIMARY KEY,
    title VARCHAR,
    description VARCHAR,
    rating INT,
    video_url VARCHAR,
    genre_id INT REFERENCES genres(id) on delete cascade on update cascade,
    img_url VARCHAR
);

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    email VARCHAR NOT NULL UNIQUE,
    number VARCHAR,
    password VARCHAR NOT NULL,
    video_id INT REFERENCES videos(id) on delete cascade on update cascade
);

CREATE TABLE showrooms
(
    id SERIAL PRIMARY KEY, 
    title VARCHAR,
    video_id INT REFERENCES videos(id) on delete cascade on update cascade
);

CREATE TABLE comments
(
    id SERIAL PRIMARY KEY,
    body VARCHAR,
    users_id INT REFERENCES users(id) on delete cascade on update cascade,
    video_id INT REFERENCES videos(id) on delete cascade on update cascade,
    showroom_id INT REFERENCES showrooms(id) on delete cascade on update cascade
);

CREATE TABLE preferences
(
    id SERIAL PRIMARY KEY,
    age VARCHAR(2),
    users_id INT REFERENCES users(id),
    genre_id INT REFERENCES genres(id) on delete cascade on update cascade
);

CREATE TABLE viewer
(
    id SERIAL PRIMARY KEY,
    viewer_id INT REFERENCES users(id),
    video_id INT REFERENCES videos(id),
    showroom_id INT REFERENCES showrooms(id) on delete cascade on update cascade
);

CREATE TABLE showtimes
(
    id SERIAL PRIMARY KEY,
    video_id INT REFERENCES videos(id),
    time VARCHAR
);

INSERT INTO genres
    (name)
VALUES
    ('Action'),
    ('Adventure'),
    ('Comedy'),
    ('Drama'),
    ('Horror'),
    ('Sci-fi'),
    ('Documentary'),
    ('Rom Com'),
    ('Family');

INSERT INTO videos
    (title, genre_id, description, video_url, rating, img_url)
VALUES
    ( 'The Invisible Man', 5, 'The Invisible Man is a 2020 science fiction horror film written and directed by Leigh Whannell. It follows a woman who, after the apparent suicide of her abusive and wealthy boyfriend, believes she is being stalked by him.', 'https://www.youtube.com/watch?v=Pso0Aj_cTh0', 69, 'https://m.media-amazon.com/images/M/MV5BZjFhM2I4ZDYtZWMwNC00NTYzLWE3MDgtNjgxYmM3ZWMxYmVmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SY1000_CR0,0,631,1000_AL_.jpg'),
    ( 'Survive The Night', 1, 'A disgraced doctor and his family are held hostage at their home by criminals on the run, when a robbery-gone-awry requires them to seek immediate medical attention.', 'https://www.youtube.com/watch?v=TfTNGqXBwHY&list=PLScC8g4bqD45-Bue4BX7U2h4IkzEV3hcL&index=1', 78, 'https://m.media-amazon.com/images/M/MV5BM2FkYmZiZjItY2Q5NC00MWVkLWI3NDItMzhiOTRkNDhhZDEyXkEyXkFqcGdeQXVyOTg4MDYyNw@@._V1_.jpg'),
    ( 'Whats The Worst That Could Happen?', 3, 'A rich man catches a thief burglarizing his home and steals the thiefs lucky ring, who then tries to get it back.', 'https://www.youtube.com/watch?v=9LaZ6pqSnqM', 56, 'https://m.media-amazon.com/images/M/MV5BMTgyNTY4MzgzOF5BMl5BanBnXkFtZTcwMDQ1Nzg0NQ@@._V1_.jpg'),
    ( 'Mulan', 2, 'A young Chinese maiden disguises herself as a male warrior in order to save her father. A live-action feature film based on Disney''s Mulan.', 'https://www.youtube.com/watch?v=XrAmQS9jJJo', 61, 'https://m.media-amazon.com/images/M/MV5BMjFlZjZkMTYtODM2Zi00OTM4LWIwYTktOTFjMmQzZDEzZDc4XkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_SY1000_CR0,0,675,1000_AL_.jpg'),
    ( 'Barbershop 2', 3, 'The owner of an historic South Side Chicago barbershop is pressured to sell out to a land developer, but must face the impact this would have on his close-knit community.','https://www.youtube.com/watch?v=ON2K5LhrSls', 90,'https://m.media-amazon.com/images/M/MV5BMTk4MTA2ODQ4MF5BMl5BanBnXkFtZTYwOTY1Njc3._V1_.jpg'),
    ( 'Rampage', 6, 'Primatologist Davis Okoye shares an unshakable bond with George, an extraordinarily intelligent, silverback gorilla that''s been in his care since birth. When a rogue genetic experiment goes wrong, 
    it causes George, a wolf and a reptile to grow to a monstrous size. As the mutated beasts embark on a path of destruction, Okoye teams up with a discredited genetic engineer and the military to secure an antidote and prevent a global catastrophe.', 'https://www.youtube.com/watch?v=coOKvrsmQiI', 65,'https://m.media-amazon.com/images/M/MV5BNDA1NjA3ODU3OV5BMl5BanBnXkFtZTgwOTg3MTIwNTM@._V1_SY1000_CR0,0,674,1000_AL_.jpg'),
    ( 'Bright', 1, 'A detective must work with an Orc to find a powerful wand before evil creatures do.', 'https://www.youtube.com/watch?v=giozR7nb51c', 82, 'https://m.media-amazon.com/images/M/MV5BMTcyNzk5NDg1Nl5BMl5BanBnXkFtZTgwNTM5MDQxNDM@._V1_SY1000_CR0,0,674,1000_AL_.jpg'),
    ( 'The Godfather', 4, 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', 'https://www.youtube.com/watch?v=sY1S34973zA' , 94, 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,704,1000_AL_.jpg'),
    ( 'The Alphabet Killer', 4, 'Based on the true story of the double initial killings in Rochester, NY.', 'https://www.youtube.com/watch?v=qJCYwP8W3qY', 68, 'https://m.media-amazon.com/images/M/MV5BMTIwMDEyMTgyOF5BMl5BanBnXkFtZTcwMDcyMzQ0MQ@@._V1_.jpg'),
    ( 'Avengers: Endgame', 1, 'After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos'' actions and restore balance to the universe.', 'https://www.youtube.com/watch?v=TcMBFSGVi1c', 98, 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SY1000_CR0,0,674,1000_AL_.jpg'),
    ( 'Ready Player One', 1, 'When the creator of a virtual reality called the OASIS dies, he makes a posthumous challenge to all OASIS users to find his Easter Egg, which will give the finder his fortune and control of his world.', 'https://www.youtube.com/watch?v=cSp1dM2Vj48', 90, 'https://m.media-amazon.com/images/M/MV5BY2JiYTNmZTctYTQ1OC00YjU4LWEwMjYtZjkwY2Y5MDI0OTU3XkEyXkFqcGdeQXVyNTI4MzE4MDU@._V1_SY1000_CR0,0,674,1000_AL_.jpg'),
    ( 'Black Panther', 1, 'T''Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future and must confront a challenger from his country''s past.', 'https://www.youtube.com/watch?v=xjDjIWPwcPU', 100, 'https://m.media-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_SY1000_CR0,0,674,1000_AL_.jpg');
    -- ( 'Super Size Me', 7, 'Director Morgan Spurlock''s social experiment in fast-food gastronomy sees him attempting to subsist uniquely on food from the McDonald''s menu for an entire month.','https://www.youtube.com/watch?v=zKQGAv8gtBA', 41),
    -- ( 'Slightly Single in LA', 8, 'Moving to LA - it seemed like a good idea at the time.  Dale (Lacey Chabert) can''t seem to make things work - at work, with her friends, and definitely not with men.', 'https://www.youtube.com/watch?v=DSaP_xZnBHU&has_verified=1', 21),
    -- ( 'Child''s Play', 5, 'When serial killer Charles Lee Ray is mortally wounded in a police shoot-out, he uses a voodoo spell to transfer his soul into Chucky, a "Good Guys" doll.', 'https://www.youtube.com/watch?v=hcsHPsAZkBY', 1),
    -- ( 'Minecraft: into the Nether', 7, 'Minecraft. The game that took the world by storm. Follow the story of how the Minecraft phenomenon has ploughed through the 21st century', 'https://www.youtube.com/watch?v=nu4Ew0xA8aw' , 26),
    -- ( 'The Legend of King Solomon', 9, 'Young Solomon is infatuated with the Queen of Sheeba, who has arrived to gauge his suitability for marriage. In his eagerness to impress her, he breaks his late father’s command and accidentally releases the devil Asmodeus from his prison in the belly of the earth', 'https://www.youtube.com/watch?v=tkmy6sAGTvE', 65),
    -- ( 'Dinosaur', 9 ,'A boy and a girl find themselves stranded in a land of wonder only to discover that throughout history things have mysteriously disappeared to this long-lost world.', 'https://www.youtube.com/watch?v=BtG1bVdNcC4', 76);
    
     -- 2, 5, 9, 10, 11, 12 (Movie Rooms)

INSERT INTO showtimes
    (video_id, time)
VALUES
    (1, '12:00:00 AM'),
    (1, '2:00:00 AM'),
    (1, '4:00:00 AM'),
    (1, '7:00:00 PM'),
    (1, '9:00:00 PM'),

    (2, '10:00:00 AM'),
    (2, '12:00:00 PM'),
    (2, '2:00:00 PM'),
    (2, '5:00:00 PM'),
    (2, '8:00:00 PM'),

    (3, '3:00:00 AM'),
    (3, '9:00:00 AM'),
    (3, '2:00:00 PM'),
    (3, '5:00:00 PM'),
    (3, '9:00:00 PM'),

    (4, '4:00:00 AM'),
    (4, '9:00:00 AM'),
    (4, '2:00:00 PM'),
    (4, '7:00:00 PM'),
    (4, '11:00:00 PM'),

    (5, '4:00:00 AM'),
    (5, '9:00:00 AM'),
    (5, '2:00:00 PM'),
    (5, '7:00:00 PM'),
    (5, '11:00:00 PM'),

    (6, '1:00:00 AM'),
    (6, '8:00:00 AM'),
    (6, '1:00:00 PM'),
    (6, '5:00:00 PM'),
    (6, '7:00:00 PM'),

    (7, '4:00:00 AM'),
    (7, '9:00:00 AM'),
    (7, '2:00:00 PM'),
    (7, '7:00:00 PM'),
    (7, '12:00:00 AM'),

    (8, '5:00:00 AM'),
    (8, '9:00:00 AM'),
    (8, '10:00:00 AM'),
    (8, '1:00:00 PM'),
    (8, '8:00:00 PM'),
    
    (9, '2:00:00 AM'),
    (9, '9:00:00 AM'),
    (9, '1:00:00 PM'),
    (9, '5:00:00 PM'),
    (9, '9:00:00 PM'),

    (10, '5:00:00 AM'),
    (10, '10:00:00 AM'),
    (10, '3:00:00 PM'),
    (10, '7:00:00 PM'),
    (10, '10:00:00 PM'),

    (11, '12:00:00 AM'),
    (11, '7:00:00 AM'),
    (11, '1:00:00 PM'),
    (11, '5:00:00 PM'),
    (11, '9:00:00 PM'),

    (12, '8:00:00 AM'),
    (12, '10:00:00 AM'),
    (12, '1:00:00 PM'),
    (12, '8:00:00 PM'),
    (12, '11:00:00 PM');

INSERT INTO users
    (name, email, password)
VALUES
    ( 'Kadijah Wilson', 'kwilson@pursuit.org', 'passWord'),
    ( 'Hupaul Camacho', 'hcamacho@pursuit.org', 'passWord'),
    ( 'John Doe', 'jdoe@pursuit.org', 'passWord'),
    ( 'Chuck Okonkwo', 'cokonkwo@pursuit.org', 'passWord'),
    ( 'Jane Smith', 'jsmith@pursuit.org', 'passWord');

INSERT INTO showrooms
    ( title, video_id)
VALUES
    ( 'Survive The Night', 2),
    ( 'The Invisible Man', 1),
    ( 'Whats The Worst That Could Happen?', 3),
    ( 'Mulan', 4);

INSERT INTO comments
    (users_id, video_id, showroom_id, body)
VALUES
    (3, 1, 2, 'Great watch'),
    (2, 3, 3, 'Wasn''t interesting'),
    (1, 4, 4, 'Amazing');


INSERT INTO preferences
    (users_id, age, genre_id)
VALUES
    (1, 26, 3),
    (3, 37, 2),
    (5, 17, 2);

INSERT INTO viewer
    (users_id, showroom_id)
VALUES
    (3, 2),
    (2, 3),
    (4, 1),
    (5, 2),
    (1, 4);