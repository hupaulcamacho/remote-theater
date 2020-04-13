import React, { Component } from 'react'
import './Main.css'

class Main extends Component {
    state = {
        user: {
            username: "cinemafan86"
        },
        movies: {
            popular: [
                {
                    title: "Spider-Man: Far From Home",
                    imgUrl: "https://m.media-amazon.com/images/M/MV5BMGZlNTY1ZWUtYTMzNC00ZjUyLWE0MjQtMTMxN2E3ODYxMWVmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
                    watchers: "5m"
                },
                {
                    title: "BloodShot",
                    imgUrl: "https://m.media-amazon.com/images/M/MV5BYjA5YjA2YjUtMGRlNi00ZTU4LThhZmMtNDc0OTg4ZWExZjI3XkEyXkFqcGdeQXVyNjUyNjI3NzU@._V1_SY1000_SX800_AL_.jpg",
                    watchers: "1.5m"
                },
                {
                    title: "Bad Boys for Life",
                    imgUrl: "https://m.media-amazon.com/images/M/MV5BMWU0MGYwZWQtMzcwYS00NWVhLTlkZTAtYWVjOTYwZTBhZTBiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
                    watchers: "3m"
                },
                {
                    title: "Trolls: World Tour",
                    imgUrl: "https://m.media-amazon.com/images/M/MV5BMjIwNjg1NmUtMGE5Yi00YmQxLTg0M2QtMGQyNDVlZWUwOGUwXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SY1000_CR0,0,631,1000_AL_.jpg",
                    watchers: "2.5m"
                }
            ],
            soonStart: [
                {
                    title: "Avengers Endgame",
                    startsIn: "15 mins",
                    imgUrl: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SY1000_CR0,0,674,1000_AL_.jpg"
                },
                {
                    title: "Black Panther",
                    startsIn: "15 mins",
                    imgUrl: "https://m.media-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_SY1000_CR0,0,674,1000_AL_.jpg"
                },
                {
                    title: "Ready Player One",
                    startsIn: "20 mins",
                    imgUrl: "https://m.media-amazon.com/images/M/MV5BY2JiYTNmZTctYTQ1OC00YjU4LWEwMjYtZjkwY2Y5MDI0OTU3XkEyXkFqcGdeQXVyNTI4MzE4MDU@._V1_SY1000_CR0,0,674,1000_AL_.jpg"
                }
            ]
        }
    }

    

    render() {
        const { user, movies } = this.state
        const popMovies = []
        const soonStart = []
        movies.popular.forEach(movie => {
            popMovies.push(
                <div className="movie">
                    <p>{movie.title}</p>
                    <img src={movie.imgUrl} />
                    <p>{movie.watchers} watchers</p>
                </div>
            )
        });

        movies.soonStart.forEach(movie => {
            soonStart.push(
                <div className="movie">
                    <p>{movie.title}</p>
                    <img height="150px" src={movie.imgUrl} />
                    <p>Starts in: {movie.startsIn}</p>
                </div>
            )
        });

        return (
            <div>
                <h1>Welcome back {user.username}</h1>

                <h2>Popular Movies</h2>
                <div className="popular-movies">
                    {popMovies}
                </div>

                <h2>Movies About to Start</h2>
                <div className="start-soon">
                    {soonStart}
                </div>
            </div>
        )
    }
}

export default Main
