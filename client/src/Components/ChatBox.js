import React, { useEffect, useState, useMemo } from 'react';
import { Chat, Channel, ChannelHeader, Window } from 'stream-chat-react';
import { MessageList, MessageInput, MessageLivestream } from 'stream-chat-react';
import { MessageInputSmall, Thread } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import 'stream-chat-react/dist/css/index.css';

// let chatClient = new StreamChat('v5jnt3yftkvj');
let userToken;

// let setUser1 = async () => {
//   chatClient = new StreamChat('dmhrpz4thf5x');
//   userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiaGlkZGVuLWhhemUtMiJ9.jCaIa992HDbyA4qTXd814_l2ErvhyV-dn-VdKloi3F4';
//   chatClient.setUser(
//   {
//     id: 'hidden-haze-2',
//     name: 'Hidden haze',
//     image: 'https://getstream.io/random_svg/?id=hidden-haze-2&name=Hidden+haze'
//   },
//   chatClient.devToken('hidden-haze-2')
// );
// channel = chatClient.channel('livestream', 'spacex', {
//   image: 'https://goo.gl/Zefkbx',
//   name: 'SpaceX launch discussion',
// });};

// userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoic2h5LW1vdW50YWluLTkifQ.vNSyZ0ALr5EudA0wd40K0l0c7eburiwCnKpXmtg0udw';
// const addUser = async () => {
//   await chatClient.setUser(
//     {
//          id: 'shy-mountain-9',
//          name: 'Shy mountain',
//          image: 'https://getstream.io/random_svg/?id=shy-mountain-9&name=Shy+mountain'
//     },
//     chatClient.devToken('shy-mountain-9'),
//   );
// }

// addUser()




// let channel = chatClient.channel('livestream', 'Movie', {
//   image: 'https://goo.gl/Zefkbx',
//   name: 'Movie Discussion',
// });

// let channel = chatClient.channel('livestream', 'Movie', {
//   image: 'https://goo.gl/Zefkbx',
//   name: 'Movie Discussion',
// });

const ChatBox = () => {
  const [channel, setChannel] = useState(null)
  console.log('chatbox')
  const chatClient = useMemo(() => {
    console.log('testing chat client')

    return new StreamChat('v4uankwegvgc');
  }, [])
  
  useEffect(async () => {
  // setChatClient(new StreamChat('v5jnt3yftkvj'));
  console.log(chatClient)
  const addUser = async () => {
    await chatClient.setUser(
      {
           id: 'shy-mountain-9',
           name: 'Shy mountain',
           image: 'https://getstream.io/random_svg/?id=shy-mountain-9&name=Shy+mountain'
      },
      chatClient.devToken('shy-mountain-9'),
    );
  }

  await addUser()

  let channel = chatClient.channel('livestream', 'Movie', {
    image: 'https://goo.gl/Zefkbx',
    name: 'Movie Discussion',
  });
  setChannel(channel)
  }, [])

  if(channel === null) {
    return null
  }
  console.log({ chatClient, channel, MessageLivestream })
  return (
    <div>
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
  )
  
  };

export default ChatBox ;