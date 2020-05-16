import React from 'react';
import './CSS/VideoPage.css';
import axios from 'axios';
import Youtube from 'react-youtube';
import ChatBox from './ChatBox';
import moment from'moment';

const API_KEY = 'http://localhost:3001';


class VideoPage extends React.Component {
	constructor(props, routeprops){
		super(props, routeprops);
		this.state = {
			user: this.props.user,
			time: null
		}
	}

	componentDidMount = () => {
		// let response = await axios.get(`${API_KEY}/videos/id/${this.props.id}`);
		// this.setState({...response.data.payload[0]});

		this.getTimeStamp()
	}

	setTime = () => {
		const { routeprops: { match:{ params } } } = this.props;
		
		const time = params.time
		
		return time
	}

	getTimeStamp = () => {
		const format = 'h:mm:ss A '
		let time = this.setTime()
		let showtime = moment(time, format)
		// console.log(time)
		let now = moment().format(format)
		console.log(now)
		let duration = moment.duration(moment().diff(showtime))
		console.log(duration._data)
		return duration.as('seconds')
	}


	_onReady = (event) => {
		let timestamp = this.getTimeStamp()
		console.log(timestamp, "timestamp")
		// access to player in all event handlers via event.target
		event.target.playVideo();
		event.target.seekTo(timestamp);
	}

	loadOptions = () => {
        const opts = {
            // height: '768',
            // width: '1152',
            playerVars: {
			autoplay: 1,
			controls: 0,
			disablekb: 1,
			showinfo: 0
          }
        }
        return opts
    }

	render(){
		const { routeprops: { match:{ params } } } = this.props;
		
		const { user } = this.state
		return (
			<div className ='video-container'>
				{/* <h1>{params.title}</h1><br/> */}
				<Youtube
					videoId={params.id}
					onReady={this._onReady}
					opts={this.loadOptions()}
				/>
	
				<ChatBox 
					user={user} 
					title={params.title}
				/>
			</div>
		);
	}
}

export default VideoPage;