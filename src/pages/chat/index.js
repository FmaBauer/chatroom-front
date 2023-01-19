import { useState } from 'react'
import './index.css'
import Rooms from './components/rooms'
import Chatroom from './components/chatroom'

function Chat() {
  let [ roomId, setRoomId ] = useState()
  return (
    <div className="chat">
      <Rooms roomId={roomId} setRoomId={setRoomId} />
      <Chatroom roomId={roomId} />
    </div>
  )
}

export default Chat
