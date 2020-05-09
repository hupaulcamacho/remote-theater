import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import moment from'moment'
import './CSS/Main.css'

class Main extends Component {
    state = {
        user: null,
        preferences: null,
        movies: [],
        topMovies: []
    }

    componentDidMount = async () => {
        await this.getTopRatedMovies()
        await this.loadUserInfo()
        this.getPreferenceMovies()
    }

    loadUserInfo = async () => {
        let userId = sessionStorage.getItem('currentUserid');
        console.log(userId)
        const URL = `http://localhost:3001/api/users/${userId}`
        let user = await axios.get(URL);
        console.log(user.data.payload)
        let preferences = await this.getUserPreferences()
        this.setState({
            user: user.data.payload[0],
            preferences: preferences
        })
    }

    getUserPreferences = async () => {
        let userId = sessionStorage.getItem('currentUserid');
        const URL = `http://localhost:3001/api/preferences/id/${userId}`
        let preferences = await axios.get(URL);
        console.log(preferences.data.payload)
        return preferences.data.payload
    }

    getPreferenceMovies = async () => {
        console.log('start function')
        const preferences = this.state.preferences;
        const preferencedVideos = []

        for(let i = 0; i < preferences?.length; i++) {
            const URL = `http://localhost:3001/api/videos/genre/id/${preferences[i].genre_id}`
            let videos = await axios.get(URL)
            // console.log(videos.data.payload)
            videos.data.payload.forEach(async video => {
                let showtimes = await this.getShowTimes2(video.id)
                preferencedVideos.push({ video: video, showtimes: showtimes })
            })
        }
        console.log(preferencedVideos)
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
        // console.log(videos.data.payload)
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
        const currentTime = moment()
        let timeDiff = {}
        let timeDiffEx = {}
        for (let i = 0; i < arr?.length; i++) {
            let showtime = moment(arr[i].time, format);
            let difference = showtime.diff(currentTime, "hours");
            if (difference > 0) {
                timeDiff[i] = difference
                timeDiffEx[i] = { difference: difference, showtime: showtime.format(format) };
            }
            
            // console.log(difference)
            // if (nextTime === null) {
            //     nextTime = showtime
            // } 
            // if (difference < nextTime.diff(currentTime, "hours")) {
                
            //     nextTime = showtime
            // }
            // console.log(nextTime.format(format), 'next showtime')
            
        }

        let arr2 = Object.values(timeDiff);
        let min = Math.min(...arr2,);

        console.log( `Min value: ${min}` );
        let time = Object.keys(timeDiffEx).find(key => timeDiffEx[key].difference === min)
        console.log(time, 'found')
        console.log(timeDiff) 
        console.log(timeDiffEx[time])
        let nextshowtime = moment(timeDiffEx[time]?.showtime, format);
        const next = moment().to(nextshowtime)
        return next
    }
    
    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }

    render() {
        const { user, topMovies, movies} = this.state
        const movieComponents = []
        const topMovieComponents = []
        const alreadySeen = {}
        for (let i = 0; i < 4; i++) {
            let int = this.getRandomInt(movies.length)
            let movie = movies[int]
            if(alreadySeen[int] === undefined) {
                movieComponents.push(
                    <Link to={`/showroom/${movie?.video.video_url}`}>
                        <div className="movie">
                            <p className="text">{movie?.video.title}</p>
                            <img src={movie?.video.img_url} />
                            <p className="text">Opens {this.getTimeDifference(movie?.showtimes)} </p>
                        </div>
                    </Link>
                ) 
                alreadySeen[int] = int
            } else if (alreadySeen[int]) {
                i--
            }
        }
        topMovies.forEach(movie => {
            // console.log(movie)
            topMovieComponents.push(
                <Link to={`/showroom/${movie?.video.video_url}`}>
                    <div className="movie">
                        <p className="text">{movie?.video.title}</p>
                        <img src={movie?.video.img_url} />
                        <p>Rating: {movie?.video.rating}</p>
                        <p className="text">Opens {this.getTimeDifference(movie?.showtimes)}</p>
                    </div>
                </Link>
            )
        })
        return (
            <div>

                <h1>Welcome back {user?.name}</h1>
                <h2>Top Rated Movies</h2>
                <div className="top-movies">
                    {topMovieComponents}
                </div>
                <h2>Based on Your Preferences</h2>
                <div className="preferenced-movies">
                    {movieComponents}
                </div>
            </div>
        )
    }
}

export default Main
