import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class MovieModal extends Component {
    state = {
        difference: this.props.getTimeDifference(this.props.movie.showtimes),
        movie: this.props.movie
    }

    componentDidMount = async () => {
        this.interval = setInterval(() => this.setState({ difference: this.props.getTimeDifference(this.props.movie.showtimes) }), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { difference, movie } = this.state
        return (
            <div className="movie2">
                <div className="info1">
                    <h3 className="mv-title">{movie.video.title}</h3>
                    <img className="movie-img" src={movie.video.img_url} />
                    <p>Runtime: {movie.video.runtime}</p>
                    {(
                        this.props.getElapsedTime(difference) < 0 ?
                            <>
                            </>
                            :
                            <>
                                <p className="text">Time Elapsed: {this.props.getElapsedTime(difference)} mins</p>
                                <p className="now-live">Live</p>
                            </>
                    )}
                </div>
                <div className="info2">
                    <p className="description">{movie.video.description}</p>
                    {(
                        this.props.getElapsedTime(difference) < 0 ?
                            <Link onClick={e => this.props._closed(e)} className='movie-link'>Closed</Link>
                            :
                            <Link
                                className='movie-link'
                                to={`/showroom/${movie.video.video_url}/${movie.video.title}/${difference}`}>
                                Enter Theater
                            </Link>
                    )}
                </div>
            </div>
        )
    }
}

export default MovieModal