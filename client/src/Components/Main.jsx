import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import moment from'moment'
import './CSS/Main.css'

class Main extends Component {
    state = {
        user: {
            username: "traplordhuey",
            favoriteGenres: [4, 6, 1, 3]
        },
        movies: [],
        showtimes: [],
        topMovies: []   
    }

    componentDidMount = async () => {
        this.getPreferenceMovies()
        this.getTopRatedMovies()
        
    }

    getPreferenceMovies = async () => {
        const genres = this.state.user.favoriteGenres
        // console.log(genres)
        const preferencedVideos = []
        // console.log(preferencedVideos)
        for(let i = 0; i < genres.length; i++) {
            const URL = `http://localhost:3001/api/videos/genre/id/${genres[i]}`
            let videos = await axios.get(URL)
            // console.log(videos.data.payload)
            videos.data.payload.forEach(async video => {
                let showtimes = await this.getShowTimes2(video.id)
                preferencedVideos.push({ video: video, showtimes: showtimes })
            })
        }
        // console.log(preferencedVideos)
        this.setState({
            movies: preferencedVideos
        })
    }

    getTopRatedMovies = async () => {
        const topVideos = []
        const URL = `http://localhost:3001/api/videos/ratings/${4}/${85}`
        let videos = await axios.get(URL)
        videos.data.payload.forEach(async video => {
            let showtimes = await this.getShowTimes2(video.id)
            topVideos.push({ video: video, showtimes: showtimes })
        })
        console.log(videos.data.payload)
        this.setState({
            topMovies: topVideos
        })
    }


    getShowTimes = async () => {
        const movies = this.state.movies
        const showtimes = {}
        for (let i = 0; i < movies.length; i++) {
            const URL = `http://localhost:3001/api/showtimes/id/${movies[i].id}`
            let times = await axios.get(URL);
            showtimes[`${movies[i].id}`] = times.data.payload
        }
        this.setState({
            showtimes: showtimes
        })
        // console.log(showtimes)
    }

    getShowTimes2 = async (id) => {
        const URL = `http://localhost:3001/api/showtimes/id/${id}`
        let times = await axios.get(URL);
        return times.data.payload
    }

    getTimeDifference = (arr) => {
        const format = 'h:mm:ss A '
        let nextTime = null;

        for (let i = 0; i < arr?.length; i++) {
            let showtime = moment(arr[i].time, format);
            let difference = moment().diff(showtime, "hours");
            // console.log(difference)
            if (nextTime === null) {
                nextTime = showtime
            } 
            // compares the current index's time difference against a time difference with the "next time"
            if (difference < moment().diff(nextTime, "hours")) {
                // if curr index's difference is less it changes the next time to the new time
                nextTime = showtime
            }
            console.log(nextTime, 'next showtime')
        }
        // Calculates the time difference to be displayed
        const next = moment().to(nextTime)
        return next
    }
    
    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }

    render() {
        const { user, movies, topMovies, showtimes } = this.state
        const movieComponents = []
        const topMovieComponents = []
        const alreadySeen = {}
        for (let i = 0; i < 4; i++) {
            let int = this.getRandomInt(movies.length)
            let movie = movies[int]
            if(alreadySeen[int] === undefined) {
                movieComponents.push(
                    <div className="movie">
                        <p>{movie?.video.title}</p>
                        <img src={movie?.video.img_url} />
                        <p>Opens {this.getTimeDifference(movie?.showtimes)} </p>
                    </div>
                ) 
                alreadySeen[int] = int
            }
        }
        topMovies.forEach(movie => {
            topMovieComponents.push(
                <Link to={`/showroom/${movie?.video.video_url}`}>
                    <div className="movie">
                        <p>{movie?.video.title}</p>
                        <img src={movie?.video.img_url} />
                        <p>Rating: {movie?.video.rating}</p>
                        <p>Opens {this.getTimeDifference(movie?.showtimes)}</p>
                    </div>
                </Link>
            )
        })
        return (
            <div>

                <h1>Welcome back {user.username}</h1>
                <h2>Top Rated Movies</h2>
                <div className="top-movies">
                    {topMovieComponents}
                </div>
                <h2>Suggested Movies</h2>
                <div className="preferenced-movies">
                    {movieComponents}
                </div>
            </div>
        )
    }
}

export default Main
