import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Popup from "reactjs-popup";

import axios from 'axios'
import moment from 'moment'
import './CSS/Home.css'
import Time from '../testComponents/Time'
import Movie from './Movie'
import MovieModal from './MovieModal'

class Home extends Component {
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
        await this.getUserPreferences()
        await this.getTopRatedMovies()
        await this.getPreferenceMovies()
    }

    _closed = (e) => {
        e.preventDefault()
    }

    getUserPreferences = async () => {
        let { user } = this.state
        const URL = `/api/preferences/id/${user.id}`
        let preferences;
        try {
            preferences = await axios.get(URL);
        } catch (err) {
            console.log('There was an error...', err)
        }
        this.setState({
            preferences: preferences.data.payload
        })
    }

    getPreferenceMovies = async () => {
        let { preferences } = this.state;
        const preferencedVideos = []

        try {
            for (let i = 0; i < preferences.length; i++) {
                const URL = `/api/videos/genre/id/${preferences[i].genre_id}`
                let videos = await axios.get(URL)
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

    }

    getTopRatedMovies = async () => {
        const topVideos = []
        try {
            const URL = `/api/videos/ratings/${4}/${50}`
            let videos = await axios.get(URL)

            for (let i = 0; i < videos.data.payload.length; i++) {
                let showtimes = await this.getShowTimes(videos.data.payload[i].id)
                topVideos.push({ video: videos.data.payload[i], showtimes: showtimes })
            }
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
        } catch (err) {
            console.log('There was an error...')
        }
        return times.data.payload
    }

    getTimeDifference = (arr) => {
        const format = 'h:mm:ss A'

        const currentTime = moment()
        let timeDiff = {}
        let timeDiffEx = {}

        for (let i = 0; i < arr ?.length; i++) {
            let showtime = moment(arr[i].time, format);
            let difference = showtime.diff(currentTime, "minutes");
            timeDiff[i] = Math.abs(difference)
            timeDiffEx[i] = { difference: Math.abs(difference), showtime: showtime.format(format) };
        }

        let arr2 = Object.values(timeDiff);
        let min = Math.min(...arr2);
        let time = Object.keys(timeDiffEx).find(key => timeDiffEx[key].difference === min);
        let nextshowtime = moment(timeDiffEx[time].showtime, format);
        const next = moment(nextshowtime).format('h:mm A');

        return next
    }

    getElapsedTime = (startTime) => {
        const format = 'h:mm:ss A'
        let now = moment()
        let start = moment(startTime, format)

        return now.diff(start, "minutes")
    }

    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }

    render() {
        const { user, topMovies, movies } = this.state
        const movieComponents = []
        const topMovieComponents = []
        const alreadySeen = {}
        for (let i = 0; i < 4; i++) {
            let int = this.getRandomInt(movies.length)
            let movie = movies[int]
            if (alreadySeen[int] === undefined) {
                movieComponents.push(
                    <Popup
                        trigger={
                            <div>
                                <Movie movie={movie} getElapsedTime={this.getElapsedTime} getTimeDifference={this.getTimeDifference} />
                            </div>
                        }
                        modal
                        closeOnDocumentClick>
                        <div>
                            <MovieModal movie={movie} getElapsedTime={this.getElapsedTime} getTimeDifference={this.getTimeDifference} _closed={this._closed} />
                        </div>
                    </Popup>
                )
                alreadySeen[int] = int
            } else if (alreadySeen[int]) {
                i--
            }
        }
        topMovies.forEach(movie => {
            topMovieComponents.push(
                <Popup
                    trigger={
                        <div>
                            <Movie movie={movie} getElapsedTime={this.getElapsedTime} getTimeDifference={this.getTimeDifference} />
                        </div>
                    }
                    modal
                    closeOnDocumentClick>
                    <div>
                        <MovieModal movie={movie} getElapsedTime={this.getElapsedTime} getTimeDifference={this.getTimeDifference} _closed={this._closed} />
                    </div>
                </Popup>
            )
        })
        return (
            <div className='main'>

                <h1>Welcome back, {user.name}</h1>
                <Time />
                <h2>Top Rated Movies</h2>
                <div className="top-movies">
                    {topMovieComponents}
                </div>
                <h2>Based on Your Preferences</h2>
                <div className="preferenced-movies">
                    {(movies[0] === undefined ?
                        <Link
                            className="nav-link preference" to='/account'>
                            <p>Select some preferences...</p>
                        </Link>
                        :
                        movieComponents
                    )}
                </div>
            </div>
        )
    }
}

export default Home
