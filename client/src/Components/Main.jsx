import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import moment from'moment'
import './CSS/Main.css'

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: props.user,
            preferences: null,
            movies: [],
            topMovies: [] 
        }
    }

    componentDidMount = async () => {
        await this.loadUserInfo()
        await this.getUserPreferences()
        await this.getTopRatedMovies()
        await this.getPreferenceMovies()   
    }

    loadUserInfo = async () => {
        let userId = await sessionStorage.getItem('currentUserid')
        const URL = `http://localhost:3001/api/users/${userId}`
        let user = await axios.get(URL);
        console.log("state", user.data.payload)
        // this.props.setLoggedIn(true)
        this.setState({
            user: user.data.payload[0]
        })
        await this.getUserPreferences()
    }

    getUserPreferences = async () => {
        let { user } = this.state
        const URL = `/api/preferences/id/${user.id}`
        let preferences;
        try {
            preferences = await axios.get(URL);
            console.log(preferences.data.payload)
        } catch(err) {
            console.log('There was an error...', err)
        }
        this.setState({
            preferences: preferences.data.payload
        })
    }

    getPreferenceMovies = async () => {
        console.log('start function')
        let { preferences } = this.state;
        const preferencedVideos = []

        try {
            for (let i = 0; i < preferences?.length; i++) {
                // console.log(preferences[i].genre_id)
                const URL = `/api/videos/genre/id/${preferences[i].genre_id}`
                let videos = await axios.get(URL)
                console.log(videos.data.payload)
                videos.data.payload.forEach(async video => {
                    let showtimes = await this.getShowTimes(video.id)
                    preferencedVideos.push({ video: video, showtimes: showtimes })
                })
            }

            
        } catch (err) {
            console.log('There was an error...')
        }
        
        this.setState({
            movies: preferencedVideos
        })
        // console.log(preferencedVideos)  
    }

    getTopRatedMovies = async () => {
        const topVideos = []
        try {
            
            const URL = `/api/videos/ratings/${4}/${85}`
            let videos = await axios.get(URL)

            for (let i = 0; i < videos.data.payload.length; i++) {
                let showtimes = await this.getShowTimes(videos.data.payload[i].id)
                console.log(showtimes)
                topVideos.push({ video: videos.data.payload[i], showtimes: showtimes })
            }
            console.log(topVideos)

        } catch (err) {
            console.log('There was an error...')
        }
        
        this.setState({
            topMovies: topVideos
        })
    }

    getShowTimes = async (id) => {
        let times;
        try {
            const URL = `/api/showtimes/id/${id}`
            times = await axios.get(URL);
            // console.log(times.data.payload)
        } catch (err) {
            console.log('There was an error...')
        }
        return times.data.payload
    }

    getTimeDifference = (arr) => {
        console.log(arr)
        const format = 'h:mm:ss A '
        // let nextTime = null;
        const currentTime = moment()
        let timeDiff = {}
        let timeDiffEx = {}
        for (let i = 0; i < arr?.length; i++) {
            let showtime = moment(arr[i].time, format);
            console.log(showtime)
            let difference = showtime.diff(currentTime, "hours");
            console.log(difference, "difference")
            if (difference > 0) {
                timeDiff[i] = difference
                timeDiffEx[i] = { difference: difference, showtime: showtime.format(format) };
            }
        }
        
        console.log(timeDiff)
        let arr2 = Object.values(timeDiff);
        let min = Math.min(...arr2,);
        console.log(arr2)
        let time = Object.keys(timeDiffEx).find(key => timeDiffEx[key].difference === min)
        console.log(time, 'found')
        // console.log(timeDiff) 
        // console.log(timeDiffEx[time])
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
                    <Link to={`/showroom/${movie?.video.video_url}/${movie?.video.title}`}>
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
                <Link to={`/showroom/${movie?.video.video_url}/${movie?.video.title}`}>
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

                <h1>Welcome back, {user?.name}</h1>
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
