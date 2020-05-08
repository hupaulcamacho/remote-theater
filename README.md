# Remote Theater
Our application allows users to watch different movies as if they were in a real movie theater. Every movie will have a specific showtime for when users can watch, once in the showroom users are able to leave comments and ratings. As the movie plays users can use our live chat feature with other watchers. In the chat users are able to use emoji reactions and leave comments. Users are able to select preferences on the kind of movies they enjoy.

## Database Tables: 
- *Users*

  | Method | Endpoint     | Description           | Body Data                |
  | ------ | ------------ | --------------------- | ------------------------ |
  | GET    | /users     | Get all users         | n/a                      |
  | GET    | /users/:id | Get single user by id | n/a                      |
  | POST   | /users/    | Add new user          | username, email, password |
  | PATCH  | /users/:id | Edit a user's info    | password |
  | DELETE | /users/:id | Delete a user         | n/a                      |

- *Showrooms*

  | Method | Endpoint  | Description    | Body Data    |
  | ------ | --------- | -------------- | ------------ |
  | GET    | /showrooms/:title | Get all showrooms by title | n/a          |
  | GET    | /showrooms/:id | Get showroom by id | n/a |
  | POST   | /showrooms | Create a new showroom  | title, video_id  |
  | PATCH  | /showrooms/video/:id | Change Video | video_id |
  | DELETE | /showrooms/:id | Delete a showroom | n/a |


*Future Implementations*
Private showrooms for friends and family


*Wireframes*
