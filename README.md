# Remote Theater
Our application allows users to watch movies as if they were in a real movie theater. When a users signs on they are greeted with top rated movies and suggested movies based on their preferences. Every movie will have a specific showtime for when users can enter a showroom, before entering the theater users are greeted by a small decription of the movie and a time that shows how long the movie has been playing for. Once in the showroom users are able to leave comments and reactions in real time with our chat feature. Users are able to select preferences on the kind of movies they enjoy.

## Database Tables: 
- *Users*

  | Method | Endpoint     | Description           | Body Data                |
  | ------ | ------------ | --------------------- | ------------------------ |
  | GET    | /api/users     | Get all users         | n/a                      |
  | GET    | /api/users/:id | Get single user by id | n/a                      |
  | POST   | /api/users/    | Add new user          | username, email, password |
  | PATCH  | /api/users/:id | Edit a user's info    | password |
  | DELETE | /api/users/:id | Delete a user         | n/a                      |

- *Showrooms*

  | Method | Endpoint  | Description    | Body Data    |
  | ------ | --------- | -------------- | ------------ |
  | GET    | /api/showrooms/:title | Get all showrooms by title | n/a          |
  | GET    | /api/showrooms/:id | Get showroom by id | n/a |
  | POST   |/api/showrooms | Create a new showroom  | title, video_id  |
  | PATCH  | /api/showrooms/video/:id | Change Video | video_id |
  | DELETE | /api/showrooms/:id | Delete a showroom | n/a |

- *Genres*

  | Method | Endpoint  | Description    | Body Data    |
  | ------ | --------- | -------------- | ------------ |
  | GET    | /api/genres/ | Get all genres | genre_id, genre_name  |

  - *Videos*

  | Method | Endpoint  | Description    | Body Data    |
  | ------ | --------- | -------------- | ------------ |
  | GET    | /api/videos/| Get all videos| title, genre_id, description, video_url, rating, img_url, runtime|
  | GET    | /api/videos/:id | Get video by id | title, video_id, video_url, genre_id, runtime, description, |
  | GET    | /api/videos/:title | get videos by title | title, video_id, video_url, description,  |
  | GET    | /api/videos/genre/:genre | get videos by genre | video_id, genre_id, title, video_url, description, |
  | DELETE | /api/videos/:id | Delete a video | n/a |

- *Preferences*

  | Method | Endpoint    | Description     | Body Data    |
  | ------ | ---------   | --------------  | ------------ |
  | GET    | /api/preferences/id/:user_id | Get all preferences for user  | user_id, genre_id, genre_name |
  | POST   | /api/preferences/add/:user_id/:genre_id | add to preferences | user_id, genre_id, genre_name |
  | DELETE | /api/preferences/delete/:user_id/:genre_id | Delete a preferences | user_id, genre_id, genre_name |

- *Showtimes*

  | Method | Endpoint    | Description     | Body Data    |
  | ------ | ---------   | --------------  | ------------ |
  | GET    | /api/showtimes/id/:id | Get all showtimes based on showtime id | showtime, video_id |

- *Viewer*

  | Method | Endpoint    | Description     | Body Data    |
  | ------ | ---------   | --------------  | ------------ |
  | GET    | /api/viewer/ | Get all viewers | n/a |
  | GET    | /api/viewer/:video_id | Get all viewers for specific video | users_id, video_id, showroom_id |


*Future Implementations*
Private theater feature that allows users to share a link and host movies for small groups
A search feature where users can search for movies by name and genre
A rating feature that influences recommended movie lists
Add Shows and episodes so there’s more of a variety for users to watch


*Wireframes*
