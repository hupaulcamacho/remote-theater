import React from 'react';
import { Chat, Channel, ChannelHeader, Window } from 'stream-chat-react';
import { MessageList, MessageInput, MessageLivestream } from 'stream-chat-react';
import { MessageInputSmall, Thread } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import 'stream-chat-react/dist/css/index.css';
import axios from 'axios';
const API_KEY = 'http://localhost:3001/api';

  let chatClient = new StreamChat('dmhrpz4thf5x');
  let userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiaGlkZGVuLWhhemUtMiJ9.jCaIa992HDbyA4qTXd814_l2ErvhyV-dn-VdKloi3F4';
  chatClient.setUser(
    {
      id: 'hidden-haze-2',
      name: 'Hidden haze',
      image: 'https://getstream.io/random_svg/?id=hidden-haze-2&name=Hidden+haze'
    },
    userToken,
  );
    let channel = chatClient.channel('livestream', 'spacex', {
    image: 'https://goo.gl/Zefkbx',
    name: 'SpaceX launch discussion',
  });

  // const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoic2h5LW1vdW50YWluLTkifQ.vNSyZ0ALr5EudA0wd40K0l0c7eburiwCnKpXmtg0udw';
  // // chatClient.setUser(
  // //   {
  // //        id: 'shy-mountain-9',
  // //        name: 'Shy mountain',
  // //        image: 'https://getstream.io/random_svg/?id=shy-mountain-9&name=Shy+mountain'
  // //   },
  // //   userToken,
  // // );


 


class ChatBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      channel : channel,
      chatClient: chatClient
    }
  }



   componentDidMount = async () => {
    const chatClient = new StreamChat('v4uankwegvgc');
    console.log(chatClient);
    let response = await axios.post(`${API_KEY}/getToken`, {user: this.props.user});
    console.log(response);
    let token = response.data.token;
    let user = response.data.user;
    await chatClient.setUser(
   {
      id: user,
      name: user,
      image: 'https://getstream.io/random_svg/?id=hidden-haze-2&name=Hidden+haze'
   },
    token,
    );

   channel = chatClient.channel('livestream', 'Movie', {
    image: 'https://goo.gl/Zefkbx',
    name: 'Movie Discussion',
  });
  this.setState({
    chatClient: chatClient,
    channel: channel
  })
 }

 

    render(){
     return(
      <div>
          <h5> Demo Users</h5>
          <Chat client={this.state.chatClient} theme={'livestream dark'}>
            <Channel channel={this.state.channel} Message={MessageLivestream}>
              <Window hideOnThread>
                <ChannelHeader live />
                <MessageList />
                <MessageInput Input={MessageInputSmall} focus />
              </Window>
              <Thread fullWidth />
            </Channel>
          </Chat>
        </div>);
    }
}


  // const chatClient = new StreamChat('dmhrpz4thf5x');
  // const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiaGlkZGVuLWhhemUtMiJ9.jCaIa992HDbyA4qTXd814_l2ErvhyV-dn-VdKloi3F4';
  // chatClient.setUser(
  //   {
  //     id: 'hidden-haze-2',
  //     name: 'Hidden haze',
  //     image: 'https://getstream.io/random_svg/?id=hidden-haze-2&name=Hidden+haze'
  //   },
  //   userToken,
  // );
  // // const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoic2h5LW1vdW50YWluLTkifQ.vNSyZ0ALr5EudA0wd40K0l0c7eburiwCnKpXmtg0udw';
  // // // chatClient.setUser(
  // // //   {
  // // //        id: 'shy-mountain-9',
  // // //        name: 'Shy mountain',
  // // //        image: 'https://getstream.io/random_svg/?id=shy-mountain-9&name=Shy+mountain'
  // // //   },
  // // //   userToken,
  // // // );

  // const channel = chatClient.channel('livestream', 'spacex', {
  //   image: 'https://goo.gl/Zefkbx',
  //   name: 'SpaceX launch discussion',
  // });

  // const ChatBox = () => (
  //   <div>
  //   <h5> Demo Users</h5>
  //   <Chat client={chatClient} theme={'livestream dark'}>
  //     <Channel channel={channel} Message={MessageLivestream}>
  //       <Window hideOnThread>
  //         <ChannelHeader live />
  //         <MessageList />
  //         <MessageInput Input={MessageInputSmall} focus />
  //       </Window>
  //       <Thread fullWidth />
  //     </Channel>
  //   </Chat>
  //   </div>
  // );

export default ChatBox ;