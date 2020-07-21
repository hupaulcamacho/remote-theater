import React from 'react';
import { Chat, Channel, ChannelHeader, Window } from 'stream-chat-react';
import { MessageList, MessageInput, MessageLivestream } from 'stream-chat-react';
import { MessageInputLarge, Thread } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import 'stream-chat-react/dist/css/index.css';
import axios from 'axios';

// const API_KEY = 'http://localhost:3001/api';

class ChatBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: this.props.user,
      title: this.props.title,
      channel : null,
      chatClient: null
    }
  }

  componentDidMount = async () => {
    
    const { user, title } = this.state
    const movietitle = title.split(":").join("")
    const movietitle2 = movietitle.split(" ").join("")
    const chatClient = new StreamChat('ewnpysxxpud8');
    let response = await axios.post(`/api/getToken`, user);
    let token = response.data.token;
    let chatUser = response.data.user
   
    await chatClient.setUser(
      {
        id: chatUser.name,
        name: chatUser.name,
        image: `https://getstream.io/random_svg/?name=${chatUser.name}`
      },
      token,
    );
    let channel = chatClient.channel('livestream', movietitle2, { 
      image: 'https://goo.gl/Zefkbx',
      name: 'test',
    });
    
    // await channel.delete();
    
    this.setState({
      chatClient: chatClient,
      channel: channel
    })
    
  }

  render(){
    const { title, channel, chatClient } = this.state
    
    return(
    <div className="chat">
        <Chat client={chatClient} theme={'livestream dark'}>
          <Channel channel={channel} Message={MessageLivestream}>
            <Window hideOnThread>
              <ChannelHeader live title={title}/>
              <MessageList noGroupByUser={false} />
              <MessageInput Input={MessageInputLarge} focus />
            </Window>
            <Thread />
          </Channel>
        </Chat>
    </div>);
  }
}

export default ChatBox ;