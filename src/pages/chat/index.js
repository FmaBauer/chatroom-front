import './index.css'
import Rooms from './components/rooms'
import Chatroom from './components/chatroom'

function Chat() {
  return (
    <div className="chat">
      <Rooms />
      <Chatroom />
    </div>
  )
}

export default Chat
