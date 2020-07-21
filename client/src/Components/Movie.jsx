import React, { Component } from 'react'

class Movie extends Component {
    state = {
        difference: this.props.getTimeDifference(this.props.movie.showtimes),
        movie: this.props.movie
    }

    componentDidMount = async () => {
        this.interval = setInterval(() => this.setState({ difference: this.props.getTimeDifference(this.props.movie.showtimes)}), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { difference, movie } = this.state
        return (
            <div className="movie">

                <img className="movie-img" src={movie.video.img_url} alt={movie.video.title} />
                <p className="mv-title">{movie.video.title}</p>
                {(this.props.getElapsedTime(difference) < 0 ?
                    [<p className="text">Opens at {difference}</p>]
                    :
                    <p className="now-live">Live</p>
                )}
            </div>
        )
    }
}

export default Movie
