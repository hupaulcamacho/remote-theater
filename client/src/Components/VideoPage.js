import React from 'react';
import './CSS/VideoPage.css';
import axios from 'axios';
import Youtube from 'react-youtube';
import ChatBox from './ChatBox';
const API_KEY = 'http://localhost:3001';


class VideoPage extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			user: this.props.user
		}
	}

	componentDidMount = async () => {
		let response = await axios.get(`${API_KEY}/videos/id/${this.props.id}`);
		this.setState({...response.data.payload[0]});
	}

	_onReady(event) {
		// access to player in all event handlers via event.target
		event.target.playVideo();
	}

	loadOptions = () => {
        const opts = {
            // height: '768',
            // width: '1152',
            playerVars: {
			autoplay: 1,
			controls: 0 
          }
        }
        return opts
    }

	render(){
		const { routeprops: { match:{ params } } } = this.props;
		// console.log(params.id)
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