# Remote Theater
## Database Tables: 
- *Users*

  | Method | Endpoint     | Description           | Body Data                |
  | ------ | ------------ | --------------------- | ------------------------ |
  | GET    | /users     | Get all users         | n/a                      |
  | GET    | /users/:id | Get single user by id | n/a                      |
  | POST   | /users/    | Add new user          | username, password |
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
