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
    genre_id INT REFERENCES genres(id) on delete cascade on update cascade
);

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    email VARCHAR UNIQUE,
    number VARCHAR,
    password VARCHAR,
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
    comment_body VARCHAR,
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
    users_id INT REFERENCES users(id),
    showroom_id INT REFERENCES showrooms(id) on delete cascade on update cascade
);

INSERT INTO genres
    (genre_name)
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
    (title, genre_id, description, video_url, rating)
VALUES
    ( 'The Invisible Man', 5, 'The Invisible Man is a 2020 science fiction horror film written and directed by Leigh Whannell. It follows a woman who, after the apparent suicide of her abusive and wealthy boyfriend, believes she is being stalked by him.', 'https://www.youtube.com/watch?v=Pso0Aj_cTh0', 49),
    ( 'Survive The Nght', 1, '', 'https://www.youtube.com/watch?v=TfTNGqXBwHY&list=PLScC8g4bqD45-Bue4BX7U2h4IkzEV3hcL&index=1', 58),
    ( 'Whats The Worst That Could Happen?', 3, 'A rich man catches a thief burglarizing his home and steals the thiefs lucky ring, who then tries to get it back.', 'https://www.youtube.com/watch?v=9LaZ6pqSnqM', 100),
    ( 'Mulan', 2, 'A young Chinese maiden disguises herself as a male warrior in order to save her father. A live-action feature film based on Disney''s Mulan.', 'https://www.youtube.com/watch?v=XrAmQS9jJJo', 61),
    ( 'Barbershop 2', 3, 'The owner of an historic South Side Chicago barbershop is pressured to sell out to a land developer, but must face the impact this would have on his close-knit community.','https://www.youtube.com/watch?v=ON2K5LhrSls', 8),
    ( 'Rampage', 6, 'Primatologist Davis Okoye shares an unshakable bond with George, an extraordinarily intelligent, silverback gorilla that''s been in his care since birth. When a rogue genetic experiment goes wrong, 
    it causes George, a wolf and a reptile to grow to a monstrous size. As the mutated beasts embark on a path of destruction, Okoye teams up with a discredited genetic engineer and the military to secure an antidote and prevent a global catastrophe.', 'https://www.youtube.com/watch?v=coOKvrsmQiI', 14),
    ( 'Bright', 1, 'A detective must work with an Orc to find a powerful wand before evil creatures do.', 'https://www.youtube.com/watch?v=giozR7nb51c', 72),
    ( 'The Godfather', 4, 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', 'https://www.youtube.com/watch?v=sY1S34973zA' , 74),
    ( 'The Alphabet Killer', 4, ' ', 'https://www.youtube.com/watch?v=qJCYwP8W3qY', 68),
    ( 'Super Size Me', 7, 'Director Morgan Spurlock''s social experiment in fast-food gastronomy sees him attempting to subsist uniquely on food from the McDonald''s menu for an entire month.','https://www.youtube.com/watch?v=zKQGAv8gtBA', 41),
    ( 'Slightly Single in LA', 8, 'Moving to LA - it seemed like a good idea at the time.  Dale (Lacey Chabert) can''t seem to make things work - at work, with her friends, and definitely not with men.', 'https://www.youtube.com/watch?v=DSaP_xZnBHU&has_verified=1', 21),
    ( 'Child''s Play', 5, 'When serial killer Charles Lee Ray is mortally wounded in a police shoot-out, he uses a voodoo spell to transfer his soul into Chucky, a "Good Guys" doll.', 'https://www.youtube.com/watch?v=hcsHPsAZkBY', 1),
    ( 'Minecraft: into the Nether', 7, 'Minecraft. The game that took the world by storm. Follow the story of how the Minecraft phenomenon has ploughed through the 21st century', 'https://www.youtube.com/watch?v=nu4Ew0xA8aw' , 26),
    ( 'The Legend of King Solomon', 9, 'Young Solomon is infatuated with the Queen of Sheeba, who has arrived to gauge his suitability for marriage. In his eagerness to impress her, he breaks his late father’s command and accidentally releases the devil Asmodeus from his prison in the belly of the earth', 'https://www.youtube.com/watch?v=tkmy6sAGTvE', 65),
    ( 'Dinosaur', 9 ,'A boy and a girl find themselves stranded in a land of wonder only to discover that throughout history things have mysteriously disappeared to this long-lost world.', 'https://www.youtube.com/watch?v=BtG1bVdNcC4', 76);
    
     -- 2, 5, 9, 10, 11, 12 (Movie Rooms)

INSERT INTO users
    (name, email, password)
VALUES
    ( 'Kadijah Wilson', 'kwilson@pursuit.org', '1234'),
    ( 'Hupaul Camacho', 'hcamacho@pursuit.org', '1234'),
    ( 'John Doe', 'jdoe@pursuit.org', '1234'),
    ( 'Chuck Okonkwo', 'cokonkwo@pursuit.org', '1234'),
    ( 'Jane Smith', 'jsmith@pursuit.org', '1234');

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
    (users_id, video_id, showroom_id)
VALUES
    (3, 2, 2),
    (2, 5, 3),
    (4, 9, 1),
    (5, 2, 2),
    (1, 12, 4);