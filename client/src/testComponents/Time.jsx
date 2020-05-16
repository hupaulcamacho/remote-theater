import React, { Component } from 'react'
import moment from'moment'

export default class Time extends Component {
    state = {
        time: moment().format('h:mm:ss A')
    }
    componentDidMount = async () => {
        this.interval = setInterval(() => this.setState({ time: moment().format('h:mm:ss A') }), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { time } = this.state
        return (
            <div>
                {time}
            </div>
        )
    }
}
