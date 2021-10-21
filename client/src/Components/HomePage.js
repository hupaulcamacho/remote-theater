import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Popup from "reactjs-popup";

import moment from 'moment'

import Time from './Time'
import Movie from './Movie'
import MovieModal from './MovieModal'

import { Movies } from '../utils/MovieLoader'

import './CSS/Home.css'

export default function HomePage() {
    const [ topMovies, setTopMovies ] = useState([]);
    const [ user, setUser ] = useState({ name: 'Test User'});

    useEffect(() => {
        loadTopMovies(Movies)
    }, []);

    const _closed = (e) => {
        e.preventDefault()
    }

    const getElapsedTime = (startTime) => {
        const format = 'h:mm:ss A'
        let now = moment()
        let start = moment(startTime, format)

        return now.diff(start, "minutes")
    }

    const getTimeDifference = (arr) => {
        const format = 'h:mm:ss A'
        const currentTime = moment()
        let timeDiff = {}
        let timeDiffEx = {}

        for (let i = 0; i < arr ?.length; i++) {
            let showtime = moment(arr[i], format);
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

    const loadTopMovies = (movies) => {
        console.log(movies)
        const result = [];
        for(let movie in movies) {
            result.push(
                <Popup
                    trigger={
                        <div>
                            <Movie movie={movies[movie]} getElapsedTime={getElapsedTime} getTimeDifference={getTimeDifference} title={movie}/>
                        </div>
                    }
                    modal
                    closeOnDocumentClick>
                    <div>
                        <MovieModal movie={movies[movie]} getElapsedTime={getElapsedTime} getTimeDifference={getTimeDifference} _closed={_closed} title={movie}/>
                    </div>
                </Popup>
            )
        }
        console.log(result)
        setTopMovies(result)
    }

    return(
        <div className='main'>
            <h1>Welcome back, {user.name}</h1>
            <Time />
            <h2>All Movies</h2>
            <div className="top-movies">
                {topMovies}
            </div>

        </div>
    )
}