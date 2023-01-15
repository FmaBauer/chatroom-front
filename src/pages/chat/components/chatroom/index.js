import './index.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getMessages } from '../../store/messages'

function Chatroom() {
  const currentRoomId = useSelector((state) => state.chatrooms.currentRoomId)
  const messages = useSelector((state) => {
    return state.messages[currentRoomId] || []
  })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMessages())
  }, [])
  return (
    <div className="chatroom">
      <div className="chatroom-header">
        <div className="chatroom-title">Share your story</div>
        <div className="chatroom-members">4</div>
      </div>
      <div className="chatroom-content">
        {
          messages.map(message => {
            return (
              <div className="message-wrapper">
                <div className="message-avator"></div>
                <div className="message-content-wrapper">
                  <div className="message-title">
                    <span>{message.sender_name}</span><span>{message.message_time}</span>
                  </div>
                  <div className="message-content">
                    {message.content}
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Chatroom
