import './index.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import dayjs from 'dayjs'

const GET_MESSAGES = gql`
  query getMessages($chatroomId: ID!) {
    messages(chatroomId: $chatroomId) {
      content
      send_time
      sender {
        full_name
      }
    }
  }
`

function Chatroom() {
  const currentRoomId = '63c69d5d72c2f53743ad68ff'
  const { loading, error, data } = useQuery(GET_MESSAGES, {
    variables: { chatroomId: currentRoomId },
  })
  if (loading) {
    return <>loading...</>
  }
  return (
    <div className="chatroom">
      <div className="chatroom-header">
        <div className="chatroom-title">Share your story</div>
        <div className="chatroom-members">4</div>
      </div>
      <div className="chatroom-content">
        {
          data.messages.map(message => {
            return (
              <div className="message-wrapper">
                <div className="message-avator"></div>
                <div className="message-content-wrapper">
                  <div className="message-title">
                    <span>{message.sender.full_name}</span><span>{(dayjs(message.send_time-0)).format('HH:mm')}</span>
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
