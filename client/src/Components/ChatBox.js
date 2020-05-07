import React from 'react';
import { Chat, Channel, ChannelHeader, Window } from 'stream-chat-react';
import { MessageList, MessageInput, MessageLivestream } from 'stream-chat-react';
import { MessageInputSmall, Thread } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import 'stream-chat-react/dist/css/index.css';


const chatClient = new StreamChat('dmhrpz4thf5x');
const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiaGlkZGVuLWhhemUtMiJ9.jCaIa992HDbyA4qTXd814_l2ErvhyV-dn-VdKloi3F4';
chatClient.setUser(
  {
    id: 'hidden-haze-2',
    name: 'Hidden haze',
    image: 'https://getstream.io/random_svg/?id=hidden-haze-2&name=Hidden+haze'
  },
  userToken,
);
// const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoic2h5LW1vdW50YWluLTkifQ.vNSyZ0ALr5EudA0wd40K0l0c7eburiwCnKpXmtg0udw';
// // chatClient.setUser(
// //   {
// //        id: 'shy-mountain-9',
// //        name: 'Shy mountain',
// //        image: 'https://getstream.io/random_svg/?id=shy-mountain-9&name=Shy+mountain'
// //   },
// //   userToken,
// // );

const channel = chatClient.channel('livestream', 'spacex', {
  image: 'https://goo.gl/Zefkbx',
  name: 'SpaceX launch discussion',
});

const ChatBox = () => (
  <div>
  <h5> Demo Users</h5>
  <Chat client={chatClient} theme={'livestream dark'}>
    <Channel channel={channel} Message={MessageLivestream}>
      <Window hideOnThread>
        <ChannelHeader live />
        <MessageList />
        <MessageInput Input={MessageInputSmall} focus />
      </Window>
      <Thread fullWidth />
    </Channel>
  </Chat>
  </div>
);

export default ChatBox ;